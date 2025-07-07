import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface User {
  id: string;
  name: string;
  profile_image_url?: string;
  level: number;
  total_habits_completed: number;
  current_streak: number;
  supporters_count: number;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  streak_count: number;
  completed_today: boolean;
  supporters_count: number;
  created_at: string;
  updated_at: string;
}

export interface Support {
  id: string;
  supporter_id: string;
  habit_id: string;
  support_date: string;
  created_at: string;
}

export interface SuccessStory {
  id: string;
  user_id: string;
  habit_id: string;
  message: string;
  created_at: string;
}

export interface DailyStats {
  id: string;
  user_id: string;
  date: string;
  supporters_count: number;
  habits_done: number;
  supporting_count: number;
  created_at: string;
}

// Database helper functions
export const db = {
  // Users
  async getUser(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createUser(userData: Partial<User>): Promise<User> {
    // Ensure name is set to a default if not provided
    const userToInsert = {
      name: userData.name || 'User', // Default name
      ...userData,
    };
    const { data, error } = await supabase
      .from('users')
      .insert([userToInsert])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Habits
  async getHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createHabit(habitData: Partial<Habit>): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .insert([habitData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateHabit(id: string, updates: Partial<Habit>): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteHabit(id: string): Promise<void> {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Supports
  async createSupport(supportData: Partial<Support>): Promise<Support> {
    const { data, error } = await supabase
      .from('supports')
      .insert([supportData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getHabitSupports(habitId: string): Promise<Support[]> {
    const { data, error } = await supabase
      .from('supports')
      .select('*')
      .eq('habit_id', habitId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getUserSupports(userId: string): Promise<Support[]> {
    const { data, error } = await supabase
      .from('supports')
      .select('*')
      .eq('supporter_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Success Stories
  async createSuccessStory(storyData: Partial<SuccessStory>): Promise<SuccessStory> {
    const { data, error } = await supabase
      .from('success_stories')
      .insert([storyData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getSuccessStories(): Promise<SuccessStory[]> {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Daily Stats
  async getDailyStats(userId: string, startDate: string, endDate: string): Promise<DailyStats[]> {
    const { data, error } = await supabase
      .from('daily_stats')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async upsertDailyStats(statsData: Partial<DailyStats>): Promise<DailyStats> {
    const { data, error } = await supabase
      .from('daily_stats')
      .upsert([statsData], { onConflict: 'user_id,date' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Social Feed (complex query)
  async getSocialFeed(): Promise<{ habit: Habit; user: User; supporters_count: number }[]> {
    const { data, error } = await supabase
      .from('habits')
      .select(`
        *,
        user:users(*)
      `)
      .order('supporters_count', { ascending: false })
      .limit(20);
    
    if (error) throw error;
    return data || [];
  },
}; 