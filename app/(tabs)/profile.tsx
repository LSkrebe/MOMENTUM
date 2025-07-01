import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import ProfileUser from '../../models/ProfileUser';
import CompleteProfileCard from '../../components/CompleteProfileCard';
import ShareCard from '../../components/ShareCard';
import LeaderboardManager from '../../models/LeaderboardManager';
import LeaderboardCard from '../../components/LeaderboardCard';
import { User } from '../../models/User';

// Initialize user data
const user = new ProfileUser({
  name: 'Alex Thompson',
  avatar: require('../../assets/images/icon.png'),
  title: 'Habit Tracker',
  level: 42,
  streak: 156,
  supporters: 892,
  habitsCompleted: 1247,
  longestStreak: 67,
  customizations: {
    badges: ['Elite', 'Consistent'],
  }
});

// Helper to map ProfileUser to User
function mapProfileUserToUser(profileUser: ProfileUser): User {
  return new User({
    id: profileUser.name, // or another unique identifier
    name: profileUser.name,
    profileImage: profileUser.avatar,
    bio: profileUser.title,
    stats: {
      habitsCompleted: profileUser.habitsCompleted,
      longestStreak: profileUser.longestStreak,
    },
  });
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const leaderboardManager = new LeaderboardManager();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Sticky Header */}
      <View style={[styles.header, { backgroundColor: Colors.main.accent, position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }]}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>PROFILE</Text>
          </View>
          <View style={{ width: 32, height: 32 }} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70 + insets.top, paddingBottom: insets.bottom }}
      >
        {/* Profile Content */}
        <View style={{ paddingHorizontal: 12, marginTop: 0 }}>
          {/* Complete Profile Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <CompleteProfileCard user={user} />
          </GlassCard>

          {/* Stats Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <ShareCard />
          </GlassCard>

          {/* Top Performers List */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <LeaderboardCard users={leaderboardManager.getLeaderboardUsers()} currentUser={mapProfileUserToUser(user)} />
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
  },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 8,
    marginBottom: 0,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  statsTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
}); 