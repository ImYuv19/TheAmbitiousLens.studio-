export interface HeroVideo {
  id: number;
  src: string;
}

/**
 * Data source for Yuvraj Singh's Hero Cinematic Marquee.
 * Automatically loops through these paths.
 * Dropping local files into /public/videos/hero/ matches these paths.
 */
export const heroVideos: HeroVideo[] = [
  { id: 1, src: "/videos/hero/clip1.mp4" },
  { id: 2, src: "/videos/hero/clip2.mp4" },
  { id: 3, src: "/videos/hero/clip3.mp4" },
  { id: 4, src: "/videos/hero/clip4.mp4" },
  { id: 5, src: "/videos/hero/clip5.mp4" },
  { id: 6, src: "/videos/hero/clip6.mp4" },
  { id: 7, src: "/videos/hero/clip7.mp4" },
  { id: 8, src: "/videos/hero/clip8.mp4" },
  { id: 9, src: "/videos/hero/clip9.mp4" },
  { id: 10, src: "/videos/hero/clip10.mp4" },
  { id: 11, src: "/videos/hero/clip11.mp4" },
  { id: 12, src: "/videos/hero/clip12.mp4" },
  { id: 13, src: "/videos/hero/clip13.mp4" },
  { id: 14, src: "/videos/hero/clip14.mp4" },
  { id: 15, src: "/videos/hero/clip15.mp4" },
  { id: 16, src: "/videos/hero/clip16.mp4" }
];
