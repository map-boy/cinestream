import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X, RotateCcw, FastForward, Rewind, Captions } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Movie } from '../types';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  movie: Movie;
  onClose: (progress: number) => void;
  onProgressUpdate?: (progress: number) => void;
  initialProgress?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose, onProgressUpdate, initialProgress = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [progress, setProgress] = useState(initialProgress);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic sample subtitle tracks based on progress/time
  const getSubtitleText = (p: number) => {
    if (p < 10) return `[English CC] ${movie.title} - Official Streaming Preview`;
    if (p < 25) return "Director: 'In this scene, the atmosphere transforms completely...'";
    if (p < 45) return "Character: 'We must make a decision before time runs out.'";
    if (p < 65) return "Character: 'Look at the horizon. Everything has changed.'";
    if (p < 85) return "[Dramatic orchestra music swells]";
    return "Character: 'Whatever comes next... we face it together.'";
  };

  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = (initialProgress / 100) * videoRef.current.duration;
    }
  }, [initialProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && videoRef.current) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration || 1;
        const currentProgress = (current / total) * 100;
        onProgressUpdate?.(currentProgress);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, onProgressUpdate]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTo = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center select-none"
    >
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleProgress}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
      />

      {/* Onscreen Subtitles Overlay */}
      {subtitlesEnabled && (
        <div className="absolute bottom-20 md:bottom-28 left-12 right-12 text-center pointer-events-none z-10 transition-all">
          <span className="inline-block bg-black/80 text-yellow-300 font-medium px-4 py-1.5 rounded-md text-sm md:text-lg border border-white/10 shadow-lg backdrop-blur-sm">
            {getSubtitleText(progress)}
          </span>
        </div>
      )}

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 flex flex-col justify-between p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <button 
                  onClick={() => onClose(progress)}
                  aria-label="Close Video Player"
                  className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-white font-bold text-base md:text-xl line-clamp-1">{movie.title}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <div className="relative group/progress">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  aria-label="Video Progress"
                  className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-red-600 group-hover/progress:h-2.5 transition-all"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 sm:gap-6">
                  <button 
                    onClick={togglePlay} 
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="text-white hover:text-red-500 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                  </button>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button 
                      onClick={() => skip(-10)} 
                      aria-label="Rewind 10 seconds"
                      className="text-white hover:text-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
                    >
                      <Rewind className="w-6 h-6 fill-current" />
                    </button>
                    <button 
                      onClick={() => skip(10)} 
                      aria-label="Forward 10 seconds"
                      className="text-white hover:text-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
                    >
                      <FastForward className="w-6 h-6 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 group/volume">
                    <button 
                      onClick={toggleMute} 
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="text-white hover:text-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      aria-label="Volume"
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setVolume(v);
                        if (videoRef.current) videoRef.current.volume = v;
                      }}
                      className="w-16 sm:w-24 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Subtitles Toggle Button */}
                  <button
                    onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                    aria-label="Toggle Subtitles"
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-colors min-h-[40px]',
                      subtitlesEnabled
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
                    )}
                  >
                    <Captions className="w-4 h-4" />
                    <span className="hidden sm:inline">CC</span>
                  </button>

                  <button 
                    onClick={toggleFullscreen} 
                    aria-label="Toggle Fullscreen"
                    className="text-white hover:text-red-500 min-w-[40px] min-h-[40px] flex items-center justify-center transition-colors"
                  >
                    {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

