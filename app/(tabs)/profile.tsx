import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileStats } from '../../components/ProfileStats';
import { CustomizationShop } from '../../components/CustomizationShop';
import { User } from '../../models/User';

// Dummy user data
const user = new User({
  name: 'Alex',
  profileImage: '',
  stats: { habitsCompleted: 1247, longestStreak: 67, supportAccuracy: 73, habitCoinsEarned: 12456 },
  customizations: { titleColor: '#ffd700', backgroundTheme: 'Galaxy', border: 'Animated', icons: [] },
});

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.profileImage || undefined }} style={styles.avatar} />
        <Text style={[styles.title, { color: user.customizations?.titleColor }]}>Elite Supporter</Text>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.theme}>Theme: {user.customizations?.backgroundTheme}</Text>
    </View>
      <ProfileStats user={user} />
      <CustomizationShop />
      <Text style={styles.section}>Settings</Text>
      <Text>Notification preferences</Text>
      <Text>Privacy settings</Text>
      <Text>Account management</Text>
      <Text>Help & support</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  profileHeader: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#eee', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
  theme: { fontSize: 14, color: '#888', marginBottom: 8 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
}); 