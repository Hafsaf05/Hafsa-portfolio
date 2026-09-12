import { Project } from "@/types";
export const profile = {
  name: "Hafsa Fathima",
  title: "Artificial Intelligence & Machine Learning Undergraduate",
  email: "hafsahffathima05@gmail.com",
  github: "https://github.com/Hafsaf05",
  linkedin: "https://linkedin.com/in/hafsa-fathima05",
  education: "Jayaprakash Narayana College of Engineering, Hyderabad",
  degree: "B.Tech in AI & Machine Learning",
  graduation: "Expected 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Machine Learning",
    "Natural Language Processing",
    "Deep Learning",
  ],
};
export const skills = [
  { label: "Languages", skills: ["Python", "Java", "JavaScript", "SQL", "C"] },
  {
    label: "AI / Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "OpenCV",
      "MediaPipe",
    ],
  },
  {
    label: "LLM & AI Systems",
    skills: [
      "LangChain",
      "LangGraph",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-Agent Systems",
      "Semantic Retrieval",
    ],
  },
  {
    label: "Data Science",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Feature Engineering",
      "Power BI",
    ],
  },
  {
    label: "Backend & Deployment",
    skills: ["FastAPI", "Node.js", "REST APIs", "Docker", "Kafka", "MLflow"],
  },
  {
    label: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Linux CLI",
      "VS Code",
      "Google Colab",
      "PyCharm",
    ],
  },
];
export const projects: Project[] = [
  {
    id: "reflxai",
    title: "ReflxAI-Advanced",
    subtitle: "Multi-Agent AI Code Generation and Review Platform",
    description:
      "Natural-language requirements become generated, reviewed, tested, secured, and documented code.",
    tags: ["LangGraph", "Groq LLMs", "Python", "Multi-Agent Systems"],
    github: "https://github.com/Hafsaf05/ReflxAI-Advanced",
    architecture:
      "Requirements -> Generation -> Review -> Testing -> Performance -> Security -> Documentation",
    highlights: [
      "Six-agent workflow covering generation, review, testing, performance analysis, security auditing, and documentation.",
      "Structured agent workflows coordinate tasks across the software development lifecycle.",
      "GitHub PR automation with complexity analysis, test coverage assessment, and vulnerability detection.",
    ],
    metric: "6",
    metricLabel: "specialized agents",
  },
  {
    id: "sentinel",
    github: "https://github.com/Hafsaf05/sentinel-ai",
    title: "Sentinel AI",
    subtitle: "Explainable Multi-Stage Fraud Detection System",
    description:
      "Healthcare insurance fraud detection combining supervised learning, anomaly detection, deterministic rules, and agentic review.",
    tags: ["XGBoost", "Isolation Forest", "LangGraph", "Ollama"],
    architecture:
      "Claims -> Preprocessing -> Ensemble scoring -> Validation -> Explanation",
    highlights: [
      "Evaluated across 558K+ claims with provider-disjoint train/test splitting to reduce leakage.",
      "Held-out results: 81.3% precision, 75.4% recall, 78.2% F1, and 91.1% ROC-AUC; approximately 311 ms average latency per claim.",
      "LangGraph coordinates preprocessing, risk scoring, validation, and Ollama-generated explanations.",
    ],
    metric: "91.1%",
    metricLabel: "held-out ROC-AUC",
  },
  {
    id: "askduo",
    title: "AskDuo",
    subtitle: "Retrieval-Augmented AI Knowledge Assistant",
    description:
      "A knowledge assistant that retrieves from internal documentation and generates source-grounded, cited responses.",
    tags: ["LangChain", "ChromaDB", "OpenAI Embeddings", "GPT-4o-mini"],
    github: "https://github.com/Hafsaf05/AskDuo",
    architecture:
      "Documents -> Processing -> Embeddings -> Vector storage -> Retrieval -> Cited response",
    highlights: [
      "Modular RAG pipeline using LangChain, ChromaDB, OpenAI Embeddings, and GPT-4o-mini.",
      "Document processing, persistent vector storage, and semantic retrieval.",
      "Source-grounded responses with citations improve answer traceability.",
    ],
    metric: "RAG",
    metricLabel: "source-grounded answers",
  },
  {
    id: "adaptive",
    github: "https://github.com/Hafsaf05/adaptive-streamer",
    title: "Adaptive Streamer",
    subtitle: "Real-Time AI Anomaly Detection Platform",
    description:
      "Anomaly detection for streaming data, designed to adapt as data distributions change.",
    tags: ["CNN / LSTM / TCN", "FastAPI", "Kafka", "Docker", "MLflow"],
    architecture:
      "Stream -> Models -> Drift detection -> Predictions -> Dashboard",
    highlights: [
      "CNN, LSTM, and TCN-based models identify anomalous patterns in streaming data.",
      "ADWIN and Page-Hinkley methods detect distribution drift.",
      "FastAPI and Streamlit serve and visualize predictions; Kafka, Docker, and MLflow support streaming, deployment, and experiment tracking.",
    ],
    metric: "3",
    metricLabel: "model architectures",
  },
  {
    id: "legalshe",
    title: "LegalShe",
    subtitle: "AI-Powered Multilingual Legal Companion for Women in India",
    description:
      "A free legal-information companion built during the 12-hour DevQueens hackathon at Lords Institute of Engineering & Technology, Hyderabad.",
    tags: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Groq API",
      "llama-3.1-8b-instant",
      "jsPDF",
      "Web Speech API",
    ],
    github: "https://github.com/Hafsaf05/LegalShe",
    demo: "https://legal-she.vercel.app",
    highlights: [
      "Supports Telugu, Hindi, and English with a Legal Analyzer, quick legality checker, and complaint-letter generator designed around BNS 2023 references.",
      "Online Harassment Shield supports screenshot blur and annotation; includes a local helpline directory and a Safe Mode designed for zero data retention.",
      "Hackathon prototype providing legal information, not a substitute for professional legal advice.",
    ],
    metric: "12 h",
    metricLabel: "hackathon build",
    architecture:
      "Question -> Language selection -> Legal information -> Complaint draft",
  },
  {
    id: "civic",
    title: "Civic Issue Reporting System",
    subtitle: "Full-Stack Civic Issue Reporting Platform",
    description:
      "A platform for citizens to submit civic issues and track their reports, built at the CBIT Hackathon 2026.",
    tags: ["Backend API", "Database", "Data Models", "Frontend"],
    github: "https://github.com/Hafsaf05/civic-issue-reporting-system",
    highlights: [
      "Backend API and database models support civic issue submissions and report tracking.",
      "Dedicated frontend provides a citizen-facing interface.",
    ],
    architecture:
      "Citizen report -> Backend API -> Database -> Status tracking",
  },
  {
    id: "gesture-car",
    title: "Gesture-Controlled Car Game",
    subtitle: "Webcam-Controlled Endless Runner",
    description:
      "An early computer-vision learning project from February 2025: control a car entirely through hand gestures, with a keyboard fallback.",
    tags: ["Python", "MediaPipe Tasks API", "Pygame", "Computer Vision"],
    github: "https://github.com/Hafsaf05/GESTURE-CONTROLLED-CAR-GAME",
    highlights: [
      "Real-time hand tracking controls physics-based car movement: palm to brake, fist to throttle, two fingers to reverse, and thumb gestures to steer.",
      "Procedural synthesized sound effects require no external audio files.",
      "Menu, playing, and game-over states support a complete game loop.",
    ],
    architecture:
      "Webcam -> Hand tracking -> Gesture mapping -> Pygame movement",
  },
  {
    id: "car-price",
    title: "Car Price Prediction",
    subtitle: "Regression-Based Car Price Predictor",
    description:
      "Companion project to the published car-price prediction research paper.",
    tags: [
      "Python",
      "Linear Regression",
      "Lasso Regression",
      "Machine Learning",
    ],
    github: "https://github.com/Hafsaf05/Car-price-prediction",
    highlights: [
      "Linear Regression and Lasso Regression estimate car prices from vehicle features.",
      "Uses features such as engine size, horsepower, and mileage.",
    ],
    architecture:
      "Vehicle features -> Preprocessing -> Regression -> Price estimate",
  },
  {
    id: "house-price",
    title: "House Price Prediction",
    subtitle: "Machine Learning for Real Estate Prices",
    description:
      "A regression pipeline for predicting real estate prices, accompanying the research paper “Future Proofing Real Estate: Machine Learning for Price Predictions.”",
    tags: ["Python", "Regression", "Machine Learning"],
    github: "https://github.com/Hafsaf05/House-Price-Prediction",
    highlights: [
      "Applies a machine-learning regression pipeline to real estate price prediction.",
      "Connects an applied prediction project with published research.",
    ],
    architecture: "Property data -> Regression pipeline -> Price estimate",
  },
  {
    id: "wall-climbing",
    title: "Wall-Climbing Bot",
    subtitle: "Vertical Surface Cleaner",
    description:
      "A robotics project exploring a robot that climbs vertical surfaces for automated cleaning.",
    tags: ["Robotics", "Automation"],
    highlights: [
      "Designed for automated cleaning on vertical surfaces.",
      "Project overview; technical specifications and media have not yet been published.",
    ],
  },
];
export const publications = [
  {
    title: "Car Price Prediction Using Machine Learning",
    journal: "Research and Reviews: Advancement in Cyber Security",
    year: "2025",
  },
  {
    title:
      "Future Proofing Real Estate: Machine Learning for Price Predictions",
    journal: "Advancement of Computer Technology and Its Applications",
    year: "2025",
  },
];
export const achievements = [
  "Co-authored and published 2 ML research papers in academic journals.",
  "Solved 100+ LeetCode problems across arrays, strings, linked lists, trees, graphs, recursion, and dynamic programming.",
  "Presented AI/ML projects at Science Fest 2025 and the ESCI Hyderabad Tech Expo.",
  "Built and showcased AI solutions across multiple hackathons.",
];
export const hackathons = [
  "AI Frontier Challenge 2026, IARE — built Sentinel AI and cleared Round 3; August 7–8, 2026.",
  "DeVQueens 2026, April 2 — built LegalShe, an AI-powered multilingual legal assistance platform.",
  "CBIT Hackathon–SUDHEE 2026 (February 14) and SPECATHON 2025 (September 19–20) — developed AI solutions in time-constrained team settings.",
];
export const leadership = [
  "Technical Event Host & Anchor — hosted and moderated college-level technical events.",
  "Hackathon Organizer — helped organize the college’s Smart India Hackathon (SIH) internal round and another campus hackathon.",
];
