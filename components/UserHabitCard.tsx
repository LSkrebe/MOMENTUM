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
  comment?: string;
}

const UserHabitCard = ({ user, habit, onPress, reason, comment }: UserHabitCardProps) => {
  return (
    <Pressable onPress={() => onPress(habit)}>
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
      {/* Line break above achievement */}
      <View style={styles.lineBreak} />
      {/* Optional comment below line break */}
      {comment && (
        <Text style={styles.commentText}>{comment}</Text>
      )}
      {/* Achievement Display with Progress Bar */}
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementText}>
          Next Achievement: {habit.getNextMilestone()} Day Streak
        </Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${Math.min(habit.streakCount / habit.getNextMilestone(), 1) * 100}%` }]} />
        </View>
        <Text style={styles.progressBarLabel}>
          {habit.streakCount}D → {habit.getNextMilestone()}D ({habit.getNextMilestone() - habit.streakCount} days left)
        </Text>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <Pressable style={[styles.actionButton, styles.commentButton]} onPress={() => {/* TODO: Comment action */}}>
          <Text style={styles.actionButtonText}>Comment</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.supportButton]} onPress={() => {/* TODO: Support action */}}>
          <Text style={styles.actionButtonText}>Support</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  achievementContainer: {
    marginTop: 6,
    marginBottom: 4,
    alignItems: 'center',
  },
  achievementText: {
    color: Colors.main.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.main.card,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  supportButton: {
    marginRight: 6,
  },
  commentButton: {
    marginLeft: 6,
  },
  actionButtonText: {
    color: Colors.main.accent,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  lineBreak: {
    borderTopWidth: 1,
    borderTopColor: Colors.main.border,
    marginTop: 6,
    marginBottom: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.main.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 4,
    width: '100%',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: Colors.main.accent,
    borderRadius: 4,
  },
  progressBarLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  commentText: {
    color: Colors.main.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 12,
    marginTop: 2,
    textAlign: 'left',
  },
});

export default UserHabitCard; 