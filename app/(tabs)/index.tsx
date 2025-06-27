import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Animated, Dimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import { AccentButton } from '../../components/AccentButton';
import { HabitCard } from '../../components/HabitCard';
import { InvestmentCard } from '../../components/InvestmentCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { Investment } from '../../models/Investment';

const { width } = Dimensions.get('window');
const BOTTLE_CONTAINER_PADDING = 24;
const BOTTLE_WIDTH = width - BOTTLE_CONTAINER_PADDING * 2;
const BOTTLE_HEIGHT = 74;
const BOTTLE_SEGMENTS = 7;

// Dummy data for UI
const user = new User({
  name: 'Alex',
  profileImage: '',
  habitCoins: 2847.5,
  stats: { habitsCompleted: 1247, longestStreak: 67, investmentAccuracy: 73, habitCoinsEarned: 12456 },
});
const habits = [
  new Habit({ title: 'Morning Run', currentPrice: 45, streakCount: 23, completedToday: true }),
  new Habit({ title: 'Read 30min', currentPrice: 25, streakCount: 12, completedToday: false }),
  new Habit({ title: 'Meditation', currentPrice: 15, streakCount: 7, missedToday: true }),
];
const investments = [
  new Investment({ sharesOwned: 5, purchasePrice: 234 }),
  new Investment({ sharesOwned: 3, purchasePrice: 189 }),
  new Investment({ sharesOwned: 4, purchasePrice: 156 }),
];
const investmentMeta = [
  { title: "Sarah's Gym", emoji: '💪', percent: 12.3, profit: 23.5, streak: 14 },
  { title: "Mike's Coding", emoji: '💻', percent: 8.1, profit: 15.25, streak: 21 },
  { title: "Lisa's Reading", emoji: '📚', percent: -3.2, profit: -8.5, streak: 9 },
];

