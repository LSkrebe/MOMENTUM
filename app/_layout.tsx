import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Superwall from '@superwall/react-native-superwall';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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

  useEffect(() => {
    const initializeSuperwall = async () => {
      try {
        await Superwall.configure({
          apiKey: 'pk_abc2f3b7371db02d45dd747a44882abc25b170e44043a90b',
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
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto"/>
    </ThemeProvider>
  );
}
