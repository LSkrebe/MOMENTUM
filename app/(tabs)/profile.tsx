import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import ProfileUser from '../../models/ProfileUser';
import CompleteProfileCard from '../../components/CompleteProfileCard';
import StatsCard from '../../components/StatsCard';

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

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: Colors.main.accent }]}>
          <View style={styles.headerRow}>
            <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>PROFILE</Text>
            </View>
            <View style={{ width: 32, height: 32 }} />
          </View>
        </View>

        {/* Profile Content */}
        <View style={{ paddingHorizontal: 12, marginTop: 18 }}>
          {/* Complete Profile Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <CompleteProfileCard user={user} />
          </GlassCard>

          {/* Stats Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <Text style={styles.statsTitle}>PERFORMANCE STATS</Text>
            <StatsCard user={user} />
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
    marginBottom: 8,
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