import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../models/User';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface ProfileStatsProps {
  user: User;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => (
  <View style={styles.card}>
    <Text style={styles.header}>Stats</Text>
    <View style={styles.row}>
      <View style={styles.statBlock}>
        <Text style={styles.statNumber}>{user.stats?.habitsCompleted}</Text>
        <Text style={styles.statLabel}>Habits</Text>
      </View>
      <View style={styles.statBlock}>
        <Text style={styles.statNumber}>{user.stats?.longestStreak}d</Text>
        <Text style={styles.statLabel}>Streak</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, { width: `${Math.min((user.stats?.longestStreak || 0) / 100, 1) * 100}%` }]} />
        </View>
      </View>
      <View style={styles.statBlock}>
        <Text style={styles.statNumber}>{user.stats?.supportAccuracy}%</Text>
        <Text style={styles.statLabel}>Accuracy</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBar, { width: `${Math.min((user.stats?.supportAccuracy || 0) / 100, 1) * 100}%`, backgroundColor: Colors.main.accent }]} />
        </View>
      </View>
      <View style={styles.statBlock}>
        <Text style={styles.statNumber}>{HABITCOIN_SYMBOL}{user.stats?.habitCoinsEarned}</Text>
        <Text style={styles.statLabel}>Earned</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.main.textPrimary,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.main.accent,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.main.textPrimary,
    marginTop: 2,
    marginBottom: 2,
  },
  progressBarBg: {
    width: 40,
    height: 5,
    backgroundColor: Colors.main.border,
    borderRadius: 3,
    marginTop: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: 5,
    backgroundColor: Colors.main.accent,
    borderRadius: 3,
  },
}); 