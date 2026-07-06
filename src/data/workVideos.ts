export interface WorkVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: string; // Optional custom thumbnail URL
  category: "Normal Talking Head" | "Gaming" | "Clean Professional" | "Documentary Edit" | "Storytelling" | "Sound Design";
}

export const workVideos: WorkVideo[] = [
  {
    id: "work-talking-head",
    title: "talking head motion graphics",
    youtubeUrl: "https://www.youtube.com/embed/nUb6kA8Em-Y?si=Mm8oMvvXQSBpupGn",
    category: "Normal Talking Head"
  },
  {
    id: "work-doc-edit",
    title: "CoCa Cola Documentary Edit ",
    youtubeUrl: "https://www.youtube.com/embed/gFS5nlV4jYg?si=OVigU-LGYigw1S3M",
    category: "Documentary Edit"
  },
  {
    id: "work-gaming",
    title: "Gaming Video Showcase",
    youtubeUrl: "https://youtu.be/NVAd2bKn7zY",
    
    category: "Gaming"
  },
  {
    id: "work-clean-prof",
    title: "my edit war winning video",
    youtubeUrl: "https://www.youtube.com/embed/orUZnmqmRIY?si=Y4ZwcKzGab3I0AB5",
    category: "Clean Professional"
  },
  {
    id: "work-storytelling",
    title: "Echoes of Silence Narrative Short",
    youtubeUrl: "https://www.youtube.com/embed/bdo_Rsr5lAQ?si=HuvovrQMIPYgNSag",
    category: "Storytelling"
  },
  {
    id: "work-sound-design",
    title: "Sound Design",
    youtubeUrl: "https://www.youtube.com/embed/qhhP1cf-eVc?si=KbJFDMM1cfywKVXM",
    category: "Sound Design"
  }
];
