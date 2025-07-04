import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
import ProfileUser from '../models/ProfileUser';

interface ShareableProfileCardProps {
  user: ProfileUser;
}

const ShareableProfileCard: React.FC<ShareableProfileCardProps> = ({ user }) => {

  return (
    <View style={styles.container}>
      {/* Background with gradient effect */}
      <View style={styles.background} />
      
      {/* Header with app branding */}
      <View style={styles.header}>
        <Image source={require('../assets/images/icon.png')} style={styles.appIcon} />
        <Text style={styles.appName}>MOMENTUM</Text>
      </View>

      {/* Profile section */}
      <View style={styles.profileSection}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.title}>{user.title}</Text>
        <Text style={styles.level}>Level {user.level}</Text>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.habitsCompleted}</Text>
          <Text style={styles.statLabel}>Habits Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.supporters}</Text>
          <Text style={styles.statLabel}>Supporters</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.longestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
      </View>

      {/* Badges section */}
      {user.customizations.badges.length > 0 && (
        <View style={styles.badgesSection}>
          <Text style={styles.badgesTitle}>Achievements</Text>
          <View style={styles.badgesContainer}>
            {user.customizations.badges.map((badge, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Join me on MOMENTUM!</Text>
        <Text style={styles.footerSubtext}>Build better habits together</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 600,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.main.accent,
    opacity: 0.1,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.main.accent,
    letterSpacing: 2,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: Colors.main.accent,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.main.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: Colors.main.textSecondary,
    marginBottom: 8,
  },
  level: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.main.accent,
    backgroundColor: Colors.main.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: Colors.main.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.main.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.main.textSecondary,
    textAlign: 'center',
  },
  badgesSection: {
    width: '100%',
    marginBottom: 30,
  },
  badgesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.main.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: Colors.main.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.main.background,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.main.accent,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: Colors.main.textSecondary,
  },
});

export default ShareableProfileCard; 