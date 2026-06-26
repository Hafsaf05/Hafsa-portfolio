import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 'reflxai',
    title: 'ReflxAI-Advanced',
    description:
      'Multi-agent AI engineering platform that generates, reviews, tests, secures, and improves code through autonomous agent collaboration.',
    tags: ['Python', 'LangGraph', 'LangChain', 'Groq', 'Multi-Agent AI'],
    github: 'https://github.com/Hafsaf05/ReflxAI-Advanced',
    architecture:
      'Requirements -> Planner Agent -> Developer Agent -> Reviewer Agent -> Security Agent -> Final Output'
  },

  {
    id: 'ai-log-analyzer',
    title: 'AI Log Analyzer',
    description:
      'LLM-powered debugging assistant that analyzes logs, identifies root causes, and generates structured troubleshooting reports.',
    tags: ['Python', 'Llama 3', 'Groq', 'LLM', 'Automation'],
    github: 'https://github.com/Hafsaf05/AI-Log-Analyzer',
    architecture:
      'Application Logs -> Parser -> LLM Analysis -> Root Cause Detection -> Debug Report'
  },

  {
    id: 'askduo',
    title: 'AskDuo',
    description:
      'RAG-powered AI assistant that answers questions from uploaded documents using semantic search and source-grounded responses.',
    tags: ['LangChain', 'ChromaDB', 'FastAPI', 'RAG', 'React'],
    github: 'https://github.com/Hafsaf05/AskDuo',
    architecture:
      'Document Upload -> Embeddings -> ChromaDB -> Retrieval -> LLM Response Generation'
  },

  {
    id: 'gesture-car',
    title: 'Gesture Controlled Car',
    description:
      'Computer vision system that controls a robotic vehicle using real-time hand gesture recognition.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    github: 'https://github.com/Hafsaf05/GESTURE-CONTROLLED-CAR-GAME',
    architecture:
      'Camera Feed -> Hand Tracking -> Gesture Recognition -> Vehicle Commands'
  },

  {
    id: 'house-price',
    title: 'House Price Prediction',
    description:
      'Machine learning model that predicts California housing prices using feature engineering and XGBoost regression.',
    tags: ['Python', 'XGBoost', 'Scikit-Learn', 'Pandas'],
    github: 'https://github.com/Hafsaf05/House-Price-Prediction',
    architecture:
      'Dataset -> Data Cleaning -> Feature Engineering -> XGBoost -> Prediction'
  },

  {
    id: 'car-price',
    title: 'Car Price Prediction',
    description:
      'Regression-based machine learning model for predicting used car prices from market and vehicle features.',
    tags: ['Python', 'Scikit-Learn', 'Regression', 'EDA'],
    github: 'https://github.com/Hafsaf05/Car-price-prediction',
    architecture:
      'Dataset -> Data Preprocessing -> Feature Selection -> Regression Model -> Prediction'
  },

  {
    id: 'pomodoro',
    title: 'Pomodoro Timer',
    description:
      'Minimalist productivity timer with custom UI, animated controls, and configurable work-break cycles.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Hafsaf05/POMODORO-TIMER',
    architecture:
      'Frontend UI -> Timer Engine -> Session Management -> Notifications'
  },
 {
  id: 'legalshe',
  title: 'LegalShe',
  description:
    'AI-powered multilingual legal assistance platform designed to simplify access to legal information and guidance for users.',
  tags: ['JavaScript', 'AI', 'NLP', 'Hackathon'],
  github: 'https://github.com/Hafsaf05/LegalShe',
  architecture:
    'Frontend Interface -> AI Processing Layer -> Legal Knowledge Base -> Response Generation'
},

{
  id: 'civic-reporting',
  title: 'Civic Issue Reporting System',
  description:
    'Community-driven platform for reporting and tracking civic issues such as road damage, sanitation concerns, and public infrastructure problems.',
  tags: ['JavaScript', 'Web Development', 'Civic Tech'],
  github: 'https://github.com/Hafsaf05/civic-issue-reporting-system',
  architecture:
    'Citizen Submission -> Issue Database -> Status Tracking -> Administrative Dashboard'
}

];
