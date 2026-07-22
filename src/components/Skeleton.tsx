import React from 'react';
import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-800/50',
        className
      )}
    />
  );
};

export const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="flex-shrink-0 w-40 md:w-64 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900/40 border border-zinc-800/50">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export const MovieRowSkeleton: React.FC = () => {
  return (
    <div className="py-8 px-4 md:px-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full bg-zinc-950 px-4 md:px-12 flex flex-col justify-center">
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-16 md:h-24 w-full md:w-3/4" />
        <Skeleton className="h-20 w-full md:w-2/3" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 md:w-40" />
          <Skeleton className="h-12 w-32 md:w-40" />
        </div>
      </div>
    </div>
  );
};
