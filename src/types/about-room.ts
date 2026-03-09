export type CategoryId = "games" | "creators" | "food" | "work";

export interface AboutItem {
  id: string;
  title: string;
  cover: string;
  focalX?: number;
  focalY?: number;
  rating?: string;
  tags: string[];
  note: string;
  meta?: Record<string, string>;
}

export interface AboutCategory {
  id: CategoryId;
  label: string;
  accent: string;
  items: AboutItem[];
}
