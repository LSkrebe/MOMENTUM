import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileUser from '../models/ProfileUser';
import Colors from '../constants/Colors';

interface StatsCardProps {
  user: ProfileUser;
}

const StatsCard: React.FC<StatsCardProps> = ({ user }) => (
  <View style={styles.statsGrid}>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.habitsCompleted.toLocaleString()}</Text>
      <Text style={styles.statLabel}>Habits Done</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.longestStreak}</Text>
      <Text style={styles.statLabel}>Longest Streak</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.supporters}</Text>
      <Text style={styles.statLabel}>Supporters</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{user.customizations.badges.length}</Text>
      <Text style={styles.statLabel}>Achievements</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.main.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  statValue: {
    color: Colors.main.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default StatsCard; 