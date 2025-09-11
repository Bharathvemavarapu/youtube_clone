import React from 'react';
import { Video } from '../types/video';
import { MoreVertical } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-lg bg-zinc-800">
        <div className="aspect-video">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* Video info */}
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1 hover:text-zinc-300 cursor-pointer">
            {video.channel}
          </p>
          <div className="flex items-center text-zinc-400 text-sm mt-1">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>{video.uploadTime}</span>
          </div>
        </div>
        <button className="flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-zinc-800 rounded transition-all">
          <MoreVertical className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;