function getInitialHabitState() {
  // Each habit: { ...habit, fillLevel: 0-7, completedToday: boolean, animatedFill: Animated.Value, animatedColor: Animated.Value }
  return habits.map(habit => {
    const fillLevel = habit.completedToday ? 1 : 0;
    return {
      ...habit,
      fillLevel,
      completedToday: !!habit.completedToday,
      animatedFill: new Animated.Value(fillLevel / BOTTLE_SEGMENTS),
      animatedColor: new Animated.Value(fillLevel > 0 ? 1 : 0),
    };
  });
}

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  // Animated number for portfolio value
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayCoins, setDisplayCoins] = useState(0);
  const [habitList, setHabitList] = useState(getInitialHabitState());

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayCoins(value);
    });
    Animated.timing(animatedValue, {
      toValue: user.habitCoins || 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
    return () => animatedValue.removeListener(listener);
  }, []);

  // Animate fill and color for a habit
  const animateHabit = (i: number, fillLevel: number, completed: boolean) => {
    const toFill = fillLevel / BOTTLE_SEGMENTS;
    Animated.timing(habitList[i].animatedFill, {
      toValue: toFill,
      duration: 400,
      useNativeDriver: false,
    }).start();
    Animated.timing(habitList[i].animatedColor, {
      toValue: completed ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Handle bottle press
  const handleBottlePress = (i: number) => {
    setHabitList(prev => {
      const habit = prev[i];
      let newFill = habit.fillLevel;
      let newCompleted = habit.completedToday;
      let newStreak = habit.streakCount || 0;
      if (!habit.completedToday) {
        // Mark as complete for today
        newFill = Math.min(habit.fillLevel + 1, BOTTLE_SEGMENTS);
        newCompleted = true;
        newStreak = newStreak + 1;
        if (newFill === BOTTLE_SEGMENTS) {
          // Animate to full, then reset
          animateHabit(i, BOTTLE_SEGMENTS, true);
          setTimeout(() => {
            setHabitList(prev2 => {
              const updated = [...prev2];
              updated[i] = {
                ...updated[i],
                fillLevel: 0,
                completedToday: false,
                streakCount: 0,
              };
              animateHabit(i, 0, false);
              return updated;
            });
          }, 600);
        } else {
          animateHabit(i, newFill, true);
        }
      } else {
        // Uncheck for today
        newFill = Math.max(habit.fillLevel - 1, 0);
        newCompleted = false;
        newStreak = Math.max(newStreak - 1, 0);
        animateHabit(i, newFill, false);
      }
      const updated = [...prev];
      updated[i] = {
        ...habit,
        fillLevel: newFill,
        completedToday: newCompleted,
        streakCount: newStreak,
      };
      return updated;
    });
  };

  // Interpolate color for fill
  const interpolateColor = (animatedColor: Animated.Value) =>
    animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.main.accentSoft, Colors.main.accent],
    });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom }}>
        {/* Portfolio Header Card (Greener) */}
        <View style={[styles.headerBg, { backgroundColor: Colors.main.accent }]}> 
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <Image source={user.profileImage ? { uri: user.profileImage } : require('../../assets/images/icon.png')} style={styles.avatar} />
            </View>
            <Text style={[styles.headerTitle, { color: Colors.main.background }]}>PORTFOLIO</Text>
            <Text style={[styles.bell, { color: Colors.main.background }]}>🔔</Text>
          </View>
          <Text style={[styles.portfolioValue, { color: Colors.main.background }]}>
            {HABITCOIN_SYMBOL} {displayCoins.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
          <Text style={[styles.portfolioSub, { color: Colors.main.background }]}>Total Value <Text style={{ color: Colors.main.background }}>↗️ +Ⱨ23.14</Text> Today</Text>
          <View style={styles.pieRow}>
            <Text style={[styles.pieStat, { color: Colors.main.background }]}><Text style={{ color: Colors.main.background }}>📊 65%</Text> My Habits{"\n"}<Text style={styles.pieValue}>{HABITCOIN_SYMBOL}1,847.25</Text></Text>
            <Text style={[styles.pieStat, { color: Colors.main.background }]}><Text style={{ color: Colors.main.background }}>📈 35%</Text> Investments{"\n"}<Text style={styles.pieValue}>{HABITCOIN_SYMBOL}1,000.25</Text></Text>
          </View>
        </View>
        {/* Habits as Glassy Bottles (vertical stack, animated) */}
        <View style={{ paddingHorizontal: BOTTLE_CONTAINER_PADDING, marginTop: 18, marginBottom: 8 }}>
          {habitList.map((habit, i) => {
            const completed = !!habit.completedToday;
            const textColor = completed ? Colors.main.textPrimary : Colors.main.textSecondary;
            // Animation state for streak and currency pop-up
            const [streakAnim] = React.useState(new Animated.Value(1));
            const [showCurrency, setShowCurrency] = React.useState(false);
            const [currencyAnim] = React.useState(new Animated.Value(0));

            // Animate streak and currency gain
            React.useEffect(() => {
              if (habit.completedToday) {
                // Animate streak pop (scale up)
                Animated.sequence([
                  Animated.timing(streakAnim, { toValue: 1.3, duration: 180, useNativeDriver: true }),
                  Animated.timing(streakAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
                ]).start();
                // Show and animate currency pop-up
                setShowCurrency(true);
                currencyAnim.setValue(0);
                Animated.timing(currencyAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start(() => {
                  setShowCurrency(false);
                });
              } else {
                // Animate streak shrink (scale down)
                Animated.sequence([
                  Animated.timing(streakAnim, { toValue: 0.7, duration: 180, useNativeDriver: true }),
                  Animated.timing(streakAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
                ]).start();
              }
            }, [habit.completedToday]);

            return (
              <View key={i} style={[bottleStyles.bottleWrap, { marginBottom: 18 }]}> 
                {/* Currency gain pop-up, absolutely positioned above the bottle and in front of everything */}
                {showCurrency && habit.completedToday && (habit.currentPrice || 0) > 0 && (
                  <Animated.View
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: BOTTLE_HEIGHT - 8, // just above the streak number
                      zIndex: 99,
                      alignItems: 'flex-end',
                      opacity: currencyAnim,
                      pointerEvents: 'none',
                      transform: [
                        { translateY: currencyAnim.interpolate({ inputRange: [0, 1], outputRange: [10, -18] }) },
                        { scale: currencyAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.7, 1.2, 1] }) },
                      ],
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.main.accent,
                        fontWeight: 'bold',
                        fontSize: 16,
                        textShadowColor: '#0002',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="clip"
                    >
                      +{HABITCOIN_SYMBOL}{habit.currentPrice || 0}
                    </Text>
                  </Animated.View>
                )}
                <Pressable
                  style={bottleStyles.bottleOuter}
                  onPress={() => handleBottlePress(i)}
                >
                  <Animated.View
                    style={[
                      bottleStyles.bottleFill,
                      {
                        width: habit.animatedFill.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, BOTTLE_WIDTH],
                        }),
                        backgroundColor: interpolateColor(habit.animatedColor),
                      },
                    ]}
                  />
                  <View style={[bottleStyles.bottleGlass, { borderWidth: 0 }]} />
                  <View style={bottleStyles.bottleContent} pointerEvents="none">
                    <View style={{ flex: 1 }}>
                      <Text style={[bottleStyles.bottleLabel, { color: textColor }]} numberOfLines={2} ellipsizeMode="tail">{habit.title}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                      <Animated.Text
                        style={[
                          bottleStyles.bottleStreak,
                          { color: textColor, transform: [{ scale: streakAnim }] },
                        ]}
                      >
                        {habit.streakCount || 0}
                      </Animated.Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
        {/* Investments Section (neutral card) */}
        <View style={{ paddingHorizontal: 12 }}>
          <GlassCard style={{ backgroundColor: Colors.main.surface }}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>📈 TOP INVESTMENTS</Text>
              <Text style={styles.sectionLink}>View All →</Text>
            </View>
            {investments.map((inv, i) => (
              <InvestmentCard
                key={i}
                investment={inv}
                habitTitle={investmentMeta[i]?.title + ' ' + investmentMeta[i]?.emoji}
                profit={investmentMeta[i]?.profit}
                percent={investmentMeta[i]?.percent}
              />
            ))}
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.main.background,
  },
  headerBg: {
    backgroundColor: Colors.main.accent,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 18,
    paddingHorizontal: 18,
    paddingTop: 8,
    marginBottom: 8,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  avatarWrap: {
    borderWidth: 2,
    borderColor: Colors.main.accentSoft,
    borderRadius: 20,
    width: 40,
    height: 40,
    overflow: 'hidden',
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.main.surface,
  },
  headerTitle: {
    color: Colors.main.background,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  bell: {
    fontSize: 22,
    color: Colors.main.background,
  },
  portfolioValue: {
    color: Colors.main.background,
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: Typography.fontFamily.numeric,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  portfolioSub: {
    color: Colors.main.background,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
  },
  pieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  pieStat: {
    color: Colors.main.background,
    fontSize: 13,
    flex: 1,
    textAlign: 'center',
  },
  pieValue: {
    color: Colors.main.background,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sectionCount: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionLink: {
    color: Colors.main.accent,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const bottleStyles = StyleSheet.create({
  bottleWrap: {
    alignItems: 'center',
    width: '100%',
  },
  bottleOuter: {
    width: '100%',
    height: BOTTLE_HEIGHT,
    borderRadius: 18,
    backgroundColor: Colors.main.surface,
    borderWidth: 2,
    borderColor: Colors.main.accentSoft,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 6,
  },
  bottleFill: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '100%',
    borderRadius: 16,
    zIndex: 1,
  },
  bottleGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    borderWidth: 0,
    borderColor: Colors.main.accentSoft,
    zIndex: 2,
  },
  bottleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: BOTTLE_HEIGHT,
    paddingHorizontal: 16,
    zIndex: 3,
  },
  bottleLabel: {
    color: Colors.main.textSecondary,
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: BOTTLE_WIDTH * 0.55,
  },
  bottleStreak: {
    color: Colors.main.textSecondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bottleReward: {
    color: Colors.main.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
