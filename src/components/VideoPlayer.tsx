import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MoreVertical, ThumbsUp, ThumbsDown, Share, Download } from 'lucide-react';
import { Video } from '../types/video';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const videoElement = videoRef.current?.parentElement;
    videoElement?.addEventListener('mousemove', handleMouseMove);
    videoElement?.addEventListener('mouseleave', () => {
      if (isPlaying) {
        setShowControls(false);
      }
    });

    return () => {
      videoElement?.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="flex flex-col h-full">
        {/* Video Player */}
        <div className="relative flex-1 bg-black flex items-center justify-center">
          {/* Placeholder for video - in a real app, you'd use the video.videoUrl */}
          <div className="relative w-full h-full max-w-6xl max-h-full">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-contain"
            />
            
            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Play/Pause Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white ml-1" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center space-x-4">
                  <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="flex-1 bg-zinc-700 h-1 rounded-full">
                    <div className="bg-red-600 h-full w-1/3 rounded-full"></div>
                  </div>
                  <span className="text-white text-sm">8:32 / 24:31</span>
                  <button className="text-white hover:text-red-500 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Video Info Panel */}
        <div className="bg-zinc-900 p-6 max-h-80 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-white text-xl font-semibold mb-2">{video.title}</h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={video.channelAvatar}
                  alt={video.channel}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="text-white font-medium">{video.channel}</h3>
                  <p className="text-zinc-400 text-sm">{video.subscribers} subscribers</p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium transition-colors">
                  Subscribe
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{video.likes}</span>
                </button>
                <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center space-x-4 text-zinc-300 text-sm mb-2">
                <span>{video.views} views</span>
                <span>{video.uploadTime}</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;