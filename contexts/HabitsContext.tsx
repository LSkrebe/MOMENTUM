import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, Habit } from '../lib/supabase';
import { useUser } from './UserContext';

interface HabitsContextType {
  habits: Habit[];
  loading: boolean;
  createHabit: (title: string) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  refreshHabits: () => Promise<void>;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};

interface HabitsProviderProps {
  children: ReactNode;
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const { currentUser } = useUser();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshHabits = async () => {
    if (!currentUser?.id) return;
    
    setLoading(true);
    try {
      const userHabits = await db.getHabits(currentUser.id);
      setHabits(userHabits);
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (title: string) => {
    if (!currentUser?.id) return;
    
    try {
      const newHabit = await db.createHabit({
        user_id: currentUser.id,
        title,
        streak_count: 0,
        completed_today: false,
        supporters_count: 0,
      });
      setHabits(prev => [newHabit, ...prev]);
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    try {
      const updatedHabit = await db.updateHabit(id, updates);
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      await db.deleteHabit(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  };

  const toggleHabit = async (id: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newCompletedToday = !habit.completed_today;
    const newStreakCount = newCompletedToday 
      ? habit.streak_count + 1 
      : Math.max(habit.streak_count - 1, 0);

    try {
      await updateHabit(id, {
        completed_today: newCompletedToday,
        streak_count: newStreakCount,
      });
    } catch (error) {
      console.error('Error toggling habit:', error);
      throw error;
    }
  };

  // Load habits when user changes
  useEffect(() => {
    if (currentUser?.id) {
      refreshHabits();
    } else {
      setHabits([]);
    }
  }, [currentUser?.id]);

  const value: HabitsContextType = {
    habits,
    loading,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    refreshHabits,
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
}; 