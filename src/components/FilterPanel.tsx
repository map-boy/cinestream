import React from 'react';
import { Filter, RotateCcw, SlidersHorizontal, Star, Calendar, Tag, ArrowUpDown } from 'lucide-react';
import { MovieFilters } from '../types';

interface FilterPanelProps {
  filters: MovieFilters;
  onFilterChange: (filters: MovieFilters) => void;
  availableGenres: string[];
  availableYears: number[];
  onReset: () => void;
  totalResultsCount?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  availableGenres,
  availableYears,
  onReset,
  totalResultsCount,
}) => {
  const toggleGenre = (genre: string) => {
    const current = filters.genres || [];
    const exists = current.includes(genre);
    const updated = exists ? current.filter((g) => g !== genre) : [...current, genre];
    onFilterChange({ ...filters, genres: updated });
  };

  const hasActiveFilters =
    (filters.genres && filters.genres.length > 0) ||
    (filters.minRating && filters.minRating > 0) ||
    filters.yearStart ||
    filters.yearEnd ||
    filters.sortBy;

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl p-5 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-red-600" />
          <h3 className="text-white font-bold text-lg">Filter Movies</h3>
          {totalResultsCount !== undefined && (
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-medium ml-2">
              {totalResultsCount} found
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 transition-colors font-medium min-h-[36px] px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Genres Multi-Select */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Tag className="w-4 h-4 text-red-500" />
          Genres
        </div>
        <div className="flex flex-wrap gap-2">
          {availableGenres.map((genre) => {
            const isSelected = filters.genres?.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[36px] ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md scale-105'
                    : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-zinc-800/80 pt-4">
        {/* Minimum Rating */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            Min Rating
          </label>
          <select
            value={filters.minRating || 0}
            onChange={(e) =>
              onFilterChange({ ...filters, minRating: parseFloat(e.target.value) || 0 })
            }
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-red-600 focus:outline-none min-h-[40px]"
          >
            <option value={0}>All Ratings</option>
            <option value={7.0}>⭐ 7.0 & above</option>
            <option value={8.0}>⭐ 8.0 & above</option>
            <option value={8.5}>⭐ 8.5 & above</option>
            <option value={9.0}>⭐ 9.0 & above</option>
          </select>
        </div>

        {/* Release Year Dropdown */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            Release Year From
          </label>
          <select
            value={filters.yearStart || 0}
            onChange={(e) =>
              onFilterChange({ ...filters, yearStart: parseInt(e.target.value) || undefined })
            }
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-red-600 focus:outline-none min-h-[40px]"
          >
            <option value={0}>All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
            Sort By
          </label>
          <select
            value={filters.sortBy || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sortBy: (e.target.value as 'rating' | 'year' | 'title') || undefined,
              })
            }
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-red-600 focus:outline-none min-h-[40px]"
          >
            <option value="">Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="year">Newest First</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
