import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
  return <Feather size={26} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.main.accent,
        tabBarInactiveTintColor: Colors.main.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.main.surface,
          borderTopColor: Colors.main.border,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => <TabBarIcon name="hexagon" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="triangle" color={color} />,
        }}
      />
    </Tabs>
  );
}
