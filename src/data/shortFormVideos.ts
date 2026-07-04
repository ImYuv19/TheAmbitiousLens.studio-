export interface ShortFormVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: string; // Optional custom thumbnail; defaults to YouTube's native high-res thumbnail
  category: string;
  duration: string;
}

// Robust helper to extract YouTube ID from shorts, standard, or share links
export const getYoutubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

export const shortFormVideos: ShortFormVideo[] = [
  {
    id: "sf-1",
    title: "AI agents for companies",
    youtubeUrl: "https://youtube.com/shorts/xuf37gTcUoQ",
    category: "brand video",
    duration: "1:19"
  },
  {
    id: "sf-2",
    title: "MR BEAST GROWTH SECRET",
    youtubeUrl: "https://youtube.com/shorts/NjhTqHT1sfk?feature=share",
    category: "podcast clip",
    duration: "0:20"
  },
  {
    id: "sf-3",
    title: "AI",
    youtubeUrl: "https://youtube.com/shorts/3JR1yBCJS8w?feature=share",
    category: "motion graphics",
    duration: "0:26"
  },
  {
    id: "sf-4",
    title: "vlogging simple captions and cuts ",
    youtubeUrl: "https://youtube.com/shorts/iJqUCP57bKY",
    category: "vlogging",
    duration: "0:51"
  }
];
