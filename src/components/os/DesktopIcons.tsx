"use client";

import React from "react";
import { useOSStore } from "@/store/window-store";
import {
  FileText,
  FolderKanban,
  Mail,
  BookOpen,
} from "lucide-react";

const icons = [
  {
    id: "resume",
    label: "Resume.pdf",
    icon: FileText,
  },
  {
    id: "projects",
    label: "Projects.exe",
    icon: FolderKanban,
  },
  {
    id: "research",
    label: "Research.pdf",
    icon: BookOpen,
  },
  {
    id: "contact",
    label: "Contact.exe",
    icon: Mail,
  },
];

const DesktopIcons = () => {
  const { openWindow } = useOSStore();

  return (
    <div className="absolute top-8 left-8 z-20 flex flex-col gap-6">
      {icons.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() =>
              openWindow(item.id as any)
            }
            className="
              flex
              flex-col
              items-center
              gap-2
              w-24
              group
            "
          >
            <div
              className="
                p-4
                rounded-xl
                bg-white/5
                border
                border-white/10
                group-hover:border-neon-blue/50
                transition-all
              "
            >
              <Icon
                size={32}
                className="text-neon-blue"
              />
            </div>

            <span
              className="
                text-[11px]
                text-white/70
                font-mono
                text-center
              "
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DesktopIcons;