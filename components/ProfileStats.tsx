import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../models/User';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface ProfileStatsProps {
  user: User;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => (
  <View style={styles.container}>
    <Text style={styles.stat}>Habits Completed: {user.stats?.habitsCompleted}</Text>
    <Text style={styles.stat}>Longest Streak: {user.stats?.longestStreak} days</Text>
    <Text style={styles.stat}>Investment Accuracy: {user.stats?.investmentAccuracy}%</Text>
    <Text style={styles.stat}>HabitCoins Earned: {HABITCOIN_SYMBOL}{user.stats?.habitCoinsEarned}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  stat: {
    fontSize: 16,
    color: Colors.light.text,
    marginVertical: 2,
  },
}); 