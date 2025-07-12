export interface ProgressReport {
  id: string;
  number: number;
  date: string;
  items: string[];
  image?: {
    url: string;
    alt: string;
  };
  tags?: string[];
}

export interface ProgressStats {
  totalReports: number;
  currentStreak: number;
  totalLearningHours?: number;
} 