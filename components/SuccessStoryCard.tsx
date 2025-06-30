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

type SuccessStory = {
  user: User;
  habit: string;
  streak: number;
  totalEarned: number;
  story: string;
  supporters: number;
  currentValue: number;
};

const SuccessStoryCard = ({ story }: { story: SuccessStory }) => {
  const user = story.user;
  return (
    <Pressable style={styles.successCard}>
      <View style={styles.successHeader}>
        <View style={styles.successAvatarContainer}>
          <Image source={getImageSource(user.profileImage)} style={styles.successAvatar} />
        </View>
        <View style={styles.successInfo}>
          <Text style={styles.successName}>{user.name}</Text>
          <Text style={styles.successHabit}>{story.habit}</Text>
        </View>
      </View>
      <Text style={styles.successStory}>{story.story}</Text>
      <View style={styles.successStats}>
        <View style={styles.successStat}>
          <Text style={styles.successStatValue}>{story.supporters}</Text>
          <Text style={styles.successStatLabel}>Supporters</Text>
        </View>
        <View style={styles.successStat}>
          <Text style={styles.successStatValue}>{story.streak}</Text>
          <Text style={styles.successStatLabel}>Day Streak</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  successCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  successAvatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  successAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  successInfo: {
    flex: 1,
  },
  successName: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  successHabit: {
    color: Colors.main.textSecondary,
    fontSize: 16,
  },
  successStory: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  successStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.main.border,
  },
  successStat: {
    alignItems: 'center',
    flex: 1,
  },
  successStatValue: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  successStatLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
});

export default SuccessStoryCard; 