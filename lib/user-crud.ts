import { db, User as DBUser, supabase } from './supabase';
import { createHabitForUser } from './habits-crud';

export async function getOrCreateUser(): Promise<DBUser> {
  // 1. Ensure we are signed in anonymously
  let { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    session = data.session;
  }
  // 2. Get the current user id from auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No Supabase Auth user found');
  const userId = user.id;

  // 3. Check if user row exists in our users table
  let dbUser: DBUser | null = null;
  try {
    dbUser = await db.getUser(userId);
  } catch (err: any) {
    // If error is 'no rows', fall through to create
    if (err.code !== 'PGRST116') throw err;
  }
  if (dbUser) return dbUser;

  // 4. Create new user row with the same id as auth user
  const newUser = await db.createUser({ id: userId });

  // 5. Create three default habits for new users
  const defaultHabits = ['Morning Run', 'Book Read', 'Meditation'];
  await Promise.all(defaultHabits.map(title => createHabitForUser(newUser.id, title)));

  return newUser;
} 