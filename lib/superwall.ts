import { useEffect, useState } from 'react';
import Superwall from '@superwall/react-native-superwall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPERWALL_API_KEY } from '../constants/env';

// Superwall configuration
const CAMPAIGN_TRIGGER = 'onboarding';

// Initialize Superwall
export const initializeSuperwall = async () => {
  try {
    await Superwall.configure({ apiKey: SUPERWALL_API_KEY });
    console.log('Superwall initialized successfully');
  } catch (error) {
    console.error('Error initializing Superwall:', error);
  }
};

// Check if user has completed onboarding
export const checkOnboardingStatus = async (): Promise<boolean> => {
  try {
    const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
    return hasCompletedOnboarding === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

// Mark onboarding as completed
export const markOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
  } catch (error) {
    console.error('Error marking onboarding completed:', error);
  }
};

// Show onboarding campaign
export const showOnboarding = async () => {
  // TODO: Implement campaign display using the correct Superwall React Native API.
  // See https://docs.superwall.com/docs/react-native for the latest usage.
  console.warn('Superwall: Showing a campaign is not supported via a static method. Use the Superwall component/hook as per the docs.');
};

// Handle onboarding completion
export const handleOnboardingComplete = async (userData: any) => {
  try {
    // Mark onboarding as completed
    await markOnboardingCompleted();
    // Store user data from Superwall
    if (userData?.id) {
      await AsyncStorage.setItem('userId', userData.id);
    }
    console.log('Onboarding completed successfully with user data:', userData);
    return userData;
  } catch (error) {
    console.error('Error handling onboarding completion:', error);
    throw error;
  }
};

// Get stored user ID
export const getStoredUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('userId');
  } catch (error) {
    console.error('Error getting stored user ID:', error);
    return null;
  }
};

// Clear stored user data (for logout)
export const clearStoredUserData = async () => {
  try {
    await AsyncStorage.multiRemove(['userId', 'hasCompletedOnboarding']);
  } catch (error) {
    console.error('Error clearing stored user data:', error);
  }
};

export const getSuperwallUserData = async () => {
  const userId = await AsyncStorage.getItem('userId');
  // Add more fields as needed from Superwall
  return { id: userId };
};

export function useSuperwallOnboarding() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const initializeSuperwall = async () => {
      try {
        await Superwall.configure({
          apiKey: SUPERWALL_API_KEY,
        });
        if (Superwall.shared && Superwall.shared.register) {
          // @ts-ignore - Superwall types are not properly exported
          await Superwall.shared.register({
            placement: 'onboarding',
            feature: () => {
              setOnboardingCompleted(true);
              setIsLoading(false);
            }
          });
        } else {
          setOnboardingCompleted(true);
          setIsLoading(false);
          console.warn('Superwall.shared.register not available. Onboarding paywall will not show.');
        }
      } catch (error) {
        console.error('Error initializing Superwall:', error);
        setOnboardingCompleted(true);
        setIsLoading(false);
      }
    };
    initializeSuperwall();
  }, []);

  return [isLoading, onboardingCompleted] as const;
} 