import { db, User as DBUser } from './supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createHabitForUser } from './habits-crud';

export async function getOrCreateUser(userId?: string): Promise<DBUser> {
  if (userId) {
    try {
      const user = await db.getUser(userId);
      if (user) return user;
    } catch (err: any) {
      // If error is 'no rows', fall through to create
      if (err.code !== 'PGRST116') throw err;
    }
  }
  // Create new user
  const newUser = await db.createUser({});
  await storeUserId(newUser.id);

  // Create three default habits for new users
  const defaultHabits = ['Morning Run', 'Book Read', 'Meditation'];
  await Promise.all(defaultHabits.map(title => createHabitForUser(newUser.id, title)));

  return newUser;
}

export async function storeUserId(userId: string) {
  await AsyncStorage.setItem('userId', userId);
} 