import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text style={styles.header}>Trending Habits</Text>
      <Text>Morning Workouts: +15% this week</Text>
      <Text>Programming: +8% (Hot sector!)</Text>
      <Text>Meditation: -2% (Buy the dip?)</Text>
      <Text style={styles.header}>Friends' Habits</Text>
      <Text>John's Guitar: Ⱨ67 (-5%) [BUY] [WATCH]</Text>
      <Text>Emma's Yoga: Ⱨ89 (+3%) [BUY] [WATCH]</Text>
      <Text>Tom's Writing: Ⱨ45 (+12%) [BUY] [WATCH]</Text>
      <Text style={styles.header}>Discover Users</Text>
      <Text>Top performers this month</Text>
      <Text>New users to invest in</Text>
      <Text>Recommended based on your interests</Text>
      <Text style={styles.header}>Investment Opportunities</Text>
      <Text>Undervalued habits ready to moon</Text>
      <Text>Consistent performers (safe bets)</Text>
      <Text>High-risk, high-reward streaks</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
});
