export type WindowType = 'projects' | 'research' | 'philosophy' | 'contact' | 'stats' | 'terminal' | 'resume' | 'papers';

export interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  architecture: string;
}
