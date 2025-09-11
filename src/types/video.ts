export interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadTime: string;
  videoUrl?: string;
  description?: string;
  likes?: string;
  dislikes?: string;
  subscribers?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
}