import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import ProfileUser from '../models/ProfileUser';
import Colors from '../constants/Colors';

interface CompleteProfileCardProps {
  user: ProfileUser;
}

const CompleteProfileCard: React.FC<CompleteProfileCardProps> = ({ user }) => (
  <Pressable style={styles.profileCard}>
    <View style={styles.profileCenter}>
      <View style={styles.avatarContainer}>
        <Image source={user.avatar} style={styles.profileAvatar} />
      </View>
      <Text style={styles.profileName}>{user.name}</Text>
      <Text style={styles.profileTitle}>{user.title}</Text>
      <Text style={styles.profileLevel}>Level {user.level}</Text>
    </View>
    <Text style={styles.profileDescription}>
      Elite habit performer with incredible consistency across multiple categories. 
      Top supporter in the community with {user.supporters} supporters.
    </Text>
    <View style={styles.profileStats}>
      <Text style={styles.profileValue}>{user.habitsCompleted.toLocaleString()}</Text>
      <Text style={styles.profileLabel}>Habits Done</Text>
    </View>
    <View style={styles.profileMetrics}>
      <View style={styles.profileMetric}>
        <Text style={styles.profileMetricValue}>{user.streak}</Text>
        <Text style={styles.profileMetricLabel}>Day Streak</Text>
      </View>
      <View style={styles.profileMetric}>
        <Text style={styles.profileMetricValue}>{user.supporters}</Text>
        <Text style={styles.profileMetricLabel}>Supporters</Text>
      </View>
    </View>
  </Pressable>
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
  profileCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    color: Colors.main.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: Colors.main.textSecondary,
  },
  profileLevel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  profileDescription: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  profileStats: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileValue: {
    color: Colors.main.accent,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileLabel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  profileMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
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
});

export default CompleteProfileCard; 