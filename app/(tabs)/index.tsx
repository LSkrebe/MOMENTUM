import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Animated, Dimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../../components/GlassCard';
import { SupportCard } from '../../components/SupportCard';
import { SupportingCard } from '../../components/SupportingCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import { User } from '../../models/User';
import { Habit } from '../../models/Habit';
import { Support } from '../../models/Support';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const BOTTLE_CONTAINER_PADDING = 24;
const BOTTLE_WIDTH = width - BOTTLE_CONTAINER_PADDING * 2;
const BOTTLE_HEIGHT = 74;
const BOTTLE_SEGMENTS = 8;
const MIN_FILL = 1 / (BOTTLE_SEGMENTS * 2);

// Dummy data for UI
const user = new User({
  name: 'Alex',
  profileImage: '',
  habitCoins: 2847.5,
  stats: { habitsCompleted: 1247, longestStreak: 67, supportAccuracy: 73, habitCoinsEarned: 12456 },
});
const habits = [
  new Habit({ title: 'Morning Run', currentPrice: 45, streakCount: 23, completedToday: true }),
  new Habit({ title: 'Book Read', currentPrice: 25, streakCount: 12, completedToday: false }),
  new Habit({ title: 'Meditation', currentPrice: 15, streakCount: 7, missedToday: true }),
];

// People you're supporting (SUPPORTING card)
const peopleYouSupport = [
  { name: 'Sarah', avatar: require('../../assets/images/icon.png'), amount: 320 },
  { name: 'Mike', avatar: require('../../assets/images/icon.png'), amount: 210 },
  { name: 'Lisa', avatar: require('../../assets/images/icon.png'), amount: 150 },
];

