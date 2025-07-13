export interface ProgressReport {
  id: string;
  number: number;
  date: string;
  items: string[];
  tags?: string[];
  link?: {
    name: string;
    url: string;
  };
}