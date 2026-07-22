import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MovieRow } from './components/MovieRow';
import { MovieDetail } from './components/MovieDetail';
import { VideoPlayer } from './components/VideoPlayer';
import { SearchOverlay } from './components/SearchOverlay';
import { HeroSkeleton, MovieRowSkeleton } from './components/Skeleton';
import { VirtualizedMovieGrid } from './components/VirtualizedMovieGrid';
import { Movie, UserProfile, MovieFilters } from './types';
import { movieService } from './services/movieService';
import { ThemeProvider } from './context/ThemeContext';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { AnimatePresence, motion } from 'motion/react';
import { FilterPanel } from './components/FilterPanel';
import { Blog } from './components/Blog';
import { AdSlot } from './components/AdSlot';

function CineStreamApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<MovieFilters>({
    genres: [],
    minRating: 0,
    yearStart: undefined,
    yearEnd: undefined,
    sortBy: undefined,
  });

  // Movie collections state
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [moviesOnly, setMoviesOnly] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  
  // Search & Related state
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);

  // Selected & Playing
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  // User Auth & Firestore profile
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Initial Data Fetching via movieService
  useEffect(() => {
    async function loadInitialData() {
      setIsAppLoading(true);
      try {
        const [
          all,
          movies,
          tv,
          trending,
          popular,
          latest,
          action,
          drama,
          genres,
          years,
        ] = await Promise.all([
          movieService.getAllMovies(),
          movieService.getMoviesOnly(),
          movieService.getTvShows(),
          movieService.getTrending(),
          movieService.getPopular(),
          movieService.getLatest(),
          movieService.getMoviesByGenre('Action'),
          movieService.getMoviesByGenre('Drama'),
          movieService.getAvailableGenres(),
          movieService.getAvailableYears(),
        ]);

        setAllMovies(all);
        setMoviesOnly(movies);
        setTvShows(tv);
        setTrendingMovies(trending);
        setPopularMovies(popular);
        setLatestMovies(latest);
        setActionMovies(action);
        setDramaMovies(drama);
        setAvailableGenres(genres);
        setAvailableYears(years);
      } catch (err) {
        console.error('Failed to load movie collections:', err);
      } finally {
        setIsAppLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Sync user profile
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (!userDoc.exists()) {
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            myList: [],
            history: [],
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
          setUserProfile(newProfile);
        } else {
          setUserProfile(userDoc.data() as UserProfile);
        }

        // Real-time updates for user profile
        onSnapshot(doc(db, 'users', firebaseUser.uid), (snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.data() as UserProfile);
          }
        });
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Search & Filter Execution
  const executeSearch = useCallback(async () => {
    const hasQuery = searchQuery.trim() !== '';
    const hasActiveFilters =
      (filters.genres && filters.genres.length > 0) ||
      (filters.minRating && filters.minRating > 0) ||
      filters.yearStart !== undefined ||
      filters.yearEnd !== undefined ||
      filters.sortBy !== undefined;

    if (!hasQuery && !hasActiveFilters && !isFilterPanelOpen) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await movieService.searchMovies(searchQuery, filters);
      setSearchResults(results);
    } catch (err) {
      console.error('Failed searching movies:', err);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, filters, isFilterPanelOpen]);

  useEffect(() => {
    executeSearch();
  }, [executeSearch]);

  // Load related movies whenever selectedMovie changes
  useEffect(() => {
    if (selectedMovie) {
      movieService.getRelatedMovies(selectedMovie).then(setRelatedMovies);
    } else {
      setRelatedMovies([]);
    }
  }, [selectedMovie]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleAddToList = async (movie: Movie) => {
    if (!user) {
      handleLogin();
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        myList: arrayUnion(movie.id),
      });
    } catch (error) {
      console.error('Failed to add to list:', error);
    }
  };

  const handleProgressUpdate = async (movie: Movie, progress: number) => {
    if (!user || !userProfile) return;

    const history = [...userProfile.history];
    const existingIndex = history.findIndex((h) => h.movieId === movie.id);

    if (existingIndex > -1) {
      history[existingIndex] = {
        ...history[existingIndex],
        progress,
        watchedAt: Date.now(),
      };
    } else {
      history.push({
        movieId: movie.id,
        progress,
        watchedAt: Date.now(),
      });
    }

    const sortedHistory = history.sort((a, b) => b.watchedAt - a.watchedAt).slice(0, 20);

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        history: sortedHistory,
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const resetFilters = () => {
    setFilters({
      genres: [],
      minRating: 0,
      yearStart: undefined,
      yearEnd: undefined,
      sortBy: undefined,
    });
  };

  const hasActiveFilters =
    (filters.genres && filters.genres.length > 0) ||
    (filters.minRating && filters.minRating > 0) ||
    filters.yearStart !== undefined ||
    filters.sortBy !== undefined;

  const myListMovies = useMemo(() => {
    if (!userProfile) return [];
    return allMovies.filter((m) => userProfile.myList.includes(m.id));
  }, [userProfile, allMovies]);

  const continueWatchingMovies = useMemo(() => {
    if (!userProfile) return [];
    return userProfile.history
      .map((h) => allMovies.find((m) => m.id === h.movieId))
      .filter((m): m is Movie => !!m);
  }, [userProfile, allMovies]);

  const movieProgressMap = useMemo(() => {
    if (!userProfile) return {};
    return userProfile.history.reduce((acc, h) => {
      acc[h.movieId] = h.progress;
      return acc;
    }, {} as Record<string, number>);
  }, [userProfile]);

  const isSearchOrFilterActive =
    searchQuery.trim() !== '' || isFilterPanelOpen || hasActiveFilters;

  if (isAppLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearch={() => {}}
        />
        <main className="pb-20">
          <HeroSkeleton />
          <div className="-mt-20 relative z-10 space-y-8">
            <MovieRow title="Trending Now" movies={[]} onPlay={() => {}} onInfo={() => {}} isLoading={true} />
            <MovieRow title="Popular Movies" movies={[]} onPlay={() => {}} onInfo={() => {}} isLoading={true} />
            <MovieRow title="Latest Releases" movies={[]} onPlay={() => {}} onInfo={() => {}} isLoading={true} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-600 selection:text-white transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearchQuery}
        onToggleFilters={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        isFilterOpen={isFilterPanelOpen}
        hasActiveFilters={hasActiveFilters}
      />

      <main className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero
                movies={trendingMovies.slice(0, 5)}
                onPlay={setPlayingMovie}
                onInfo={setSelectedMovie}
              />
              
              <div className="-mt-20 relative z-10">
                {continueWatchingMovies.length > 0 && (
                  <MovieRow
                    title="Continue Watching"
                    movies={continueWatchingMovies}
                    onPlay={setPlayingMovie}
                    onInfo={setSelectedMovie}
                    movieProgress={movieProgressMap}
                  />
                )}
                <MovieRow
                  title="Trending Now"
                  movies={trendingMovies}
                  onPlay={setPlayingMovie}
                  onInfo={setSelectedMovie}
                />
                <MovieRow
                  title="Popular Movies"
                  movies={popularMovies}
                  onPlay={setPlayingMovie}
                  onInfo={setSelectedMovie}
                />
                <MovieRow
                  title="Latest Releases"
                  movies={latestMovies}
                  onPlay={setPlayingMovie}
                  onInfo={setSelectedMovie}
                />
                <div className="px-4 md:px-12">
                  <AdSlot slot="2222222222" />
                </div>
                <MovieRow
                  title="Action Thrillers"
                  movies={actionMovies}
                  onPlay={setPlayingMovie}
                  onInfo={setSelectedMovie}
                />
                <MovieRow
                  title="Powerful Dramas"
                  movies={dramaMovies}
                  onPlay={setPlayingMovie}
                  onInfo={setSelectedMovie}
                />
                <div className="px-4 md:px-12">
                  <AdSlot slot="1111111111" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'movies' && (
            <motion.div
              key="movies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-28 px-4 md:px-12 space-y-8"
            >
              <VirtualizedMovieGrid
                gridTitle="Movies Catalog"
                movies={moviesOnly.length > 0 ? moviesOnly : allMovies.filter((m) => m.type !== 'tv')}
                onPlay={setPlayingMovie}
                onInfo={setSelectedMovie}
                onAddToList={handleAddToList}
                movieProgress={movieProgressMap}
              />
            </motion.div>
          )}

          {activeTab === 'tv' && (
            <motion.div
              key="tv"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-28 px-4 md:px-12 space-y-8"
            >
              <VirtualizedMovieGrid
                gridTitle="TV Shows & Series"
                movies={tvShows.length > 0 ? tvShows : allMovies.filter((m) => m.type === 'tv')}
                onPlay={setPlayingMovie}
                onInfo={setSelectedMovie}
                onAddToList={handleAddToList}
                movieProgress={movieProgressMap}
              />
            </motion.div>
          )}

          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-28 px-4 md:px-12 space-y-8"
            >
              <h2 className="text-3xl font-black uppercase tracking-tighter border-b border-zinc-800 pb-4">Trending Today</h2>
              <MovieRow title="Top 10 Global" movies={trendingMovies} onPlay={setPlayingMovie} onInfo={setSelectedMovie} />
              <MovieRow title="Most Watched" movies={popularMovies} onPlay={setPlayingMovie} onInfo={setSelectedMovie} />
            </motion.div>
          )}

          {activeTab === 'mylist' && (
            <motion.div
              key="mylist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-28 px-4 md:px-12"
            >
              <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter border-b border-zinc-800 pb-4">My List</h2>
              {myListMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {myListMovies.map((movie) => (
                    <MovieRow
                      key={movie.id}
                      title=""
                      movies={[movie]}
                      onPlay={setPlayingMovie}
                      onInfo={setSelectedMovie}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800/80 p-8">
                  <p className="text-zinc-400 text-lg mb-4">Your list is currently empty.</p>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Explore Movies
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {isSearchOrFilterActive && (
          <SearchOverlay
            isOpen={isSearchOrFilterActive}
            onClose={() => {
              setSearchQuery('');
              setIsFilterPanelOpen(false);
            }}
            query={searchQuery}
            results={searchResults}
            onPlay={setPlayingMovie}
            onInfo={setSelectedMovie}
            filters={filters}
            onFilterChange={setFilters}
            availableGenres={availableGenres}
            availableYears={availableYears}
            onResetFilters={resetFilters}
            isSearching={isSearching}
          />
        )}

        {selectedMovie && (
          <MovieDetail
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onPlay={(m) => {
              setSelectedMovie(null);
              setPlayingMovie(m);
            }}
            onAddToList={handleAddToList}
            onSelectMovie={(m) => setSelectedMovie(m)}
            relatedMovies={relatedMovies}
          />
        )}

        {playingMovie && (
          <VideoPlayer
            movie={playingMovie}
            onClose={(progress) => {
              handleProgressUpdate(playingMovie, progress);
              setPlayingMovie(null);
            }}
            onProgressUpdate={(progress) => handleProgressUpdate(playingMovie, progress)}
            initialProgress={movieProgressMap[playingMovie.id] || 0}
          />
        )}
      </AnimatePresence>

      {isBlogOpen && <Blog onClose={() => setIsBlogOpen(false)} />}

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4 md:px-12 text-zinc-500 text-sm bg-zinc-950">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">CineStream</h4>
            <p className="text-xs leading-relaxed text-zinc-400">The premier streaming destination for high-definition cinema and exclusive originals.</p>
          </div>
          <div className="space-y-2 flex flex-col">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Navigation</h4>
            <button onClick={() => setActiveTab('home')} className="text-left text-xs hover:text-white transition-colors">Home</button>
            <button onClick={() => setActiveTab('movies')} className="text-left text-xs hover:text-white transition-colors">Movies Catalog</button>
            <button onClick={() => setActiveTab('tv')} className="text-left text-xs hover:text-white transition-colors">TV Shows</button>
            <button onClick={() => setActiveTab('trending')} className="text-left text-xs hover:text-white transition-colors">Trending Now</button>
            <button onClick={() => setIsBlogOpen(true)} className="text-left text-xs hover:text-white transition-colors">Blog</button>
          </div>
          <div className="space-y-2 flex flex-col">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Support</h4>
            <a href="/contact.html" className="text-left text-xs hover:text-white transition-colors">Contact Us</a>
            <a href="/about.html" className="text-left text-xs hover:text-white transition-colors">About Us</a>
            <a href="/terms.html" className="text-left text-xs hover:text-white transition-colors">Terms of Service</a>
            <a href="/privacy.html" className="text-left text-xs hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-zinc-900 border border-zinc-800 text-xs rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-600 text-white"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-red-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-900/60 text-xs">
          <p>© 2026 CineStream Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">Twitter</button>
            <button className="hover:text-white transition-colors">Instagram</button>
            <button className="hover:text-white transition-colors">YouTube</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CineStreamApp />
    </ThemeProvider>
  );
}










