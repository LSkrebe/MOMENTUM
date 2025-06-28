import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';

// Mock data for investment opportunities
const friendsHabits = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Morning Run',
    streak: 23,
    currentPrice: 45,
    purchasePrice: 32,
    profit: 13,
    riskLevel: 'Low',
    category: 'Fitness',
    supporters: 156,
    trend: 'up',
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Coding Practice',
    streak: 67,
    currentPrice: 89,
    purchasePrice: 45,
    profit: 44,
    riskLevel: 'Medium',
    category: 'Learning',
    supporters: 234,
    trend: 'up',
  },
  {
    id: 3,
    name: 'Lisa Park',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Meditation',
    streak: 12,
    currentPrice: 28,
    purchasePrice: 35,
    profit: -7,
    riskLevel: 'High',
    category: 'Wellness',
    supporters: 89,
    trend: 'down',
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Reading',
    streak: 45,
    currentPrice: 67,
    purchasePrice: 52,
    profit: 15,
    riskLevel: 'Low',
    category: 'Learning',
    supporters: 198,
    trend: 'up',
  },
];

const trendingCategories = [
  { name: 'Fitness', trend: '+12.5%', color: '#4CAF50' },
  { name: 'Learning', trend: '+8.3%', color: '#2196F3' },
  { name: 'Wellness', trend: '+15.2%', color: '#9C27B0' },
  { name: 'Productivity', trend: '+6.7%', color: '#FF9800' },
];

const recommendations = [
  {
    id: 5,
    name: 'Emma Wilson',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Language Learning',
    reason: 'Consistent 30+ day streaks',
    category: 'Learning',
  },
  {
    id: 6,
    name: 'James Thompson',
    avatar: require('../../assets/images/icon.png'),
    habit: 'Weight Training',
    reason: 'Steady progress pattern',
    category: 'Fitness',
  },
];

const portfolioInvestments = [
  { name: 'Sarah Chen', avatar: require('../../assets/images/icon.png'), habit: 'Morning Run', invested: 320, currentValue: 450, profit: 130, profitPercent: 40.6 },
  { name: 'Mike Rodriguez', avatar: require('../../assets/images/icon.png'), habit: 'Coding Practice', invested: 210, currentValue: 415, profit: 205, profitPercent: 97.6 },
  { name: 'Lisa Park', avatar: require('../../assets/images/icon.png'), habit: 'Meditation', invested: 150, currentValue: 120, profit: -30, profitPercent: -20.0 },
];

// Mock data for discover tab
const featuredProfile = {
  name: 'Alex Thompson',
  avatar: require('../../assets/images/icon.png'),
  title: 'Elite Performer',
  totalValue: 15420,
  streak: 156,
  supporters: 892,
  description: 'Top habit performer this month with incredible consistency across multiple categories.',
};

const successStory = {
  name: 'Maria Rodriguez',
  avatar: require('../../assets/images/icon.png'),
  habit: 'Daily Meditation',
  streak: 100,
  totalEarned: 3240,
  story: "I never thought I could maintain a meditation practice for 100 days straight. The support from this community kept me going through the toughest days. Now I can't imagine my life without this daily ritual. Thank you to everyone who believed in me!",
  supporters: 234,
  currentValue: 89,
};

const leaderboardUsers = [
  { name: 'Alex Thompson', avatar: require('../../assets/images/icon.png'), totalValue: 15420, rank: 1, title: 'Elite Supporter' },
  { name: 'Sarah Chen', avatar: require('../../assets/images/icon.png'), totalValue: 12890, rank: 2, title: 'Habit Master' },
  { name: 'Mike Rodriguez', avatar: require('../../assets/images/icon.png'), totalValue: 11230, rank: 3, title: 'Consistency King' },
  { name: 'Emma Wilson', avatar: require('../../assets/images/icon.png'), totalValue: 9870, rank: 4, title: 'Wellness Warrior' },
  { name: 'David Kim', avatar: require('../../assets/images/icon.png'), totalValue: 8450, rank: 5, title: 'Learning Legend' },
  { name: 'Lisa Park', avatar: require('../../assets/images/icon.png'), totalValue: 7230, rank: 6, title: 'Fitness Fanatic' },
  { name: 'James Thompson', avatar: require('../../assets/images/icon.png'), totalValue: 6540, rank: 7, title: 'Productivity Pro' },
  { name: 'Maria Rodriguez', avatar: require('../../assets/images/icon.png'), totalValue: 5980, rank: 8, title: 'Meditation Master' },
  { name: 'Chris Johnson', avatar: require('../../assets/images/icon.png'), totalValue: 5420, rank: 9, title: 'Streak Seeker' },
  { name: 'Anna Lee', avatar: require('../../assets/images/icon.png'), totalValue: 4870, rank: 10, title: 'Goal Getter' },
];

