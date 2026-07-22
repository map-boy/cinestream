import React from 'react';
import { Search, X, Film, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { Movie, MovieFilters } from '../types';
import { MovieCard } from './MovieCard';
import { FilterPanel } from './FilterPanel';
import { MovieCardSkeleton } from './Skeleton';
import { VirtualizedMovieGrid } from './VirtualizedMovieGrid';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  results: Movie[];
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  filters: MovieFilters;
  onFilterChange: (filters: MovieFilters) => void;
  availableGenres: string[];
  availableYears: number[];
  onResetFilters: () => void;
  isSearching?: boolean;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  query,
  results,
  onPlay,
  onInfo,
  filters,
  onFilterChange,
  availableGenres,
  availableYears,
  onResetFilters,
  isSearching = false,
}) => {
  const [showFilterPanel, setShowFilterPanel] = React.useState(true);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[55] bg-zinc-950/95 dark:bg-black/95 backdrop-blur-xl pt-24 px-4 sm:px-8 md:px-12 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tighter">
              {query ? (
                <>
                  Results for <span className="text-red-600">"{query}"</span>
                </>
              ) : (
                'Search & Filter Movies'
              )}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-white hover:bg-zinc-800 transition-colors min-h-[40px]"
            >
              <SlidersHorizontal className="w-4 h-4 text-red-500" />
              <span>{showFilterPanel ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close search overlay"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-zinc-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="mb-8">
            <FilterPanel
              filters={filters}
              onFilterChange={onFilterChange}
              availableGenres={availableGenres}
              availableYears={availableYears}
              onReset={onResetFilters}
              totalResultsCount={results.length}
            />
          </div>
        )}

        {/* Results Grid / Skeleton */}
        {isSearching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 pb-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="pb-20">
            <VirtualizedMovieGrid
              movies={results}
              onPlay={onPlay}
              onInfo={onInfo}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800/80 mb-20 p-8">
            <Film className="w-16 h-16 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No movies found matching your criteria</h3>
            <p className="text-gray-400 text-sm max-w-md mb-6">
              Try adjusting your search terms or clearing some genre and rating filters.
            </p>
            <button
              onClick={onResetFilters}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-lg"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
