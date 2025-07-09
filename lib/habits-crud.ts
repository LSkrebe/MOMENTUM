import { db, Habit as DBHabit } from './supabase';

// Utility: map DB habit to app Habit model (if needed)
export function mapDBHabitToAppHabit(dbHabit: DBHabit) {
  return {
    id: dbHabit.id,
    userId: dbHabit.user_id,
    title: dbHabit.title,
    streakCount: dbHabit.streak_count,
    completedToday: dbHabit.completed_today,
    supportersCount: dbHabit.supporters_count,
    createdAt: dbHabit.created_at,
    updatedAt: dbHabit.updated_at,
  };
}

// CRUD functions for habits
export async function getHabitsForUser(userId: string) {
  const habits = await db.getHabits(userId);
  return habits.map(mapDBHabitToAppHabit);
}

export async function createHabitForUser(userId: string, title: string) {
  const dbHabit = await db.createHabit({ user_id: userId, title });
  return mapDBHabitToAppHabit(dbHabit);
}

export async function updateHabit(habitId: string, updates: Partial<DBHabit>) {
  const dbHabit = await db.updateHabit(habitId, updates);
  return mapDBHabitToAppHabit(dbHabit);
}

export async function deleteHabit(habitId: string) {
  await db.deleteHabit(habitId);
} 