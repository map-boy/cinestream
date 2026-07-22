import React from 'react';
import { Play, Plus, Star, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie } from '../types';
import { cn } from '../lib/utils';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
  progress?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPlay, onInfo, onAddToList, progress }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="relative flex-shrink-0 w-36 sm:w-44 md:w-64 aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer shadow-lg bg-zinc-900 border border-zinc-800/60"
      onClick={() => onInfo(movie)}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />

      {progress !== undefined && progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-800 z-10">
          <div 
            className="h-full bg-red-600 transition-all duration-300" 
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} 
          />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
            aria-label={`Play ${movie.title}`}
            className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center bg-white text-black rounded-full hover:bg-white/90 transition-transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToList?.(movie);
            }}
            aria-label={`Add ${movie.title} to My List`}
            className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-800/90 text-white rounded-full hover:bg-zinc-700 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInfo(movie);
            }}
            aria-label={`View info for ${movie.title}`}
            className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center bg-zinc-800/90 text-white rounded-full hover:bg-zinc-700 transition-transform active:scale-95 ml-auto"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{movie.rating}</span>
          </div>
          <span className="text-gray-300 text-[10px] uppercase font-bold tracking-wider">
            {movie.year}
          </span>
        </div>
        
        <p className="text-gray-400 text-[10px] md:text-xs mt-1.5 line-clamp-2 hidden sm:block">
          {movie.description}
        </p>
      </div>
    </motion.div>
  );
};

