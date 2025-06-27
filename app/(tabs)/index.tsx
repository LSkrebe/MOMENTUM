import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HabitCard } from '../../components/HabitCard';
import { InvestmentCard } from '../../components/InvestmentCard';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { Investment } from '../../models/Investment';

// Dummy data for UI
const user = new User({
  habitCoins: 2847,
  stats: { habitsCompleted: 1247, longestStreak: 67, investmentAccuracy: 73, habitCoinsEarned: 12456 },
});
const habits = [
  new Habit({ title: 'Morning Run', currentPrice: 45, streakCount: 23 }),
  new Habit({ title: 'Read 30min', currentPrice: 25, streakCount: 12 }),
  new Habit({ title: 'Meditation', currentPrice: 0, streakCount: 0 }),
];
const investments = [
  new Investment({ sharesOwned: 3, purchasePrice: 234 }),
  new Investment({ sharesOwned: 5, purchasePrice: 189 }),
  new Investment({ sharesOwned: 2, purchasePrice: 156 }),
];

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text style={styles.header}>Portfolio Value: {HABITCOIN_SYMBOL}{user.habitCoins}</Text>
      <Text style={styles.section}>Today's Habits</Text>
      {habits.map((habit, i) => (
        <HabitCard key={i} habit={habit} />
      ))}
      <Text style={styles.section}>Top Investments</Text>
      {investments.map((inv, i) => (
        <InvestmentCard key={i} investment={inv} habitTitle={habits[i]?.title || ''} profit={12 * (i - 1)} />
      ))}
      <Text style={styles.section}>Quick Actions</Text>
      <View style={styles.actions}>
        <Text>[Complete Habit] [Buy Investment] [Check Market]</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
