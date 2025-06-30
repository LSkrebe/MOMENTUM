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

const FeaturedProfileCard = ({ user }: { user: User }) => {
  const totalValue = user.stats?.habitCoinsEarned ?? 15420;
  const streak = user.stats?.longestStreak ?? 156;
  const supporters = 892; // Hardcoded as in mock
  return (
    <Pressable style={styles.featuredCard}>
      <View style={styles.featuredCenter}>
        <View style={styles.featuredAvatarContainer}>
          <Image source={getImageSource(user.profileImage)} style={styles.featuredAvatar} />
        </View>
        <Text style={styles.featuredName}>{user.name}</Text>
        <Text style={styles.featuredTitle}>{user.bio ?? 'Elite Performer'}</Text>
      </View>
      <Text style={styles.featuredDescription}>{user.bio}</Text>
      <View style={styles.featuredStats}>
        <Text style={styles.featuredValue}>{HABITCOIN_SYMBOL}{totalValue.toLocaleString()}</Text>
        <Text style={styles.featuredLabel}>Total Value</Text>
      </View>
      <View style={styles.featuredMetrics}>
        <View style={styles.featuredMetric}>
          <Text style={styles.featuredMetricValue}>{streak}</Text>
          <Text style={styles.featuredMetricLabel}>Day Streak</Text>
        </View>
        <View style={styles.featuredMetric}>
          <Text style={styles.featuredMetricValue}>{supporters}</Text>
          <Text style={styles.featuredMetricLabel}>Supporters</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  featuredCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
    alignItems: 'center',
  },
  featuredCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredAvatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  featuredName: {
    color: Colors.main.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredTitle: {
    color: Colors.main.textSecondary,
    fontSize: 16,
  },
  featuredDescription: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredStats: {
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredValue: {
    color: Colors.main.accent,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredLabel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  featuredMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featuredMetric: {
    alignItems: 'center',
    flex: 1,
  },
  featuredMetricValue: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredMetricLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
});

export default FeaturedProfileCard; 