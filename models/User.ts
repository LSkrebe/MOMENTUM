export class User {
  id?: string;
  name?: string;
  profileImage?: string;
  bio?: string;
  habitCoins?: number;
  stats?: {
    habitsCompleted: number;
    longestStreak: number;
    supportAccuracy: number;
    habitCoinsEarned: number;
  };
  customizations?: {
    titleColor: string;
    backgroundTheme: string;
    border: string;
    icons: string[];
  };

  constructor(params: Partial<User>) {
    Object.assign(this, params);
  }
} 