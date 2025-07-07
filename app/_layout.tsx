import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Superwall from '@superwall/react-native-superwall';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import 'react-native-reanimated';
import { useSuperwallOnboarding } from '../lib/superwall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider, useUser } from '../contexts/UserContext';

function RootLayoutInner() {
  const [isLoading, onboardingCompleted] = useSuperwallOnboarding();
  const { createUser } = useUser();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log('onboardingCompleted:', onboardingCompleted);
  }, [onboardingCompleted]);

  useEffect(() => {
    if (onboardingCompleted) {
      AsyncStorage.getItem('userId').then(superwallUserId => {
        console.log('Superwall userId from AsyncStorage:', superwallUserId);
        if (!superwallUserId) {
          // DEV ONLY: Mock a userId for local testing
          superwallUserId = '00000000-0000-0000-0000-000000000000'; // Use a valid UUID
          AsyncStorage.setItem('userId', superwallUserId);
          console.warn('DEV: Mocked Superwall userId for testing:', superwallUserId);
        }
        if (superwallUserId) {
          createUser({ id: superwallUserId })
            .then(() => {
              console.log('Supabase user creation succeeded for id:', superwallUserId);
            })
            .catch(e => {
              console.error('Supabase createUser error:', e);
            });
        } else {
          console.warn('No Superwall userId found in AsyncStorage');
        }
      }).catch(e => {
        console.error('Error reading userId from AsyncStorage:', e);
      });
    }
  }, [onboardingCompleted]);

  useEffect(() => {
    const handleBackPress = () => {
      if (!onboardingCompleted) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => subscription.remove();
  }, [onboardingCompleted]);

  if (!loaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!onboardingCompleted) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <UserProvider>
        <RootLayoutInner />
        <StatusBar style="auto" />
      </UserProvider>
    </ThemeProvider>
  );
}
