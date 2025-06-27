import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SocialScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text style={styles.header}>Activity Feed</Text>
      <Text>Sarah hit 30-day gym streak! +Ⱨ45 for investors 🚀</Text>
      <Text>Mike broke his coding streak. RIP my investment 💸</Text>
      <Text>New challenge: 30-day morning routine starts Monday!</Text>
      <Text style={styles.header}>Leaderboards</Text>
      <Text>Top Habit Performers</Text>
      <Text>Best Investors This Month</Text>
      <Text>Longest Streaks</Text>
      <Text>Most Consistent Users</Text>
      <Text style={styles.header}>Community</Text>
      <Text>Success stories</Text>
      <Text>Investment tips</Text>
      <Text>Habit advice</Text>
      <Text>Challenge discussions</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
}); 