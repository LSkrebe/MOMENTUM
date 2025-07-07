import Superwall from '@superwall/react-native-superwall';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Superwall configuration
const SUPERWALL_API_KEY = 'pk_abc2f3b7371db02d45dd747a44882abc25b170e44043a90b';
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