import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Animated, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { Support } from '../../models/Support';
import SocialManager from '../../models/SocialManager';
import PortfolioManager from '../../models/PortfolioManager';
import LeaderboardManager from '../../models/LeaderboardManager';
import InvestmentCard from '../../components/InvestmentCard';
import CategoryCard from '../../components/CategoryCard';
import RecommendationCard from '../../components/RecommendationCard';
import FeaturedProfileCard from '../../components/FeaturedProfileCard';
import SuccessStoryCard from '../../components/SuccessStoryCard';
import LeaderboardCard from '../../components/LeaderboardCard';
import SearchCard from '../../components/SearchCard';
import UserHabitCard from '../../components/UserHabitCard';

// Helper to ensure image source is always ImageSourcePropType
function getImageSource(img: any): ImageSourcePropType {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../../assets/images/icon.png');
  return require('../../assets/images/icon.png');
}

export default function SocialScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState(params.tab === 'portfolio' ? 'portfolio' : 'discover');
  const [userBalance] = useState(1085.25);
  
  // Instantiate managers
  const socialManager = new SocialManager();
  const portfolioManager = new PortfolioManager(socialManager.getFriends(), socialManager.getFriendHabits());
  const leaderboardManager = new LeaderboardManager();

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

  const handleSupport = (habit: Habit | User) => {
    // TODO: Implement support logic
    if (habit instanceof Habit) {
      const user = socialManager.getFriends().find(u => u.id === habit.userId);
      console.log('Supporting:', user?.name, habit.title);
    } else if (habit instanceof User) {
      console.log('Supporting user:', habit.name);
    }
  };

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
          <Text style={styles.portfolioInvested}>{HABITCOIN_SYMBOL}{investment.invested}</Text>
          <Text style={styles.portfolioCurrent}>{HABITCOIN_SYMBOL}{investment.currentValue}</Text>
        </View>
      </View>
    );
  };

  const SupporterCard = ({ supporter }: { supporter: any }) => {
    const isGain = supporter.profit >= 0;
    
    return (
      <View style={styles.supporterCard}>
        <View style={styles.supporterHeader}>
          <View style={styles.supporterInfo}>
            <Image source={supporter.avatar} style={styles.supporterAvatar} />
            <View>
              <Text style={styles.supporterName}>{supporter.name}</Text>
              <Text style={styles.supporterHabit}>{supporter.habit}</Text>
            </View>
          </View>
          <View style={styles.supporterProfitContainer}>
            <Text style={[styles.supporterProfitAmount, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}>
              {HABITCOIN_SYMBOL}{Math.abs(supporter.profit)} {isGain ? '▲' : '▼'}
            </Text>
          </View>
        </View>
        <View style={styles.supporterDetails}>
          <Text style={styles.supporterDate}>{supporter.supportDate}</Text>
          <Text style={styles.supporterCurrent}>{HABITCOIN_SYMBOL}{supporter.currentValue}</Text>
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
              <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>SUPPORT</Text>
            </View>
            <View style={{ width: 32, height: 32 }} />
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
                  {socialManager.getRecommendations().map((user, i) => {
                    const habit = socialManager.getFriendHabits().find(h => h.userId === user.id) ?? new Habit({ title: 'Habit' });
                    return (
                      <UserHabitCard key={user.id || i} user={user} habit={habit} onPress={handleSupport} reason="Consistent streaks" />
                    );
                  })}
                </View>
              </GlassCard>

              {/* Categories */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>TRENDING CATEGORIES</Text>
                <View style={styles.categoriesGrid}>
                  {socialManager.getTrendingCategories().map((category, index) => (
                    <CategoryCard key={index} category={category} />
                  ))}
                </View>
              </GlassCard>

              {/* Investment Opportunities */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>SUPPORT OPPORTUNITIES</Text>
                <View style={{ gap: 12 }}>
                  {socialManager.getFriendHabits().map((habit) => {
                    const user = socialManager.getFriends().find(u => u.id === habit.userId) as User;
                    return (
                      <UserHabitCard key={habit.id} user={user} habit={habit} onPress={handleSupport} />
                    );
                  })}
                </View>
              </GlassCard>
            </>
          )}

          {selectedTab === 'trending' && (
            <>
              {/* Featured Profile */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>FEATURED PERFORMER</Text>
                <FeaturedProfileCard user={socialManager.getFeaturedProfile()} />
              </GlassCard>

              {/* Success Story */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>SUCCESS STORY</Text>
                <SuccessStoryCard story={socialManager.getSuccessStory()} />
              </GlassCard>

              {/* Leaderboard */}
              <GlassCard style={{ backgroundColor: Colors.main.surface }}>
                <LeaderboardCard users={leaderboardManager.getLeaderboardUsers()} />
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
  featuredAvatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featuredAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  successAvatarContainer: {
    backgroundColor: Colors.main.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  successAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  supporterCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  supporterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  supporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supporterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  supporterName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  supporterHabit: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  supporterProfitContainer: {
    alignItems: 'flex-end',
  },
  supporterProfitAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  supporterDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supporterDate: {
    color: Colors.main.textSecondary,
    fontSize: 12,
  },
  supporterCurrent: {
    color: Colors.main.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
}); 