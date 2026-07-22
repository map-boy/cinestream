import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';

interface HeroProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movies, onPlay, onInfo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % movies.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);

  const movie = movies[currentIndex];

  if (!movie) return null;

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-12 max-w-3xl">
        <motion.div
          key={`content-${movie.id}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Featured
            </span>
            <span className="text-gray-300 text-xs md:text-sm font-medium">
              {movie.year} • {movie.duration} • {movie.genre.join(', ')}
            </span>
          </div>
          
          <h1 className="sr-only">CineStream - Watch Movies and TV Shows Online</h1>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight">
            {movie.title}
          </h2>
          
          <p className="text-gray-300 text-xs sm:text-sm md:text-lg mb-6 md:mb-8 line-clamp-3 max-w-xl">
            {movie.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button
              onClick={() => onPlay(movie)}
              className="flex items-center justify-center gap-2 bg-white text-black min-h-[44px] px-5 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm sm:text-base hover:bg-white/90 transition-all transform active:scale-95 shadow-lg"
            >
              <Play className="w-5 h-5 fill-current" />
              Play Now
            </button>
            <button
              onClick={() => onInfo(movie)}
              className="flex items-center justify-center gap-2 bg-zinc-700/60 text-white min-h-[44px] px-5 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm sm:text-base backdrop-blur-md hover:bg-zinc-600/80 transition-all transform active:scale-95 shadow-lg"
            >
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12 flex items-center gap-2 sm:gap-4">
        <button
          onClick={prev}
          aria-label="Previous featured movie"
          className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next featured movie"
          className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-white bg-black/30 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-12 flex gap-1.5 sm:gap-2">
        {movies.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 transition-all duration-300 rounded-full',
              i === currentIndex ? 'w-6 sm:w-8 bg-red-600' : 'w-2 bg-white/40'
            )}
          />
        ))}
      </div>

    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}


