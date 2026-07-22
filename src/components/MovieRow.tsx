import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './Skeleton';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  isLoading?: boolean;
  movieProgress?: Record<string, number>;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onPlay, onInfo, isLoading, movieProgress }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 px-4 md:px-12 group/row">
      <h2 className="text-white text-xl md:text-2xl font-black mb-4 tracking-tight uppercase">
        {title}
      </h2>
      
      <div className="relative">
        {!isLoading && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x"
        >
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="snap-start">
                <MovieCardSkeleton />
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="snap-start">
                <MovieCard 
                  movie={movie} 
                  onPlay={onPlay} 
                  onInfo={onInfo} 
                  progress={movieProgress?.[movie.id]}
                />
              </div>
            ))
          )}
        </div>

        {!isLoading && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center text-white"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};
