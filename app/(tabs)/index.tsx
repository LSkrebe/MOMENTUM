import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TextInput, Keyboard, Pressable, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { Habit } from '../../models/Habit';
import { HabitManager } from '../../models/Habit';
import HabitCard from '../../components/HabitCard';
import { MotivationalCard } from '../../components/MotivationalCard';
import HeaderBar from '../../components/HeaderBar';
import { useFocusEffect } from '@react-navigation/native';
import { GlassCard } from '../../components/GlassCard';

const { width } = Dimensions.get('window');
const BOTTLE_CONTAINER_PADDING = 24;
const BOTTLE_WIDTH = width - BOTTLE_CONTAINER_PADDING * 2;

// Dummy data for UI
const initialHabits = [
  new Habit({ title: 'Morning Run', streakCount: 13, completedToday: false }),
  new Habit({ title: 'Book Read', streakCount: 12, completedToday: false }),
  new Habit({ title: 'Meditation', streakCount: 7, completedToday: false }),
];

// MotivationalMessage and MotivationalMessageManager definitions
export interface MotivationalMessage {
  name: string;
  avatar: any;
  habit: string;
  message: string;
}

export class MotivationalMessageManager {
  private message: MotivationalMessage;

  constructor(initialMessage: MotivationalMessage) {
    this.message = initialMessage;
  }

  getMessage() {
    return this.message;
  }

  setMessage(newMessage: MotivationalMessage) {
    this.message = newMessage;
  }
}

const motivationalMessageManager = new MotivationalMessageManager({
  name: 'Emma Wilson',
  avatar: require('../../assets/images/icon.png'),
  habit: 'Morning Run',
  message: "Keep going! Your consistency inspires me every day. Proud to support your journey!"
});

function getNextMilestone(streak: number) {
  const milestones = [7, 14, 30, 50, 100, 200, 365];
  for (let m of milestones) {
    if (streak < m) return m;
  }
  return milestones[milestones.length - 1];
}

function isToday(dateStr: string | undefined) {
  if (!dateStr) return false;
  return dateStr === new Date().toISOString().slice(0, 10);
}

function NextAchievementCard({ habits }: { habits: Habit[] }) {
  if (!habits.length) return null;
  // 1. Prioritize showing a habit that just hit a milestone today
  let milestoneHabit = null;
  for (let habit of habits) {
    const next = getNextMilestone(habit.streakCount);
    if (
      habit.lastMilestoneAchieved === habit.streakCount &&
      isToday(habit.lastMilestoneDate)
    ) {
      milestoneHabit = { habit, next: habit.streakCount };
      break;
    }
  }
  // 2. Otherwise, show the closest to next milestone (not already at a milestone)
  let best = null;
  let minDiff = Infinity;
  if (!milestoneHabit) {
    for (let habit of habits) {
      const next = getNextMilestone(habit.streakCount);
      const diff = next - habit.streakCount;
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        best = { habit, next };
      }
    }
  }
  // 3. If all habits are at a milestone but not today, show the one that just hit it
  if (!milestoneHabit && !best) {
    for (let habit of habits) {
      const next = getNextMilestone(habit.streakCount);
      if (habit.streakCount === next) {
        best = { habit, next };
        break;
      }
    }
  }
  const show = milestoneHabit || best;
  if (!show) return null;
  const { habit, next } = show;
  const progress = Math.min(habit.streakCount / next, 1);

  // Animated progress bar
  const animated = React.useRef(new Animated.Value(progress)).current;
  const pulse = React.useRef(new Animated.Value(1)).current;
  const messageOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
    if (progress === 1) {
      // Pulse animation
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 180, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
      // Fade in message
      Animated.timing(messageOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    } else {
      messageOpacity.setValue(0);
    }
  }, [progress, habit.streakCount, habit.completedToday, habit.lastMilestoneAchieved, habit.lastMilestoneDate]);

  return (
    <View style={{
      backgroundColor: Colors.main.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: Colors.main.border,
      marginBottom: 18,
      shadowColor: Colors.main.accentSoft,
      shadowOpacity: 0.10,
      shadowRadius: 16,
      elevation: 4,
      overflow: 'hidden',
    }}>
      <Text style={{ color: Colors.main.textPrimary, fontWeight: 'bold', fontSize: 15, marginBottom: 6 }}>
        Next Achievement
      </Text>
      <Text style={{ color: Colors.main.textSecondary, fontSize: 13, marginBottom: 8 }}>
        {habit.title}: {habit.streakCount}D → {next}D
      </Text>
      <View style={{ height: 8, backgroundColor: Colors.main.surface, borderRadius: 4, overflow: 'hidden', marginBottom: 4 }}>
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <Animated.View style={{
            width: animated.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            height: 8,
            backgroundColor: Colors.main.accent,
            borderRadius: 4,
          }} />
        </Animated.View>
      </View>
      <View style={{ minHeight: 18 }}>
        <Animated.Text style={{ color: Colors.main.textSecondary, fontSize: 12, opacity: progress === 1 ? messageOpacity : 0, marginBottom: 2, position: 'absolute', left: 0, right: 0 }}>
          Milestone achieved!
        </Animated.Text>
        <Text style={{ color: Colors.main.textSecondary, fontSize: 12, opacity: progress === 1 ? 0 : 1, marginBottom: 2 }}>
          {next - habit.streakCount} days to next milestone
        </Text>
      </View>
    </View>
  );
}

