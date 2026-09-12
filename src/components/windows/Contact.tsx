"use client";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
export default function Contact() {
  return (
    <div className="content-stack">
      <div>
        <p className="eyebrow">Start a conversation</p>
        <h2>Let’s build something meaningful.</h2>
        <p>Connect about AI/ML opportunities, research, or collaboration.</p>
      </div>
      {[
        {
          label: "Email",
          value: profile.email,
          url: "mailto:" + profile.email,
          icon: Mail,
        },
        {
          label: "GitHub",
          value: "Hafsaf05",
          url: profile.github,
          icon: Github,
        },
        {
          label: "LinkedIn",
          value: profile.name,
          url: profile.linkedin,
          icon: Linkedin,
        },
      ].map(({ label, value, url, icon: Icon }) => (
        <a
          className="contact-card"
          key={label}
          href={url}
          target={label === "Email" ? undefined : "_blank"}
          rel="noopener noreferrer"
        >
          <Icon size={24} />
          <span>
            <small>{label}</small>
            <strong>{value}</strong>
          </span>
          <ArrowUpRight size={18} />
        </a>
      ))}
    </div>
  );
}
