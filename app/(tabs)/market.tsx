import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';

// Mock shop data
const investmentTools = [
  { id: 1, name: 'Portfolio Analytics', price: 800, description: 'Advanced insights into your support investments', category: 'analytics' },
  { id: 2, name: 'Risk Assessment', price: 500, description: 'AI-powered risk analysis for support opportunities', category: 'analytics' },
  { id: 3, name: 'Auto-Invest', price: 1200, description: 'Automatically invest in high-performing habits', category: 'automation' },
  { id: 4, name: 'Diversification Guide', price: 300, description: 'Learn optimal support portfolio strategies', category: 'education' },
];

const socialEnhancements = [
  { id: 5, name: 'Featured Performer', price: 2500, description: 'Get featured on the trending tab for 7 days', category: 'status' },
  { id: 6, name: 'Success Story Slot', price: 1800, description: 'Share your journey in the success stories section', category: 'status' },
  { id: 7, name: 'Custom Title', price: 1000, description: 'Create your own unique performer title', category: 'customization' },
  { id: 8, name: 'Profile Highlight', price: 750, description: 'Stand out with a glowing profile border', category: 'customization' },
];

const supportBoosters = [
  { id: 9, name: 'Support Multiplier', price: 600, description: '2x support earnings for 24 hours', category: 'boosts' },
  { id: 10, name: 'Streak Protection', price: 400, description: 'Protect your supported habits from breaking', category: 'insurance' },
  { id: 11, name: 'Early Access', price: 900, description: 'Get first access to new support opportunities', category: 'access' },
  { id: 12, name: 'Support Insurance', price: 350, description: 'Recover losses from failed support investments', category: 'insurance' },
];

const communityFeatures = [
  { id: 13, name: 'Community Challenge', price: 1500, description: 'Create a 30-day challenge for the community', category: 'challenges' },
  { id: 14, name: 'Mentorship Badge', price: 800, description: 'Become a verified mentor for new users', category: 'badges' },
  { id: 15, name: 'Leaderboard Boost', price: 1200, description: 'Temporary boost to climb leaderboards faster', category: 'boosts' },
  { id: 16, name: 'Exclusive Events', price: 2000, description: 'Access to premium community events', category: 'access' },
];

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const userCoins = 1085.25; // Mock user balance

  const handlePurchase = (item: any) => {
    // TODO: Implement purchase logic
    console.log('Purchasing:', item.name);
  };

  const ShopItem = ({ item }: { item: any }) => {
    const canAfford = userCoins >= item.price;
    
    return (
      <Pressable 
        style={[styles.shopItem, !canAfford && styles.disabledItem]} 
        onPress={() => canAfford && handlePurchase(item)}
        disabled={!canAfford}
      >
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={[styles.itemPrice, !canAfford && styles.disabledText]}>
            {HABITCOIN_SYMBOL}{item.price}
          </Text>
        </View>
        <Text style={[styles.itemDescription, !canAfford && styles.disabledText]}>
          {item.description}
        </Text>
        {!canAfford && (
          <Text style={styles.insufficientFunds}>Insufficient funds</Text>
        )}
      </Pressable>
    );
  };

  const ShopSection = ({ title, items }: { title: string, items: any[] }) => (
    <View style={{ marginBottom: 8 }}>
      <GlassCard style={{ backgroundColor: Colors.main.surface }}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={{ gap: 8 }}>
          {items.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </View>
      </GlassCard>
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
            {/* Logo icon on the left, no border or extra styling */}
            <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
            {/* Centered title */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>MARKET</Text>
            </View>
            {/* Empty view for symmetry */}
            <View style={{ width: 32, height: 32 }} />
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>{HABITCOIN_SYMBOL}{userCoins.toLocaleString()}</Text>
          </View>
        </View>

        {/* Shop Sections */}
        <View style={{ paddingHorizontal: 12, marginTop: 18 }}>
          <ShopSection 
            title="INVESTMENT TOOLS" 
            items={investmentTools}
          />
          
          <ShopSection 
            title="SOCIAL ENHANCEMENTS" 
            items={socialEnhancements}
          />
          
          <ShopSection 
            title="SUPPORT BOOSTERS" 
            items={supportBoosters}
          />
          
          <ShopSection 
            title="COMMUNITY FEATURES" 
            items={communityFeatures}
          />
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
  balanceContainer: {
    alignItems: 'center',
  },
  balanceAmount: {
    color: Colors.main.background,
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: Typography.fontFamily.numeric,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  shopItem: {
    padding: 16,
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.main.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  disabledItem: {
    opacity: 0.5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.main.textPrimary,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.main.accent,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.main.textSecondary,
    lineHeight: 16,
    flexWrap: 'wrap',
    maxWidth: '75%',
  },
  disabledText: {
    color: Colors.main.textSecondary,
  },
  insufficientFunds: {
    fontSize: 12,
    color: Colors.main.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
