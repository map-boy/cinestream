import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Movie } from '../types';
import { movieService } from '../services/movieService';

interface VideoPlayerProps {
  movie: Movie;
  onClose: (progress: number) => void;
  onProgressUpdate?: (progress: number) => void;
  initialProgress?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(!movie.isPlayableFull);

  useEffect(() => {
    if (movie.isPlayableFull) return;
    let cancelled = false;
    setLoading(true);
    movieService.getTrailerKey(movie.id, movie.type || 'movie').then((key) => {
      if (!cancelled) {
        setTrailerKey(key);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [movie.id, movie.type, movie.isPlayableFull]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <button
        onClick={() => onClose(0)}
        aria-label="Close Video Player"
        className="absolute top-4 right-4 z-10 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {movie.isPlayableFull ? (
        <div className="w-full h-full max-w-6xl max-h-[85vh] mx-auto my-auto aspect-video">
          <iframe
            className="w-full h-full"
            src={movie.videoUrl}
            title={movie.title}
            allowFullScreen
            frameBorder="0"
          />
          <p className="text-center text-zinc-500 text-xs mt-2">
            Full movie courtesy of the Internet Archive (public domain)
          </p>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p>Loading trailer...</p>
        </div>
      ) : trailerKey ? (
        <div className="w-full h-full max-w-6xl max-h-[80vh] mx-auto my-auto aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="text-white text-center px-6">
          <p className="text-lg font-bold mb-2">No trailer available for "{movie.title}"</p>
          <p className="text-zinc-400 text-sm">This title doesn't have a trailer on TMDB yet.</p>
        </div>
      )}
    </div>
  );
};
