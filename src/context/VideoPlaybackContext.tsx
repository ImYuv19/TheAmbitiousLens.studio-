import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

interface VideoPlaybackContextType {
  activeVideoId: string | null;
  playVideo: (id: string) => void;
  pauseVideo: () => void;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextType | undefined>(undefined);

export const VideoPlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const playVideo = useCallback((id: string) => {
    setActiveVideoId(id);
  }, []);

  const pauseVideo = useCallback(() => {
    setActiveVideoId(null);
  }, []);

  const value = useMemo(() => ({ activeVideoId, playVideo, pauseVideo }), [activeVideoId, playVideo, pauseVideo]);

  return (
    <VideoPlaybackContext.Provider value={value}>
      {children}
    </VideoPlaybackContext.Provider>
  );
};

export const useVideoPlayback = () => {
  const context = useContext(VideoPlaybackContext);
  if (!context) {
    throw new Error('useVideoPlayback must be used within a VideoPlaybackProvider');
  }
  return context;
};
