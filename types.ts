
export interface UserProgress {
  level: number;
  xp: number;
  streak: number;
  completedLessons: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface StudyMilestone {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  estimatedHours: number;
}

export interface StudyPlan {
  goal: string;
  duration: string;
  milestones: StudyMilestone[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
