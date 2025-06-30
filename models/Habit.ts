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

  getNextMilestone(): number {
    const milestones = [7, 14, 30, 50, 100, 200, 365];
    for (let m of milestones) {
      if (this.streakCount < m) return m;
    }
    return milestones[milestones.length - 1];
  }

  getMilestoneProgress(): number {
    const next = this.getNextMilestone();
    return Math.min(this.streakCount / next, 1);
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

  getNextAchievementHabit(): { habit: Habit; next: number } | null {
    // 1. Prioritize showing a habit that just hit a milestone today
    for (let habit of this.habits) {
      const next = habit.getNextMilestone();
      if (
        habit.lastMilestoneAchieved === habit.streakCount &&
        habit.lastMilestoneDate === new Date().toISOString().slice(0, 10)
      ) {
        return { habit, next: habit.streakCount };
      }
    }
    // 2. Otherwise, show the closest to next milestone (not already at a milestone)
    let best: { habit: Habit; next: number } | null = null;
    let minDiff = Infinity;
    for (let habit of this.habits) {
      const next = habit.getNextMilestone();
      const diff = next - habit.streakCount;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        best = { habit, next };
      }
    }
    // 3. If all habits are at a milestone but not today, show the one that just hit it
    if (!best) {
      for (let habit of this.habits) {
        const next = habit.getNextMilestone();
        if (habit.streakCount === next) {
          return { habit, next };
        }
      }
    }
    return best;
  }
} 