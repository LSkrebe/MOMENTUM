import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
import { User } from '../models/User';

function getImageSource(img: any) {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
}

interface FeaturedProfileCardProps {
  user: User;
}

const FeaturedProfileCard = ({ user }: FeaturedProfileCardProps) => (
  <View>
    <Pressable style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image source={getImageSource(user.profileImage)} style={styles.profileAvatar} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileTitle}>Level {(user as any).level ?? 42}</Text>
        </View>
      </View>
      <View style={styles.lineBreak} />
      <View style={styles.profileMetrics}>
        <View style={styles.profileMetric}>
          <Text style={styles.profileMetricValue}>{(user.stats?.habitsCompleted ?? 15420).toLocaleString()}</Text>
          <Text style={styles.profileMetricLabel}>Habits Done</Text>
        </View>
        <View style={styles.profileMetric}>
          <Text style={styles.profileMetricValue}>{user.stats?.longestStreak ?? 67}</Text>
          <Text style={styles.profileMetricLabel}>Day Streak</Text>
        </View>
      </View>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: Colors.main.textSecondary,
  },
  profileMetrics: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileMetric: {
    alignItems: 'center',
    flex: 1,
  },
  profileMetricValue: {
    color: Colors.main.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileMetricLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  lineBreak: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.main.border,
    marginVertical: 6,
  },
});

export default FeaturedProfileCard; 