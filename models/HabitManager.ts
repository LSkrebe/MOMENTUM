import { Habit } from './Habit';

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