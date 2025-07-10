import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Superwall from '@superwall/react-native-superwall';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import 'react-native-reanimated';
import { useSuperwallOnboarding } from '../lib/superwall';
import { UserProvider, useUser } from '../contexts/UserContext';
import { getStoredUserId, markOnboardingCompleted } from '../lib/superwall';
import { getOrCreateUser } from '../lib/user-crud';

function RootLayoutInner({ initialUserId }: { initialUserId?: string }) {
  const [isLoading, onboardingCompleted] = useSuperwallOnboarding();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log('onboardingCompleted:', onboardingCompleted);
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
    <UserProvider initialUserId={initialUserId}>
      <UserGate />
      <StatusBar style="auto" />
    </UserProvider>
  );
}

function UserGate() {
  const { loading } = useUser();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
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
  const [initialUserId, setInitialUserId] = useState<string | undefined>(undefined);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      let userId: string | undefined = undefined;
      try {
        const user = await getOrCreateUser();
        userId = user.id;
      } catch (err) {
        console.error('Error getting or creating user:', err);
      }
      if (isMounted) {
        setInitialUserId(userId);
        setCheckingUser(false);
      }
    };
    checkUser();
    return () => { isMounted = false; };
  }, []);

  if (checkingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <RootLayoutInner initialUserId={initialUserId} />
    </ThemeProvider>
  );
}
