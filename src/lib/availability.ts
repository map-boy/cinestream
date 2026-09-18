import { Movie } from '../types';

/**
 * CineStream can only stream a film in full when a public domain copy has been
 * verified in the Internet Archive. Everything else is trailer-only. The UI has
 * to say which it is before the user presses the button: labelling both cases
 * "Play" implies a full film we cannot legally provide.
 */
export function isFullFilm(movie: Pick<Movie, 'isPlayableFull'>): boolean {
  return movie.isPlayableFull === true;
}

export function playLabel(movie: Pick<Movie, 'isPlayableFull'>): string {
  return isFullFilm(movie) ? 'Watch Full Film' : 'Watch Trailer';
}

export function availabilityLabel(movie: Pick<Movie, 'isPlayableFull'>): string {
  return isFullFilm(movie) ? 'Full film · public domain' : 'Trailer only';
}
