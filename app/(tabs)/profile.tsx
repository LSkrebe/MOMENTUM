import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';

// Mock user data with OOP structure
class ProfileUser {
  name: string;
  avatar: any;
  title: string;
  level: number;
  totalValue: number;
  streak: number;
  supporters: number;
  habitsCompleted: number;
  longestStreak: number;
  supportAccuracy: number;
  habitCoinsEarned: number;
  customizations: ProfileCustomizations;

  constructor(data: any) {
    this.name = data.name;
    this.avatar = data.avatar;
    this.title = data.title;
    this.level = data.level;
    this.totalValue = data.totalValue;
    this.streak = data.streak;
    this.supporters = data.supporters;
    this.habitsCompleted = data.habitsCompleted;
    this.longestStreak = data.longestStreak;
    this.supportAccuracy = data.supportAccuracy;
    this.habitCoinsEarned = data.habitCoinsEarned;
    this.customizations = new ProfileCustomizations(data.customizations);
  }
}

class ProfileCustomizations {
  titleColor: string;
  backgroundTheme: string;
  border: string;
  icons: string[];
  badges: string[];
  animations: string[];

  constructor(data: any) {
    this.titleColor = data.titleColor || Colors.main.accent;
    this.backgroundTheme = data.backgroundTheme || 'Default';
    this.border = data.border || 'Standard';
    this.icons = data.icons || [];
    this.badges = data.badges || [];
    this.animations = data.animations || [];
  }
}

// Mock inventory items
class InventoryItem {
  id: string;
  name: string;
  type: string;
  icon: any;
  equipped: boolean;
  rarity: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.icon = data.icon;
    this.equipped = data.equipped || false;
    this.rarity = data.rarity || 'Common';
  }
}

// Initialize user data
const user = new ProfileUser({
  name: 'Alex Thompson',
  avatar: require('../../assets/images/icon.png'),
  title: 'Habit Tracker',
  level: 42,
  totalValue: 15420,
  streak: 156,
  supporters: 892,
  habitsCompleted: 1247,
  longestStreak: 67,
  supportAccuracy: 73,
  habitCoinsEarned: 12456,
  customizations: {
    titleColor: '#ffd700',
    backgroundTheme: 'Galaxy',
    border: 'Animated',
    icons: ['star', 'crown'],
    badges: ['Elite', 'Consistent'],
    animations: ['Sparkle']
  }
});

// Mock inventory data
const inventoryItems = [
  new InventoryItem({ id: '1', name: 'Default Theme', type: 'background', icon: '', equipped: true, rarity: 'Common' }),
  new InventoryItem({ id: '2', name: 'Galaxy Theme', type: 'background', icon: '', equipped: false, rarity: 'Rare' }),
  new InventoryItem({ id: '3', name: 'Default Title', type: 'title', icon: '', equipped: true, rarity: 'Common' }),
  new InventoryItem({ id: '4', name: 'Elite Title', type: 'title', icon: '', equipped: false, rarity: 'Epic' }),
  new InventoryItem({ id: '5', name: 'Default Badge', type: 'badge', icon: '', equipped: true, rarity: 'Common' }),
  new InventoryItem({ id: '6', name: 'VIP Badge', type: 'badge', icon: '', equipped: false, rarity: 'Epic' }),
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [selectedInventoryType, setSelectedInventoryType] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filterTypes = ['all', 'background', 'title', 'badge'];

  const handlePreviousFilter = () => {
    setCarouselIndex(prev => prev > 0 ? prev - 1 : filterTypes.length - 1);
    setSelectedInventoryType(filterTypes[carouselIndex > 0 ? carouselIndex - 1 : filterTypes.length - 1]);
  };

  const handleNextFilter = () => {
    setCarouselIndex(prev => prev < filterTypes.length - 1 ? prev + 1 : 0);
    setSelectedInventoryType(filterTypes[carouselIndex < filterTypes.length - 1 ? carouselIndex + 1 : 0]);
  };

  // Complete Profile Card Component
  const CompleteProfileCard = () => (
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
        <Text style={styles.profileValue}>{HABITCOIN_SYMBOL}{user.totalValue.toLocaleString()}</Text>
        <Text style={styles.profileLabel}>Total Value</Text>
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

  // Stats Card Component
  const StatsCard = () => (
    <View style={styles.statsGrid}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.habitsCompleted.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Habits Completed</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.longestStreak}</Text>
        <Text style={styles.statLabel}>Longest Streak</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{user.supportAccuracy}%</Text>
        <Text style={styles.statLabel}>Support Accuracy</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{HABITCOIN_SYMBOL}{user.habitCoinsEarned.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Total Earned</Text>
      </View>
    </View>
  );

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
            <CompleteProfileCard />
          </GlassCard>

          {/* Stats Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <Text style={styles.statsTitle}>PERFORMANCE STATS</Text>
            <StatsCard />
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
  statsTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.main.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  statValue: {
    color: Colors.main.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
}); 