export default function HabitsTab() {
  const insets = useSafeAreaInsets();
  const [manager] = useState(() => new HabitManager(initialHabits));
  const [version, setVersion] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [actionedIndex, setActionedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    manager.toggleHabit(index);
    setVersion(v => v + 1); // force re-render
  };

  const handleDeleteHabit = (index: number) => {
    manager.habits.splice(index, 1);
    setActionedIndex(null);
    setEditingIndex(null);
    setVersion(v => v + 1);
  };

  const handleEditHabit = (index: number) => {
    setEditingIndex(index);
    setInputValue(manager.habits[index].title);
    setActionedIndex(null);
    setVersion(v => v + 1);
  };

  const handleAddHabit = () => {
    setActionedIndex(null);
    const newIndex = manager.addHabit('');
    setEditingIndex(newIndex);
    setInputValue('');
    setVersion(v => v + 1);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleInputBlur = (index: number) => {
    if (inputValue.trim() !== '') {
      manager.habits[index].title = inputValue.trim();
      setEditingIndex(null);
      setInputValue('');
      setVersion(v => v + 1);
    } else {
      // Remove the habit if the title is empty
      manager.habits.splice(index, 1);
      setEditingIndex(null);
      setInputValue('');
      setVersion(v => v + 1);
    }
  };

  // Close action icons when switching tabs
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setActionedIndex(null);
      };
    }, [])
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom }}>
                <Pressable
          onPress={() => { if (actionedIndex !== null) setActionedIndex(null); }}
          style={{ flex: 1 }}
        >
        <HeaderBar title="HABITS" />
        {/* Next Achievement Card */}
        <View style={{ paddingHorizontal: 12, marginTop: 18 }}>
          <NextAchievementCard habits={manager.getHabits()} />
        </View>
        {/* Habits List */}
        <View style={{ paddingHorizontal: 24, marginTop: 18, marginBottom: 8 }}>
          {manager.getHabits().map((habit: Habit, i: number) => (
            <HabitCard
                key={i}
              habit={habit}
              onToggle={() => handleToggle(i)}
              bottleWidth={BOTTLE_WIDTH}
              editable={editingIndex === i}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onInputBlur={() => handleInputBlur(i)}
              onLongPress={() => setActionedIndex(i)}
              showActions={actionedIndex === i}
              onDelete={() => handleDeleteHabit(i)}
              onEdit={() => handleEditHabit(i)}
              />
            ))}
          {/* Add Habit Button UI */}
          <View style={{ marginTop: 8, alignItems: 'center' }}>
            <Text
              style={{ color: Colors.main.accent, fontSize: 14, fontWeight: 'bold' }}
              onPress={handleAddHabit}
            >
              Add Habit
            </Text>
          </View>
        </View>
        {/* Motivational Card from a Supporter */}
        <View style={{ paddingHorizontal: 12, marginTop: 18, marginBottom: 18 }}>
          <MotivationalCard {...motivationalMessageManager.getMessage()} />
        </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.main.background,
  },
});
