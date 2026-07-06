export interface MotionProject {
  id: string;
  youtubeUrl: string;
  thumbnail?: string; // Optional custom thumbnail URL
}

export const motionProjects: MotionProject[] = [
  {
    id: "motion-1",
    youtubeUrl: "https://www.youtube.com/embed/gFS5nlV4jYg?si=OVigU-LGYigw1S3M"
  },
  {
    id: "motion-2",
    youtubeUrl: "https://www.youtube.com/embed/nUb6kA8Em-Y?si=Ipu87qJJxcdEFXNP"
  },
  {
    id: "motion-3",
    youtubeUrl: "https://youtube.com/shorts/3JR1yBCJS8w?feature=share"
  },
  {
    id: "motion-4",
    youtubeUrl: "https://youtu.be/Kw7-Kt0Tupk"
  }
];
