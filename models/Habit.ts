import { Animated } from 'react-native';

export class Habit {
  id?: string;
  userId?: string;
  title: string;
  streakCount: number;
  completedToday: boolean;
  animatedFill: Animated.Value;
  animatedColor: Animated.Value;
  disabled: boolean;
  lastMilestoneAchieved?: number;
  lastMilestoneDate?: string;

  constructor({ id, userId, title, streakCount = 0, completedToday = false, lastMilestoneAchieved, lastMilestoneDate }: { id?: string, userId?: string, title: string, streakCount?: number, completedToday?: boolean, lastMilestoneAchieved?: number, lastMilestoneDate?: string }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.streakCount = streakCount;
    this.completedToday = completedToday;
    this.animatedFill = new Animated.Value(completedToday ? 1 : 0);
    this.animatedColor = new Animated.Value(completedToday ? 1 : 0);
    this.disabled = false;
    this.lastMilestoneAchieved = lastMilestoneAchieved;
    this.lastMilestoneDate = lastMilestoneDate;
  }

  toggleComplete() {
    this.completedToday = !this.completedToday;
    if (this.completedToday) {
      this.streakCount += 1;
      Animated.timing(this.animatedFill, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      Animated.timing(this.animatedColor, { toValue: 1, duration: 200, useNativeDriver: false }).start();
      // Check for milestone
      const milestones = [7, 14, 30, 50, 100, 200, 365];
      if (milestones.includes(this.streakCount)) {
        this.lastMilestoneAchieved = this.streakCount;
        this.lastMilestoneDate = new Date().toISOString().slice(0, 10);
      }
    } else {
      this.streakCount = Math.max(this.streakCount - 1, 0);
      Animated.timing(this.animatedFill, { toValue: 0, duration: 200, useNativeDriver: false }).start();
      Animated.timing(this.animatedColor, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  }
}

export class HabitManager {
  habits: Habit[];

  constructor(habits: Habit[]) {
    this.habits = habits;
  }

  getHabits() {
    return this.habits;
  }

  toggleHabit(index: number) {
    this.habits[index].toggleComplete();
  }

  addHabit(title: string = ''): number {
    const newHabit = new Habit({ title, streakCount: 0, completedToday: false });
    this.habits.push(newHabit);
    return this.habits.length - 1;
  }
} 