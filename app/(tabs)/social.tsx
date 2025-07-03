import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Animated, ImageSourcePropType, Modal, TextInput, TouchableOpacity } from 'react-native';
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
import PortfolioCard from '../../components/PortfolioCard';
import SupporterCard from '../../components/SupporterCard';
import { getRiskColor, getImageSource } from '../../utils/socialUtils';
import TabButton from '../../components/TabButton';

export default function SocialScreen() {
  const insets = useSafeAreaInsets();
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

  const [search, setSearch] = useState('');
  const [commentingHabitId, setCommentingHabitId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentedHabits, setCommentedHabits] = useState<string[]>([]);
  const commentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const h = animatedMyHabits.addListener(({ value }) => setDisplayMyHabits(value));
    const s = animatedSupportValue.addListener(({ value }) => setDisplaySupportValue(value));
    return () => {
      animatedMyHabits.removeListener(h);
      animatedSupportValue.removeListener(s);
    };
  }, []);

  useEffect(() => {
    if (commentingHabitId && commentInputRef.current) {
      // Timeout ensures focus after modal animation
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    }
  }, [commentingHabitId]);

  const handleSupport = (habit: Habit | User) => {
    // TODO: Implement support logic
    if (habit instanceof Habit) {
      const user = socialManager.getFriends().find(u => u.id === habit.userId);
      console.log('Supporting:', user?.name, habit.title);
    } else if (habit instanceof User) {
      console.log('Supporting user:', habit.name);
    }
  };

  const allHabits = socialManager.getFriendHabits();
  const allUsers = socialManager.getFriends();
  const isSearching = search.trim() !== '';
  const filteredHabits = isSearching
    ? allHabits.filter(habit => {
        const user = allUsers.find(u => u.id === habit.userId);
        const userName = user?.name?.toLowerCase() || '';
        const habitTitle = habit.title?.toLowerCase() || '';
        const q = search.toLowerCase();
        return userName.includes(q) || habitTitle.includes(q);
      })
    : allHabits;

  const handleOpenComment = (habit: Habit) => {
    setCommentingHabitId(habit.id || '');
    setCommentText('');
  };

  const handleSendComment = () => {
    if (commentingHabitId) {
      setCommentedHabits(prev => [...prev, commentingHabitId]);
    }
    setCommentingHabitId(null);
    setCommentText('');
  };

  const handleCancelComment = () => {
    setCommentingHabitId(null);
    setCommentText('');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Sticky Header */}
      <View style={[styles.header, { backgroundColor: Colors.main.accent, position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }]}> 
          <View style={styles.headerRow}>
            <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>SUPPORT</Text>
            </View>
            <View style={{ width: 32, height: 32 }} />
          </View>
          </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70 + insets.top, paddingBottom: insets.bottom }}
      >
        {/* Main Content - no tabs */}
        <View style={{ paddingHorizontal: 12, marginTop: 0 }}>
              {/* Search Card */}
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <SearchCard
                  value={search}
                  onChangeText={setSearch}
                />
              </GlassCard>

          {/* Featured Performer and Success Story - hide when searching */}
          {!isSearching && (
            <>
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>FEATURED PERFORMER</Text>
                <FeaturedProfileCard user={socialManager.getFeaturedProfile()} />
              </GlassCard>
              <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <Text style={styles.sectionTitle}>SUCCESS STORY</Text>
                <SuccessStoryCard story={socialManager.getSuccessStory()} />
              </GlassCard>
            </>
          )}

          {/* Support Opportunities - each as its own card */}
          {filteredHabits.map((habit, idx) => {
            const user = allUsers.find(u => u.id === habit.userId) as User;
            let comment;
            if (idx === 0) comment = "Struggling to stay motivated in the mornings. Any tips or encouragement would help!";
            if (idx === 2) comment = "Having a tough week and could use some support to keep my meditation streak going.";
            if (idx === 4) comment = "Yoga is new for me and I'm finding it hard to build the habit. Would love some advice!";
            return (
              <GlassCard key={habit.id} style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
                <UserHabitCard
                  user={user}
                  habit={habit}
                  onPress={handleSupport}
                  comment={comment}
                  onComment={() => handleOpenComment(habit)}
                  commented={commentedHabits.includes(habit.id || '')}
                />
              </GlassCard>
            );
          })}
        </View>
    </ScrollView>
    {/* Comment Modal */}
    <Modal
      visible={!!commentingHabitId}
      transparent
      animationType="fade"
      onRequestClose={handleCancelComment}
    >
      <View style={commentModalStyles.overlay}>
        <View style={commentModalStyles.card}>
          <Text style={commentModalStyles.title}>Write a Support Comment</Text>
          <TextInput
            ref={commentInputRef}
            style={commentModalStyles.input}
            placeholder="Type your message..."
            placeholderTextColor={Colors.main.textSecondary}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            textAlignVertical="top"
            textAlign="left"
          />
          <View style={commentModalStyles.buttonRow}>
            <TouchableOpacity style={commentModalStyles.cancelButton} onPress={handleCancelComment}>
              <Text style={commentModalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commentModalStyles.sendButton, { opacity: commentText.trim() ? 1 : 0.5 }]}
              onPress={handleSendComment}
              disabled={!commentText.trim()}
            >
              <Text style={commentModalStyles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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

const commentModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  title: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    minHeight: 100,
    backgroundColor: Colors.main.surface,
    color: Colors.main.textPrimary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.main.border,
    padding: 12,
    fontSize: 15,
    marginBottom: 18,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.main.surface,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  cancelButtonText: {
    color: Colors.main.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sendButton: {
    flex: 1,
    backgroundColor: Colors.main.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: Colors.main.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 