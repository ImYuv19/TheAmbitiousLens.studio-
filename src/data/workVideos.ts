export interface WorkVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: string; // Optional custom thumbnail URL
  category: "Normal Talking Head" | "Gaming" | "Clean Professional" | "Documentary Edit" | "Storytelling" | "Sound Design" | "Story & Pacing" | "Trading" | "more";
}

export const workVideos: WorkVideo[] = [
  {
    id: "work-talking-head",
    title: "Minimalist Talking Head Interview Edit",
    youtubeUrl: "https://www.youtube.com/embed/nUb6kA8Em-Y?si=Mm8oMvvXQSBpupGn",
    category: "Normal Talking Head"
  },
  {
    id: "work-gaming",
    title: "Gaming Video Showcase",
    youtubeUrl: "https://youtu.be/NVAd2bKn7zY",
    
    category: "Gaming"
  },
  {
    id: "work-clean-prof",
    title: "Premium Corporate Brand Identity Showcase",
    youtubeUrl: "https://www.youtube.com/embed/orUZnmqmRIY?si=Y4ZwcKzGab3I0AB5",
    category: "Clean Professional"
  },
  {
    id: "work-doc-edit",
    title: "Highlands Documentary Visual Flow Study",
    youtubeUrl: "https://youtu.be/9fSFKu0QcQA",
    category: "Documentary Edit"
  },
  {
    id: "work-storytelling",
    title: "Echoes of Silence Narrative Short",
    youtubeUrl: "https://www.youtube.com/embed/bdo_Rsr5lAQ?si=HuvovrQMIPYgNSag",
    category: "Storytelling"
  },
  {
    id: "work-sound-design",
    title: "Sound Design & Ambient Foleys Masterclass",
    youtubeUrl: "https://www.youtube.com/embed/qhhP1cf-eVc?si=KbJFDMM1cfywKVXM",
    category: "Sound Design"
  },
  {
    id: "work-story-pacing",
    title: "Cinematic Rhythm and Speed Pacing Cut",
    youtubeUrl: "https://www.youtube.com/embed/-umfFjyu6gQ?si=H9tB5YS_-CBXoZVE",
    category: "Story & Pacing"
  },
  {
    id: "work-trading",
    title: "Trading & Finance Edit Showcase",
    youtubeUrl: "https://youtu.be/IochqVuZxQI",
  
    category: "Trading"
  },
  {
    id: "work-others",
    title: "Experimental Visual collage and Montage",
    youtubeUrl: "https://youtu.be/DL0P-U5PvQ0?si=nvU8Ni_BLckzJIIe",
    category: "more"
  }
];
