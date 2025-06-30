import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
import { User } from '../models/User';

function getImageSource(img: any) {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
}

const LeaderboardCard = ({ users }: { users: User[] }) => (
  <View>
    <Text style={styles.leaderboardTitle}>TOP PERFORMERS</Text>
    <View style={styles.leaderboardCard}>
      <View style={{ gap: 16 }}>
        {users.map((user, index) => (
          <View key={index} style={styles.leaderboardRow}>
            <View style={styles.leaderboardRank}>
              <Text style={styles.rankNumber}>{index + 1}</Text>
            </View>
            <View style={styles.leaderboardUserInfo}>
              <Image source={getImageSource(user.profileImage)} style={styles.leaderboardAvatar} />
              <View style={styles.leaderboardUserDetails}>
                <Text style={styles.leaderboardName}>{user.name}</Text>
                <Text style={styles.leaderboardUserTitle}>{user.bio ?? 'Performer'}</Text>
              </View>
            </View>
            <Text style={styles.leaderboardValue}>{user.stats?.longestStreak ?? 0}D</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  leaderboardTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  leaderboardCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardRank: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  rankNumber: {
    color: Colors.main.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  leaderboardUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  leaderboardAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  leaderboardUserDetails: {
    flex: 1,
  },
  leaderboardName: {
    color: Colors.main.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  leaderboardUserTitle: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  leaderboardValue: {
    color: Colors.main.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LeaderboardCard; 