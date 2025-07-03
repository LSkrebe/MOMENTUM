import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Animated } from 'react-native';
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
  onComment?: () => void;
  commented?: boolean;
}

const UserHabitCard = ({ user, habit, onPress, reason, comment, onComment, commented }: UserHabitCardProps) => {
  const [supported, setSupported] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const commentScaleAnim = useRef(new Animated.Value(1)).current;

  const handleSupportPress = () => {
    if (supported) return;
    setSupported(true);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Called by parent after comment is sent
  React.useEffect(() => {
    if (typeof onComment === 'function' && commented) {
      // Reset commented after a short delay if needed, or keep it true
    }
  }, [commented, onComment]);

  React.useEffect(() => {
    if (commented && !supported) {
      Animated.sequence([
        Animated.timing(commentScaleAnim, {
          toValue: 1.15,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(commentScaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (supported && !commented) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (supported && commented) {
      // Animate both for the merged button
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.15,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [commented, supported]);

  // Helper: should we show merged button?
  const showMerged = supported && commented;

  return (
    <View>
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
        {showMerged ? (
          <Animated.View style={{ flex: 2, width: '100%', transform: [{ scale: scaleAnim }] }}>
            <View style={[styles.actionButton, styles.mergedButton, styles.supportedButton, { width: '100%', alignSelf: 'center' }]}>
              <Text style={[styles.actionButtonText, styles.supportedButtonText]}>Thank you!</Text>
            </View>
          </Animated.View>
        ) : (
          <>
            <Animated.View style={{ flex: 1, transform: [{ scale: commentScaleAnim }] }}>
              <Pressable
                style={[styles.actionButton, styles.commentButton, commented && styles.supportedButton]}
                onPress={() => {
                  if (!commented && onComment) onComment();
                }}
                disabled={commented}
              >
                <Text style={[styles.actionButtonText, commented && !supported && styles.supportedButtonText]}>
                  {commented && !supported ? 'Thank you!' : 'Comment'}
                </Text>
              </Pressable>
            </Animated.View>
            <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
              <Pressable
                style={[styles.actionButton, styles.supportButton, supported && styles.supportedButton]}
                onPress={handleSupportPress}
                disabled={supported}
              >
                <Text style={[styles.actionButtonText, supported && !commented && styles.supportedButtonText]}>
                  {supported && !commented ? 'Thank you!' : 'Support'}
                </Text>
              </Pressable>
            </Animated.View>
          </>
        )}
      </View>
    </View>
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
  supportedButton: {
    backgroundColor: Colors.main.accent,
    borderColor: Colors.main.accent,
  },
  supportedButtonText: {
    color: Colors.main.textPrimary,
  },
  mergedButton: {
    marginLeft: 0,
    marginRight: 0,
  },
});

export default UserHabitCard; 