export default function SocialScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('discover');
  const [userBalance] = useState(1085.25);
  
  // Animated values for portfolio stats - updated to match home tab
  const animatedMyHabits = useRef(new Animated.Value(450)).current;
  const animatedSupportValue = useRef(new Animated.Value(535)).current;
  const [displayMyHabits, setDisplayMyHabits] = useState(450);
  const [displaySupportValue, setDisplaySupportValue] = useState(535);

  useEffect(() => {
    const h = animatedMyHabits.addListener(({ value }) => setDisplayMyHabits(value));
    const s = animatedSupportValue.addListener(({ value }) => setDisplaySupportValue(value));
    return () => {
      animatedMyHabits.removeListener(h);
      animatedSupportValue.removeListener(s);
    };
  }, []);

  const handleSupport = (habit: any) => {
    // TODO: Implement support logic
    console.log('Supporting:', habit.name, habit.habit);
  };

  const InvestmentCard = ({ habit }: { habit: any }) => {
    const isGain = habit.profit >= 0;
    
    return (
      <Pressable style={styles.investmentCard} onPress={() => handleSupport(habit)}>
        <View style={styles.investmentHeader}>
          <View style={styles.investorInfo}>
            <Image source={habit.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.investorName}>{habit.name}</Text>
              <Text style={styles.habitTitle}>{habit.habit}</Text>
            </View>
          </View>
          <View style={styles.priceInfo}>
            <Text style={[styles.profitText, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}>
              {HABITCOIN_SYMBOL}{Math.abs(habit.profit)} {isGain ? '▲' : '▼'}
            </Text>
          </View>
        </View>
        
        <View style={styles.investmentDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Streak</Text>
            <Text style={styles.detailValue}>{habit.streak} days</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Supporters</Text>
            <Text style={styles.detailValue}>{habit.supporters}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const CategoryCard = ({ category }: { category: any }) => (
    <Pressable style={styles.categoryCard}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={[styles.categoryTrend, { color: Colors.main.accent }]}>{category.trend}</Text>
    </Pressable>
  );

  const RecommendationCard = ({ recommendation }: { recommendation: any }) => (
    <Pressable style={styles.recommendationCard} onPress={() => handleSupport(recommendation)}>
      <View style={styles.recommendationHeader}>
        <View style={styles.recommendationLeftContent}>
          <Image source={recommendation.avatar} style={styles.recommendationAvatar} />
          <View>
            <Text style={styles.recommendationName}>{recommendation.name}</Text>
            <Text style={styles.recommendationHabit}>{recommendation.habit}</Text>
            <Text style={styles.recommendationReason}>{recommendation.reason}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const SearchCard = () => (
    <View style={styles.searchCard}>
      <Text style={styles.searchPlaceholder}>Search users, habits, or categories...</Text>
    </View>
  );

  const PortfolioCard = ({ investment }: { investment: any }) => {
    const isGain = investment.profit >= 0;
    
    return (
      <View style={styles.portfolioCard}>
        <View style={styles.portfolioHeader}>
          <View style={styles.portfolioInvestorInfo}>
            <Image source={investment.avatar} style={styles.portfolioAvatar} />
            <View>
              <Text style={styles.portfolioName}>{investment.name}</Text>
              <Text style={styles.portfolioHabit}>{investment.habit}</Text>
            </View>
          </View>
          <View style={styles.portfolioProfitContainer}>
            <Text style={[styles.portfolioProfitAmount, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}>
              {HABITCOIN_SYMBOL}{Math.abs(investment.profit)} {isGain ? '▲' : '▼'}
            </Text>
          </View>
        </View>
        <View style={styles.portfolioValues}>
          <Text style={styles.portfolioInvested}>Invested: {HABITCOIN_SYMBOL}{investment.invested}</Text>
          <Text style={styles.portfolioCurrent}>Current: {HABITCOIN_SYMBOL}{investment.currentValue}</Text>
        </View>
      </View>
    );
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return Colors.main.accent;
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return Colors.main.textSecondary;
    }
  };

  const TabButton = ({ title, isActive, onPress }: { title: string, isActive: boolean, onPress: () => void }) => (
    <Pressable 
      style={[styles.tabButton, isActive && styles.activeTabButton]} 
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </Pressable>
  );

  const FeaturedProfileCard = () => (
    <Pressable style={styles.featuredCard}>
      <View style={styles.featuredCenter}>
        <Image source={featuredProfile.avatar} style={styles.featuredAvatar} />
        <Text style={styles.featuredName}>{featuredProfile.name}</Text>
        <Text style={styles.featuredTitle}>{featuredProfile.title}</Text>
      </View>
      <Text style={styles.featuredDescription}>{featuredProfile.description}</Text>
      <View style={styles.featuredStats}>
        <Text style={styles.featuredValue}>{HABITCOIN_SYMBOL}{featuredProfile.totalValue.toLocaleString()}</Text>
        <Text style={styles.featuredLabel}>Total Value</Text>
      </View>
      <View style={styles.featuredMetrics}>
        <View style={styles.featuredMetric}>
          <Text style={styles.featuredMetricValue}>{featuredProfile.streak}</Text>
          <Text style={styles.featuredMetricLabel}>Day Streak</Text>
        </View>
        <View style={styles.featuredMetric}>
          <Text style={styles.featuredMetricValue}>{featuredProfile.supporters}</Text>
          <Text style={styles.featuredMetricLabel}>Supporters</Text>
        </View>
      </View>
    </Pressable>
  );

  const SuccessStoryCard = () => (
    <Pressable style={styles.successCard}>
      <View style={styles.successHeader}>
        <Image source={successStory.avatar} style={styles.successAvatar} />
        <View style={styles.successInfo}>
          <Text style={styles.successName}>{successStory.name}</Text>
          <Text style={styles.successHabit}>{successStory.habit}</Text>
        </View>
      </View>
      <Text style={styles.successStory}>{successStory.story}</Text>
      <View style={styles.successStats}>
        <View style={styles.successStat}>
          <Text style={styles.successStatValue}>{HABITCOIN_SYMBOL}{successStory.totalEarned}</Text>
          <Text style={styles.successStatLabel}>Total Earned</Text>
        </View>
        <View style={styles.successStat}>
          <Text style={styles.successStatValue}>{successStory.supporters}</Text>
          <Text style={styles.successStatLabel}>Supporters</Text>
        </View>
        <View style={styles.successStat}>
          <Text style={styles.successStatValue}>{successStory.streak}</Text>
          <Text style={styles.successStatLabel}>Day Streak</Text>
        </View>
      </View>
    </Pressable>
  );

  const LeaderboardCard = () => (
    <View>
      <Text style={styles.leaderboardTitle}>TOP PERFORMERS</Text>
      <View style={styles.leaderboardCard}>
        <View style={{ gap: 16 }}>
          {leaderboardUsers.map((user, index) => (
            <View key={user.rank} style={styles.leaderboardRow}>
              <View style={styles.leaderboardRank}>
                <Text style={styles.rankNumber}>{user.rank}</Text>
              </View>
              <View style={styles.leaderboardUserInfo}>
                <Image source={user.avatar} style={styles.leaderboardAvatar} />
                <View style={styles.leaderboardUserDetails}>
                  <Text style={styles.leaderboardName}>{user.name}</Text>
                  <Text style={styles.leaderboardUserTitle}>{user.title}</Text>
                </View>
              </View>
              <Text style={styles.leaderboardValue}>{HABITCOIN_SYMBOL}{user.totalValue.toLocaleString()}</Text>
            </View>
          ))}
        </View>
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
              <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>SOCIAL</Text>
            </View>
            <View style={{ width: 32, height: 32 }} />
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceAmount}>{HABITCOIN_SYMBOL}{userBalance.toLocaleString()}</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 12, marginTop: 18 }}>
          <View style={styles.tabContainer}>
            <TabButton 
              title="DISCOVER" 
              isActive={selectedTab === 'discover'} 
              onPress={() => setSelectedTab('discover')} 
            />
            <TabButton 
              title="PORTFOLIO" 
              isActive={selectedTab === 'portfolio'} 
              onPress={() => setSelectedTab('portfolio')} 
            />
            <TabButton 
              title="TRENDING" 
              isActive={selectedTab === 'trending'} 
              onPress={() => setSelectedTab('trending')} 
            />
          </View>
        </View>

        {/* Tab Content */}
        <View style={{ paddingHorizontal: 12, marginTop: 18 }}>
          {selectedTab === 'discover' && (
            <>
              {/* Search Card */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <SearchCard />
              </GlassCard>

              {/* Recommendations */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>RECOMMENDATIONS</Text>
                <View style={{ gap: 12 }}>
                  {recommendations.map((rec) => (
                    <RecommendationCard key={rec.id} recommendation={rec} />
                  ))}
                </View>
              </GlassCard>

              {/* Investment Opportunities */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>SUPPORT OPPORTUNITIES</Text>
                <View style={{ gap: 12 }}>
                  {friendsHabits.map((habit) => (
                    <InvestmentCard key={habit.id} habit={habit} />
                  ))}
                </View>
              </GlassCard>

              {/* Categories */}
              <GlassCard style={{ backgroundColor: Colors.main.surface }}>
                <Text style={styles.sectionTitle}>TRENDING CATEGORIES</Text>
                <View style={styles.categoriesGrid}>
                  {trendingCategories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                  ))}
                </View>
              </GlassCard>
            </>
          )}

          {selectedTab === 'portfolio' && (
            <>
              {/* Portfolio Overview */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>PORTFOLIO OVERVIEW</Text>
                <View style={styles.portfolioStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>My Habits</Text>
                    <Text style={styles.statValue}>{HABITCOIN_SYMBOL}{displayMyHabits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Support</Text>
                    <Text style={styles.statValue}>{HABITCOIN_SYMBOL}{displaySupportValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                  </View>
                </View>
              </GlassCard>

              {/* Your Investments */}
              <GlassCard style={{ backgroundColor: Colors.main.surface }}>
                <Text style={styles.sectionTitle}>YOUR INVESTMENTS</Text>
                <View style={{ gap: 12 }}>
                  {portfolioInvestments.map((investment, index) => (
                    <PortfolioCard key={index} investment={investment} />
                  ))}
                </View>
              </GlassCard>
            </>
          )}

          {selectedTab === 'trending' && (
            <>
              {/* Featured Profile */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>FEATURED PERFORMER</Text>
                <FeaturedProfileCard />
              </GlassCard>

              {/* Success Story */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>SUCCESS STORY</Text>
                <SuccessStoryCard />
              </GlassCard>

              {/* Leaderboard */}
              <GlassCard style={{ backgroundColor: Colors.main.surface }}>
                <LeaderboardCard />
              </GlassCard>
            </>
          )}
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
  sectionTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: Colors.main.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Typography.fontFamily.numeric,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: Colors.main.accent,
  },
  tabText: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: Colors.main.background,
  },
  investmentCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
    position: 'relative',
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  investorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  investorName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  habitTitle: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profitText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  investmentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  detailValue: {
    color: Colors.main.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  trendIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  trendIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.main.border,
    flex: 1,
    minWidth: '48%',
  },
  categoryName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryTrend: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  recommendationCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  recommendationLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recommendationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recommendationName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  recommendationHabit: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  recommendationReason: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    marginBottom: 0,
  },
  recommendationRightContent: {
    alignItems: 'flex-end',
  },
  recommendationConfidence: {
    color: Colors.main.accent,
    fontSize: 24,
    fontWeight: 'bold',
  },
  recommendationLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  recommendationReturn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  searchPlaceholder: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  portfolioCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  portfolioInvestorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  portfolioAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  portfolioName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  portfolioHabit: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  portfolioProfitContainer: {
    alignItems: 'flex-end',
  },
  portfolioProfitAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  portfolioValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioInvested: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  portfolioCurrent: {
    color: Colors.main.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  featuredCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
    alignItems: 'center',
  },
  featuredCenter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  featuredName: {
    color: Colors.main.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredTitle: {
    color: Colors.main.textSecondary,
    fontSize: 16,
  },
  featuredDescription: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredStats: {
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredValue: {
    color: Colors.main.accent,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredLabel: {
    color: Colors.main.textSecondary,
    fontSize: 14,
  },
  featuredMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featuredMetric: {
    alignItems: 'center',
    flex: 1,
  },
  featuredMetricValue: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredMetricLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  successCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  successAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  successInfo: {
    flex: 1,
  },
  successName: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  successHabit: {
    color: Colors.main.textSecondary,
    fontSize: 16,
  },
  successStory: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  successStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.main.border,
  },
  successStat: {
    alignItems: 'center',
    flex: 1,
  },
  successStatValue: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  successStatLabel: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
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