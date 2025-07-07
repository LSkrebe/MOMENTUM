import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, User } from '../lib/supabase';

interface UserContextType {
  currentUser: User | null;
  loading: boolean;
  createUser: (userData: Partial<User>) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
  initialUserId?: string; // This will come from Superwall after onboarding
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUserId }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (!currentUser?.id) return;
    
    try {
      const user = await db.getUser(currentUser.id);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const createUser = async (userData: Partial<User>) => {
    try {
      const newUser = await db.createUser(userData);
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!currentUser?.id) return;
    
    try {
      const updatedUser = await db.updateUser(currentUser.id, updates);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  // Load user on mount if initialUserId is provided
  useEffect(() => {
    const loadUser = async () => {
      if (initialUserId) {
        try {
          const user = await db.getUser(initialUserId);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error loading user:', error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [initialUserId]);

  const value: UserContextType = {
    currentUser,
    loading,
    createUser,
    updateUser,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 