function getInitialHabitState() {
  // For testing: first empty (shows MIN_FILL), second halfway, third one away from full
  return [
    {
      ...habits[0],
      fillLevel: 0,
      completedToday: false,
      animatedFill: new Animated.Value(MIN_FILL),
      animatedColor: new Animated.Value(0),
      disabled: false,
      previousFillLevel: 0, // Track previous fill level for undo
    },
    {
      ...habits[1],
      fillLevel: Math.floor(BOTTLE_SEGMENTS / 2),
      completedToday: false,
      animatedFill: new Animated.Value((Math.floor(BOTTLE_SEGMENTS / 2) / BOTTLE_SEGMENTS)),
      animatedColor: new Animated.Value(0),
      disabled: false,
      previousFillLevel: Math.floor(BOTTLE_SEGMENTS / 2), // Track previous fill level for undo
    },
    {
      ...habits[2],
      fillLevel: BOTTLE_SEGMENTS - 1,
      completedToday: false,
      animatedFill: new Animated.Value(((BOTTLE_SEGMENTS - 1) / BOTTLE_SEGMENTS)),
      animatedColor: new Animated.Value(0),
      disabled: false,
      previousFillLevel: BOTTLE_SEGMENTS - 1, // Track previous fill level for undo
    },
  ];
}

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  // Animated number for portfolio value
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayCoins, setDisplayCoins] = useState(0);
  const [habitList, setHabitList] = useState(getInitialHabitState());
  // Per-habit promise queue for robust serialization
  const queueRef = useRef(Array(habitList.length).fill(Promise.resolve()));
  // Track myHabitsValue and todayPnl
  const [myHabitsValue, setMyHabitsValue] = useState(() => habitList.reduce((sum, h) => sum + (h.completedToday ? (h.currentPrice || 0) : 0), 0));
  const [todayPnl, setTodayPnl] = useState(0);
  // For demo, static support value
  const supportValue = 1000.25;

  // Add supporters state that tracks which habits they support
  const [supporters, setSupporters] = useState([
    { name: 'Sarah', avatar: require('../../assets/images/icon.png'), purchasePrice: 234, currentValue: 320, supportingHabit: 'Morning Run' },
    { name: 'Mike', avatar: require('../../assets/images/icon.png'), purchasePrice: 189, currentValue: 210, supportingHabit: 'Meditation' },
    { name: 'Lisa', avatar: require('../../assets/images/icon.png'), purchasePrice: 156, currentValue: 150, supportingHabit: 'You' },
  ]);

  // Add animated values for portfolio, myHabits, and todayPnl
  const animatedPortfolio = useRef(new Animated.Value(myHabitsValue + supportValue)).current;
  const animatedMyHabits = useRef(new Animated.Value(myHabitsValue)).current;
  const animatedPnl = useRef(new Animated.Value(todayPnl)).current;
  const [displayPortfolio, setDisplayPortfolio] = useState(myHabitsValue + supportValue);
  const [displayMyHabits, setDisplayMyHabits] = useState(myHabitsValue);
  const [displayPnl, setDisplayPnl] = useState(todayPnl);

  const router = useRouter();

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

  // Animate values on change
  useEffect(() => {
    Animated.timing(animatedPortfolio, {
      toValue: myHabitsValue + supportValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [myHabitsValue, supportValue]);
  useEffect(() => {
    Animated.timing(animatedMyHabits, {
      toValue: myHabitsValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [myHabitsValue]);
  useEffect(() => {
    Animated.timing(animatedPnl, {
      toValue: todayPnl,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [todayPnl]);

  // Listen to animated values
  useEffect(() => {
    const p = animatedPortfolio.addListener(({ value }) => setDisplayPortfolio(value));
    const h = animatedMyHabits.addListener(({ value }) => setDisplayMyHabits(value));
    const t = animatedPnl.addListener(({ value }) => setDisplayPnl(value));
    return () => {
      animatedPortfolio.removeListener(p);
      animatedMyHabits.removeListener(h);
      animatedPnl.removeListener(t);
    };
  }, []);

  // Handle bottle press
  const handleBottlePress = (i: number) => {
    // Set disabled true immediately
    setHabitList(prev => {
      const updated = [...prev];
      updated[i] = { ...updated[i], disabled: true };
      return updated;
    });
    // Enqueue the press/animation/state update for this habit
    queueRef.current[i] = queueRef.current[i].then(async () => {
      return new Promise<void>(resolve => {
        setHabitList(prev => {
          const habit = prev[i];
          let newFill = habit.fillLevel;
          let newCompleted = habit.completedToday;
          let newStreak = habit.streakCount || 0;
          const updated = [...prev];
          
          if (!habit.completedToday) {
            // Mark as complete for today - always fill completely
            newFill = BOTTLE_SEGMENTS; // Fill completely
            newCompleted = true;
            newStreak = newStreak + 1;
            // Update values
            setMyHabitsValue(v => v + (habit.currentPrice || 0));
            setTodayPnl(p => p + (habit.currentPrice || 0));
            
            // Update supporters who are supporting this habit
            setSupporters(prevSupporters => 
              prevSupporters.map(supporter => {
                if (supporter.supportingHabit === habit.title || supporter.supportingHabit === 'You') {
                  // Give supporters a bonus when the habit they support is completed
                  const bonus = Math.floor((habit.currentPrice || 0) * 0.1); // 10% bonus
                  return {
                    ...supporter,
                    currentValue: supporter.currentValue + bonus
                  };
                }
                return supporter;
              })
            );
            
            // Animate to full fill and green color
            Animated.timing(habit.animatedFill, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              setTimeout(() => {
                setHabitList(prev2 => {
                  const updated2 = [...prev2];
                  updated2[i] = { ...updated2[i], disabled: false };
                  return updated2;
                });
                resolve();
              }, 100);
            });
            Animated.timing(habit.animatedColor, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            // Uncheck for today - return to previous fill level
            newFill = habit.previousFillLevel || 0;
            newCompleted = false;
            newStreak = Math.max((habit.streakCount || 0) - 1, 0);
            // Update values
            setMyHabitsValue(v => v - (habit.currentPrice || 0));
            setTodayPnl(p => p - (habit.currentPrice || 0));
            
            // Remove bonus from supporters when habit is unchecked
            setSupporters(prevSupporters => 
              prevSupporters.map(supporter => {
                if (supporter.supportingHabit === habit.title || supporter.supportingHabit === 'You') {
                  const bonus = Math.floor((habit.currentPrice || 0) * 0.1); // 10% bonus
                  return {
                    ...supporter,
                    currentValue: Math.max(0, supporter.currentValue - bonus) // Don't go below 0
                  };
                }
                return supporter;
              })
            );
            
            // Animate back to previous fill level
            const targetFill = newFill === 0 ? MIN_FILL : newFill / BOTTLE_SEGMENTS;
            Animated.timing(habit.animatedFill, {
              toValue: targetFill,
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              setTimeout(() => {
                setHabitList(prev2 => {
                  const updated2 = [...prev2];
                  updated2[i] = { ...updated2[i], disabled: false };
                  return updated2;
                });
                resolve();
              }, 100);
            });
            Animated.timing(habit.animatedColor, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
          
          updated[i] = {
            ...updated[i],
            fillLevel: newFill,
            completedToday: newCompleted,
            streakCount: newStreak,
            previousFillLevel: habit.previousFillLevel, // Preserve previous fill level
          };
          return updated;
        });
      });
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
            {/* Logo icon on the left, no border or extra styling */}
            <Image source={user.profileImage ? { uri: user.profileImage } : require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
            {/* Centered title */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>MOMENTUM</Text>
            </View>
            {/* Gain text on the right */}
            {displayPnl !== 0 && (
              <Text style={{ 
                width: 40, 
                height: 32, 
                fontSize: 10, 
                fontWeight: 'normal',
                color: Colors.main.background,
                textAlign: 'center',
                textAlignVertical: 'center',
                lineHeight: 32
              }}>
                {displayPnl >= 0 ? '+' : ''}{Math.abs(displayPnl) >= 100 ? Math.round(displayPnl) : displayPnl.toFixed(2)}
              </Text>
            )}
            {displayPnl === 0 && (
              <View style={{ width: 40, height: 32 }} />
            )}
          </View>
          <View style={{ position: 'relative' }}>
            <Text style={[styles.portfolioValue, { color: Colors.main.background }]}> 
              {HABITCOIN_SYMBOL}{displayPortfolio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.pieRow}>
            <Text style={[styles.pieStat, { color: Colors.main.background }]}>
              Habits{"\n"}<Text style={styles.pieValue}>{HABITCOIN_SYMBOL}{displayMyHabits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Text>
            <Text style={[styles.pieStat, { color: Colors.main.background }]}>
              Support{"\n"}<Text style={styles.pieValue}>{HABITCOIN_SYMBOL}{supportValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Text>
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
                  Animated.timing(streakAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
                  Animated.timing(streakAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
                ]).start();
                // Show and animate currency pop-up
                setShowCurrency(true);
                currencyAnim.setValue(0);
                Animated.timing(currencyAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start(() => {
                  setShowCurrency(false);
                });
              } else {
                // Animate streak shrink (scale down)
                Animated.sequence([
                  Animated.timing(streakAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
                  Animated.timing(streakAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
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
                  disabled={habit.disabled}
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
        {/* Top Supporters Section (neutral card) */}
        <View style={{ paddingHorizontal: 12, marginBottom: 8 }}>
          <GlassCard style={{ backgroundColor: Colors.main.surface }}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>SUPPORTERS</Text>
              <Text style={styles.sectionLink} onPress={() => router.push('/social?tab=portfolio')}>View All →</Text>
            </View>
            {supporters.map((supporter, i) => (
              <SupportCard
                key={i}
                investment={null}
                habitTitle={supporter.name}
                supporting={supporter.supportingHabit}
                profit={supporter.currentValue - supporter.purchasePrice}
                purchasePrice={supporter.purchasePrice}
              />
            ))}
          </GlassCard>
        </View>
        {/* Support Section (neutral card) */}
        <View style={{ paddingHorizontal: 12 }}>
          <GlassCard style={{ backgroundColor: Colors.main.surface }}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>SUPPORTING</Text>
              <Text style={styles.sectionLink} onPress={() => router.push('/social?tab=portfolio')}>View All →</Text>
            </View>
            <View style={{ height: 8 }} />
            {peopleYouSupport.map((supporter, i) => (
              <SupportingCard
                key={i}
                name={supporter.name}
                avatar={supporter.avatar}
                amount={supporter.amount}
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
  headerTitle: {
    color: Colors.main.background,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
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
});
