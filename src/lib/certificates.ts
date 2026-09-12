export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "Hackathons" | "Workshops" | "Badges";
  recognition: string;
  description: string;
  image: string;
  rotation?: number;
  url?: string;
}
export const certificates: Certificate[] = [
  {
    id: "google-sentiment",
    title: "Analyze Sentiment with Natural Language API",
    issuer: "Google Skills",
    date: "August 29, 2026",
    category: "Badges",
    recognition: "Skill badge",
    description:
      "Earned badge verified against Hafsa Fathima’s public Google Skills profile.",
    image: "/certificates/google-sentiment-badge.png",
    url: "https://www.skills.google/public_profiles/6f171d35-da85-4e80-afe7-5b3dcc78f9e1/badges/27382408",
  },
  {
    id: "iare",
    title: "AI Frontier Challenge 2026",
    issuer: "Institute of Aeronautical Engineering, Hyderabad",
    date: "August 7–8, 2026",
    category: "Hackathons",
    recognition: "Appreciation · cleared Round 3",
    description:
      "36-hour hackathon. Recognized for participating and clearing Round 3 with SentinelAI, a self-hosted multi-agent system for detecting fraudulent insurance claims.",
    image: "/certificates/iare-ai-frontier-2026.png",
  },
  {
    id: "devqueens",
    title: "DeVQueens 2026 Hackathon",
    issuer:
      "Women Empowerment Cell, Lords Institute of Engineering & Technology · HackUnion Community",
    date: "April 2, 2026",
    category: "Hackathons",
    recognition: "Certificate of appreciation",
    description:
      "Participation in the DeVQueens 2026 Hackathon in Hyderabad. Project: LegalShe.",
    image: "/certificates/devqueens-2026.jpg",
  },
  {
    id: "cbit",
    title: "CBIT Hackathon — SUDHEE 2026",
    issuer: "Chaitanya Bharathi Institute of Technology, Hyderabad",
    date: "February 14, 2026",
    category: "Hackathons",
    recognition: "Certificate of participation",
    description:
      "Participation in the CBIT Hackathon-SUDHEE 2026. Project: Civic Issue Reporting System.",
    image: "/certificates/cbit-sudhee-2026.png",
  },
  {
    id: "harithon",
    title: "Harithon Eco Hackathon 2025",
    issuer:
      "Telangana National Green Corps · Environmental Education Programme",
    date: "October 2025",
    category: "Hackathons",
    recognition: "Certificate of commendation",
    description:
      "Recognized for creative ideas promoting sustainability, e-waste management, and eco-friendly habits under Mission LiFE, at Jayaprakash Narayana College of Engineering. The certificate shows October 2025; the day is not legible.",
    image: "/certificates/harithon-2025.jpg",
    rotation: 180,
  },
  {
    id: "workshop",
    title: "Artificial Intelligence with Machine Learning",
    issuer: "World On Networks · E-Cell, BITS-Pilani Hyderabad Campus",
    date: "September 20–21, 2025",
    category: "Workshops",
    recognition: "Completed 2-day technical workshop",
    description:
      "Certificate of participation for successfully completing the two-day technical workshop held at BITS-Pilani Hyderabad Campus.",
    image: "/certificates/ai-ml-workshop-2025.jpg",
    rotation: 180,
  },
  {
    id: "specathon",
    title: "SPECATHON 2025",
    issuer:
      "Department of CSM — Gradient Club, St. Peter’s Engineering College",
    date: "September 19–20, 2025",
    category: "Hackathons",
    recognition: "Certificate of participation",
    description: "Participation in a 36-hour national-level hackathon.",
    image: "/certificates/specathon-2025.jpg",
  },
];
