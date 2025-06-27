export class Habit {
  id?: string;
  userId?: string;
  title?: string;
  description?: string;
  difficultyLevel?: 'easy' | 'medium' | 'hard';
  currentPrice?: number;
  streakCount?: number;
  completionRate?: number;
  completedToday?: boolean;
  missedToday?: boolean;

  constructor(params: Partial<Habit>) {
    Object.assign(this, params);
  }
} 