import { Animated } from 'react-native';

export class Habit {
  id?: string;
  userId?: string;
  title: string;
  description?: string;
  difficultyLevel?: 'easy' | 'medium' | 'hard';
  currentPrice?: number;
  streakCount: number;
  completionRate?: number;
  completedToday: boolean;
  missedToday?: boolean;
  animatedFill: Animated.Value;
  animatedColor: Animated.Value;
  disabled: boolean;

  constructor({ title, streakCount = 0, completedToday = false }: { title: string, streakCount?: number, completedToday?: boolean }) {
    this.title = title;
    this.streakCount = streakCount;
    this.completedToday = completedToday;
    this.animatedFill = new Animated.Value(completedToday ? 1 : 0);
    this.animatedColor = new Animated.Value(completedToday ? 1 : 0);
    this.disabled = false;
  }

  toggleComplete() {
    this.completedToday = !this.completedToday;
    if (this.completedToday) {
      this.streakCount += 1;
      Animated.timing(this.animatedFill!, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      Animated.timing(this.animatedColor!, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    } else {
      this.streakCount = Math.max(this.streakCount - 1, 0);
      Animated.timing(this.animatedFill!, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      Animated.timing(this.animatedColor!, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  }
} 