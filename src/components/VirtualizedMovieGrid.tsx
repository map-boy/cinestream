import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { Zap, Layers } from 'lucide-react';

interface VirtualizedMovieGridProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
  movieProgress?: Record<string, number>;
  gridTitle?: string;
}

export const VirtualizedMovieGrid: React.FC<VirtualizedMovieGridProps> = ({
  movies,
  onPlay,
  onInfo,
  onAddToList,
  movieProgress,
  gridTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(5);
  const [scrollMargin, setScrollMargin] = useState<number>(0);

  // Update column count based on window/container width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(2);
      } else if (width < 768) {
        setColumns(3);
      } else if (width < 1024) {
        setColumns(4);
      } else if (width < 1280) {
        setColumns(5);
      } else {
        setColumns(6);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Measure top offset for accurate window virtualizer calculation
  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollMargin(rect.top + scrollTop);
    }
  }, [movies.length]);

  const rowCount = Math.ceil(movies.length / columns);

  // Calculate row height estimation based on screen width & aspect ratio
  const getRowHeight = () => {
    if (columns <= 2) return 280; // Mobile aspect [2/3] + gap
    if (columns === 3) return 310;
    if (columns === 4) return 330;
    return 360; // Desktop aspect [2/3] + gap
  };

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => getRowHeight(),
    overscan: 2,
    scrollMargin,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {gridTitle && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
              {gridTitle}
            </h2>
            <span className="text-xs bg-zinc-800 text-zinc-300 font-bold px-2.5 py-1 rounded-full border border-zinc-700/60">
              {movies.length} items
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-950/30 px-3 py-1 rounded-full border border-red-900/50">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Virtual Scroll Active ({rowCount} virtual rows)</span>
          </div>
        </div>
      )}

      {movies.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 text-sm bg-zinc-900/30 rounded-xl border border-zinc-800/60">
          No items found in this section.
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualRows.map((virtualRow) => {
            const rowIndex = virtualRow.index;
            const startIndex = rowIndex * columns;
            const rowItems = movies.slice(startIndex, startIndex + columns);

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="absolute top-0 left-0 w-full"
                style={{
                  transform: `translateY(${
                    virtualRow.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                <div
                  className="grid gap-3 sm:gap-4 md:gap-5 pb-4"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                >
                  {rowItems.map((movie) => (
                    <div key={movie.id} className="w-full flex justify-center">
                      <MovieCard
                        movie={movie}
                        onPlay={onPlay}
                        onInfo={onInfo}
                        onAddToList={onAddToList}
                        progress={movieProgress?.[movie.id]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
