"use client";
import {
  FolderKanban,
  Network,
  BookOpen,
  FileText,
  Terminal,
  UserRound,
  Mail,
  Award,
} from "lucide-react";
import { useOSStore } from "@/store/window-store";
export const apps = [
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "research", label: "Skills", icon: Network },
  { id: "papers", label: "Research", icon: BookOpen },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "stats", label: "About", icon: UserRound },
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "contact", label: "Contact", icon: Mail },
] as const;
export default function DesktopIcons() {
  const open = useOSStore((s) => s.openWindow);
  return (
    <nav className="desktop-nav" aria-label="Portfolio apps">
      {apps.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => open(id)}>
          <span>
            <Icon size={23} />
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}
