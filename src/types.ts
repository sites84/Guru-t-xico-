export interface ToxicAffirmation {
  id: string;
  text: string;
  difficulty: 'Fácil' | 'Humilhante' | 'Espartano';
  insultOnSuccess: string;
}

export interface AbsurdTask {
  id: string;
  title: string;
  instruction: string;
  hustleJustification: string;
  difficulty: 'Desumano' | 'Extremo' | 'Ridículo';
  alphaScore: number;
  completionRoast: string;
  completed?: boolean;
}

export interface BankruptAlpha {
  id: string;
  rank: number;
  name: string;
  alias: string;
  lossAmount: number;
  downfallReason: string;
  status: string;
  badge: string;
  isUser?: boolean;
}

export interface CowardiceData {
  recipientName: string;
  reason: string;
  stampType: 'BETA_COMPROVADO' | 'COVARDE_OFICIAL' | 'MEDIOCRE_ABSOLUTO' | 'PERDEDOR_SERIAL';
  fineAmount: number;
  date: string;
  format: 'story' | 'square';
}

export interface AbsurdSuccessCase {
  id: string;
  author: string;
  role: string;
  avatarText: string;
  headline: string;
  story: string;
  claimedRevenue: string;
  actualOutcome: string;
  alphaLesson: string;
  tags: string[];
  metric: {
    label: string;
    value: string;
  };
}

export interface GuruRank {
  id: string;
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  pointsReward: number;
  category: 'tarefas' | 'guru' | 'pontuacao' | 'mentalidade' | 'patentes' | 'mantra' | 'secretas';
  roastMessage?: string;
}

export interface UserProfile {
  id: string; // Auth UID
  email: string;
  displayName: string;
  photoURL?: string;
  totalPoints: number;
  completedTasksCount: number;
  currentRank: string;
  dailyStreak?: number; // Consecutive days of completed daily tasks
  bestStreak?: number; // Record streak
  lastCompletedDate?: string; // YYYY-MM-DD
  achievements: string[]; // List of unlocked achievement IDs
  completedTaskIds: string[]; // List of completed task IDs
  createdAt: any;
  updatedAt: any;
}
