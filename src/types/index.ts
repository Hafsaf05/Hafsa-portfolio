export type WindowType =
  | "projects"
  | "research"
  | "certificates"
  | "contact"
  | "stats"
  | "terminal"
  | "resume"
  | "papers";

export interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  subtitle: string;
  highlights: string[];
  metric?: string;
  metricLabel?: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  architecture?: string;
}
