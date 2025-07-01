import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TextInput, Keyboard, Pressable, Animated, Alert, Modal, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { Habit } from '../../models/Habit';
import { HabitManager } from '../../models/Habit';
import HabitCard from '../../components/HabitCard';
import { MotivationalCard } from '../../components/MotivationalCard';
import { GlassCard } from '../../components/GlassCard';
import { isToday } from '../../utils/date';
import { MotivationalMessageManager } from '../../models/MotivationalMessage';
import { useFocusEffect } from '@react-navigation/native';

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

const motivationalMessageManager = new MotivationalMessageManager({
  name: 'Emma Wilson',
  avatar: require('../../assets/images/icon.png'),
  habit: 'Morning Run',
  message: "Keep going! Your consistency inspires me every day. Proud to support your journey!"
});

function NextAchievementCard({ habits, manager }: { habits: Habit[], manager: any }) {
  if (!habits.length) return null;
  const show = manager.getNextAchievementHabit();
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
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <Text style={{ color: Colors.main.textPrimary, fontWeight: 'bold', fontSize: 15 }}>
          Next Achievement
        </Text>
        <Text style={{ color: Colors.main.accent, fontWeight: 'bold', fontSize: 13 }}>
          {/* Placeholder supporters count, replace with habit.supporters if available */}
          123 Supporters
        </Text>
      </View>
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
  const [confirmUncheckIdx, setConfirmUncheckIdx] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    const habit = manager.getHabits()[index];
    if (habit.completedToday) {
      setConfirmUncheckIdx(index);
    } else {
      manager.toggleHabit(index);
      setVersion(v => v + 1);
    }
  };

  const handleConfirmUncheck = () => {
    if (confirmUncheckIdx !== null) {
      manager.toggleHabit(confirmUncheckIdx);
      setVersion(v => v + 1);
      setConfirmUncheckIdx(null);
    }
  };

  const handleCancelUncheck = () => {
    setConfirmUncheckIdx(null);
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

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setActionedIndex(null);
      };
    }, [])
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}> 
      {/* Sticky Header */}
      <View style={[styles.header, { backgroundColor: Colors.main.accent, position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }]}> 
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>HABITS</Text>
          </View>
          <View style={{ width: 32, height: 32 }} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70 + insets.top, paddingBottom: insets.bottom }}
      >
        <Pressable
          onPress={() => { if (actionedIndex !== null) setActionedIndex(null); }}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal: 12, marginTop: 0 }}>
            {/* Next Achievement Card */}
            <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
              <NextAchievementCard habits={manager.getHabits()} manager={manager} />
            </GlassCard>
            {/* Habits List */}
            <View style={{ marginTop: 18, marginBottom: 8 }}>
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
            <GlassCard style={{ backgroundColor: Colors.main.surface, marginTop: 18, marginBottom: 18 }}>
              <MotivationalCard {...motivationalMessageManager.getMessage()} />
            </GlassCard>
          </View>
        </Pressable>
      </ScrollView>
      {/* Custom Modal for Uncheck Confirmation */}
      <Modal
        visible={confirmUncheckIdx !== null}
        transparent
        animationType="fade"
        onRequestClose={handleCancelUncheck}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>
            <Text style={modalStyles.title}>Uncheck Habit?</Text>
            <Text style={modalStyles.message}>Are you sure you want to uncheck this habit for today?</Text>
            <View style={modalStyles.buttonRow}>
              <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancelUncheck}>
                <Text style={modalStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.uncheckButton} onPress={handleConfirmUncheck}>
                <Text style={modalStyles.uncheckButtonText}>Uncheck</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
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
});

const modalStyles = StyleSheet.create({
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
  },
  title: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: Colors.main.textSecondary,
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
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
  uncheckButton: {
    flex: 1,
    backgroundColor: Colors.main.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  uncheckButtonText: {
    color: Colors.main.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
