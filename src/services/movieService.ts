import { Movie } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

let movieGenreMap: Record<number, string> = {};
let movieGenreNameToId: Record<string, number> = {};
let tvGenreMap: Record<number, string> = {};
let genresLoaded = false;

async function loadGenres(): Promise<void> {
  if (genresLoaded) return;
  const [movieRes, tvRes] = await Promise.all([
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
  ]);
  const movieData = await movieRes.json();
  const tvData = await tvRes.json();

  movieGenreMap = {};
  movieGenreNameToId = {};
  (movieData.genres || []).forEach((g: { id: number; name: string }) => {
    movieGenreMap[g.id] = g.name;
    movieGenreNameToId[g.name] = g.id;
  });

  tvGenreMap = {};
  (tvData.genres || []).forEach((g: { id: number; name: string }) => {
    tvGenreMap[g.id] = g.name;
  });

  genresLoaded = true;
}

function mapItem(raw: any, type: 'movie' | 'tv', flags: Partial<Movie> = {}): Movie {
  const genreLookup = type === 'tv' ? tvGenreMap : movieGenreMap;
  const dateStr = type === 'tv' ? raw.first_air_date : raw.release_date;
  const titleStr = type === 'tv' ? raw.name : raw.title;

  return {
    id: String(raw.id),
    title: titleStr || 'Untitled',
    description: raw.overview || '',
    rating: Number((raw.vote_average ?? 0).toFixed(1)),
    year: dateStr ? parseInt(dateStr.slice(0, 4)) : 0,
    duration:
      type === 'tv'
        ? `${raw.number_of_seasons || 1} Season${(raw.number_of_seasons || 1) > 1 ? 's' : ''}`
        : raw.runtime
        ? `${Math.floor(raw.runtime / 60)}h ${raw.runtime % 60}m`
        : 'N/A',
    genre: (raw.genre_ids || raw.genres?.map((g: any) => g.id) || [])
      .map((id: number) => genreLookup[id])
      .filter(Boolean),
    thumbnail: raw.poster_path ? `${IMG_BASE}/w500${raw.poster_path}` : '',
    backdrop: raw.backdrop_path ? `${IMG_BASE}/original${raw.backdrop_path}` : '',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type,
    seasons: type === 'tv' ? raw.number_of_seasons : undefined,
    ...flags,
  };
}

async function fetchPages(
  path: string,
  type: 'movie' | 'tv',
  pages: number,
  flags: Partial<Movie> = {}
): Promise<Movie[]> {
  await loadGenres();
  const requests = Array.from({ length: pages }, (_, i) =>
    fetch(`${BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${API_KEY}&page=${i + 1}`)
  );
  const responses = await Promise.all(requests);
  const datas = await Promise.all(responses.map((r) => r.json()));
  const results: any[] = [];
  datas.forEach((d) => results.push(...(d.results || [])));
  const seen = new Set<string>();
  return results
    .filter((r) => {
      if (seen.has(String(r.id))) return false;
      seen.add(String(r.id));
      return true;
    })
    .map((r) => mapItem(r, type, flags));
}

async function getTrending(): Promise<Movie[]> {
  return fetchPages('/trending/movie/week', 'movie', 1, { isTrending: true });
}

async function getPopular(): Promise<Movie[]> {
  return fetchPages('/movie/popular', 'movie', 2, { isPopular: true });
}

async function getLatest(): Promise<Movie[]> {
  return fetchPages('/movie/now_playing', 'movie', 1, { isLatest: true });
}

async function getMoviesOnly(): Promise<Movie[]> {
  return fetchPages('/movie/top_rated', 'movie', 3);
}

async function getTvShows(): Promise<Movie[]> {
  return fetchPages('/tv/popular', 'tv', 3);
}

async function getAllMovies(): Promise<Movie[]> {
  const [movies, tv] = await Promise.all([getMoviesOnly(), getTvShows()]);
  return [...movies, ...tv];
}

async function getMoviesByGenre(genreName: string): Promise<Movie[]> {
  await loadGenres();
  const genreId = movieGenreNameToId[genreName];
  if (!genreId) return [];
  return fetchPages(`/discover/movie?with_genres=${genreId}`, 'movie', 1);
}

async function getAvailableGenres(): Promise<string[]> {
  await loadGenres();
  return Object.values(movieGenreMap);
}

async function getAvailableYears(): Promise<number[]> {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= current - 40; y--) years.push(y);
  return years;
}

async function searchMovies(
  query: string,
  filters?: {
    genres?: string[];
    minRating?: number;
    yearStart?: number;
    yearEnd?: number;
    sortBy?: 'rating' | 'year' | 'title';
  }
): Promise<Movie[]> {
  await loadGenres();
  let results: Movie[] = [];

  if (query.trim()) {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    results = (data.results || []).map((m: any) => mapItem(m, 'movie'));
  } else {
    results = await getMoviesOnly();
  }

  if (filters) {
    if (filters.genres && filters.genres.length > 0) {
      results = results.filter((m) => m.genre.some((g) => filters.genres!.includes(g)));
    }
    if (filters.minRating) {
      results = results.filter((m) => m.rating >= filters.minRating!);
    }
    if (filters.yearStart) {
      results = results.filter((m) => m.year >= filters.yearStart!);
    }
    if (filters.yearEnd) {
      results = results.filter((m) => m.year <= filters.yearEnd!);
    }
    if (filters.sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'year') {
      results = [...results].sort((a, b) => b.year - a.year);
    } else if (filters.sortBy === 'title') {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return results;
}

async function getRelatedMovies(movie: Movie): Promise<Movie[]> {
  await loadGenres();
  const path = movie.type === 'tv' ? `/tv/${movie.id}/similar` : `/movie/${movie.id}/similar`;
  const res = await fetch(`${BASE_URL}${path}?api_key=${API_KEY}`);
  const data = await res.json();
  return (data.results || []).map((r: any) => mapItem(r, movie.type || 'movie'));
}

export const movieService = {
  getAllMovies,
  getMoviesOnly,
  getTvShows,
  getTrending,
  getPopular,
  getLatest,
  getMoviesByGenre,
  getAvailableGenres,
  getAvailableYears,
  searchMovies,
  getRelatedMovies,
};
