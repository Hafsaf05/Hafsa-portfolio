"use client";

import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  ExternalLink,
} from "lucide-react";

const contacts = [
  {
    title: "EMAIL",
    value: "hafsahffathima05@gmail.com",
    href: "mailto:hafsahffathima05@gmail.com",
    icon: Mail,
    color: "text-neon-blue",
  },
  {
    title: "GITHUB",
    value: "github.com/Hafsaf05",
    href: "https://github.com/Hafsaf05",
    icon: Github,
    color: "text-white",
  },
  {
    title: "LINKEDIN",
    value: "linkedin.com/in/hafsa-fathima05",
    href: "https://linkedin.com/in/hafsa-fathima05",
    icon: Linkedin,
    color: "text-neon-blue",
  },
];

export default function Contact() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold neon-text-blue mb-2">
          Let&apos;s Connect
        </h2>

        <p className="text-white/50 mb-8">
          Open to internships, full-time AI/ML roles,
          research collaborations, and exciting projects.
        </p>

        <div className="space-y-4">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-5 rounded-xl border border-white/10 bg-white/5 hover:border-neon-blue/50 hover:bg-neon-blue/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className={item.color} size={22} />
                  </div>

                  <div>
                    <p className="text-xs text-white/40 tracking-widest">
                      {item.title}
                    </p>

                    <p className="text-white font-medium">
                      {item.value}
                    </p>
                  </div>
                </div>

                <ExternalLink
                  size={18}
                  className="text-white/20 group-hover:text-neon-blue group-hover:translate-x-1 transition-all"
                />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-neon-green mb-2">
            <Briefcase size={16} />
            <span className="text-xs uppercase tracking-widest">
              Availability
            </span>
          </div>

          <p className="text-white font-semibold">
            Open to Opportunities
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-neon-purple mb-2">
            <MapPin size={16} />
            <span className="text-xs uppercase tracking-widest">
              Location
            </span>
          </div>

          <p className="text-white font-semibold">
            India • Open to Relocation
          </p>
        </div>
      </div>
    </div>
  );
}