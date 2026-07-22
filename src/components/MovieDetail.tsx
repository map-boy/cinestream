import React from 'react';
import { Play, Plus, X, Star, Clock, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';
import { MovieRow } from './MovieRow';

interface MovieDetailProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onSelectMovie: (movie: Movie) => void;
  relatedMovies: Movie[];
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ 
  movie, 
  onClose, 
  onPlay, 
  onAddToList, 
  onSelectMovie,
  relatedMovies 
}) => {
  if (!movie) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative max-w-6xl mx-auto min-h-screen bg-zinc-950 shadow-2xl border-x border-zinc-900">
        <button
          onClick={onClose}
          aria-label="Close detail modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[70] p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/90 transition-transform active:scale-95 border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-[45vh] md:h-[60vh]">
          <img
            src={movie.backdrop}
            alt={movie.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          
          <div className="absolute bottom-6 md:bottom-12 left-4 md:left-16 right-4 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tighter">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center justify-center gap-2 bg-white text-black min-h-[44px] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm sm:text-base hover:bg-white/90 transition-transform active:scale-95 shadow-lg"
              >
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </button>
              <button
                onClick={() => onAddToList(movie)}
                className="flex items-center justify-center gap-2 bg-zinc-800/90 text-white min-h-[44px] px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm sm:text-base border border-zinc-700/60 hover:bg-zinc-700 transition-transform active:scale-95 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add to List
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-16 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-md border border-zinc-800">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-white font-bold">{movie.rating} Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-md border border-zinc-800">
                <Calendar className="w-4 h-4 text-red-500" />
                <span className="text-gray-300">{movie.year}</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/80 px-3 py-1.5 rounded-md border border-zinc-800">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{movie.duration}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-white">Storyline</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre.map((g) => (
                <span key={g} className="px-3 py-1 bg-zinc-900 text-zinc-300 rounded-full text-xs font-semibold border border-zinc-800">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 md:p-6 bg-zinc-900/60 rounded-xl border border-zinc-800">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                Movie Information
              </h3>
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Year</span>
                  <span className="text-gray-200 font-medium">{movie.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-gray-200 font-medium">{movie.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-red-500 font-bold">{movie.rating} / 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedMovies.length > 0 && (
          <div className="pb-16 border-t border-zinc-900/80 pt-8">
            <MovieRow
              title="More Like This"
              movies={relatedMovies}
              onPlay={onPlay}
              onInfo={(m) => onSelectMovie(m)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

