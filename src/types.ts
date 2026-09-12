export type PageId =
  | 'home'
  | 'guided-check-in'
  | 'check-in-concluded'
  | 'my-check-ins'
  | 'counselor-cases'
  | 'case-detail'
  | 'counselor-alerts'
  | 'admin-portal'
  | 'ethics-and-privacy'
  | 'settings'
  | 'login'
  | 'register'
  | 'forgot-password';

export type UserRole = 'guest' | 'survivor' | 'counselor' | 'admin';

export type MoodType = 'Great' | 'Okay' | 'Neutral' | 'Worried' | 'Struggling';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

export interface CaseRecord {
  id: string;
  distressScore: number;
  trend: 'rising' | 'stable' | 'improving';
  trendDelta?: string;
  lastCheckIn: string;
  lastCheckInRelative: string;
  district: string;
  status: 'Active' | 'Under Review' | 'Resolved';
  clientHash: string;
  category: string;
  mood: string;
  flagged?: boolean;
}

export interface AlertItem {
  id: string;
  caseId: string;
  severity: 'critical' | 'high' | 'resolved';
  delta?: string;
  time: string;
  relativeTime: string;
  description: string;
  district: string;
  score: number;
  threshold?: number;
  tag: string;
  clientHash: string;
  acknowledged?: boolean;
}

export interface CheckInReflection {
  id: string;
  date: string;
  time: string;
  mood: MoodType;
  emoji: string;
  summary: string;
  detailedNote: string;
  isPrivate: boolean;
}
