import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#ffffff",
        neon: {
          blue: "#00f2ff",
          purple: "#bc13fe",
          pink: "#ff00e5",
          green: "#00ff9f",
          cyan: "#0ff",
        },
        glass: {
          border: "rgba(255, 255, 255, 0.1)",
          bg: "rgba(10, 10, 10, 0.7)",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "futuristic-grid": "linear-gradient(to right, rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 255, 0.1) 1px, transparent 1px)",
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f2ff, 0 0 20px #00f2ff',
        'neon-purple': '0 0 5px #bc13fe, 0 0 20px #bc13fe',
        'neon-pink': '0 0 5px #ff00e5, 0 0 20px #ff00e5',
        'neon-green': '0 0 5px #00ff9f, 0 0 20px #00ff9f',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
