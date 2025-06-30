import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Habit } from '../models/Habit';
import { User } from '../models/User';

function getImageSource(img: any) {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
}

interface UserHabitCardProps {
  user: User;
  habit: Habit;
  onPress: (habit: Habit) => void;
  reason?: string;
}

const UserHabitCard = ({ user, habit, onPress, reason }: UserHabitCardProps) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress(habit)}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {reason ? (
            <View style={styles.avatarContainer}>
              <Image source={getImageSource(user?.profileImage)} style={styles.avatar} />
            </View>
          ) : (
            <Image source={getImageSource(user?.profileImage)} style={[styles.avatar, styles.avatarSupport]} />
          )}
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            {!!reason && (
              <Text style={styles.reason}>{reason}</Text>
            )}
          </View>
        </View>
        {typeof habit.streakCount === 'number' && habit.streakCount > 0 && (
          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>{habit.streakCount}D</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarSupport: {
    marginRight: 10,
  },
  userName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  habitTitle: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  reason: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'italic',
  },
  streakContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 56,
    marginLeft: 12,
  },
  streakText: {
    color: Colors.main.accent,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default UserHabitCard; 