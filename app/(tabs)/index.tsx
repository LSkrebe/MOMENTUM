import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TextInput, Keyboard, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { Habit } from '../../models/Habit';
import { HabitManager } from '../../models/HabitManager';
import HabitCard from '../../components/HabitCard';
import { MotivationalCard } from '../../components/MotivationalCard';
import HeaderBar from '../../components/HeaderBar';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const BOTTLE_CONTAINER_PADDING = 24;
const BOTTLE_WIDTH = width - BOTTLE_CONTAINER_PADDING * 2;

// Dummy data for UI
const initialHabits = [
  new Habit({ title: 'Morning Run', streakCount: 23, completedToday: true }),
  new Habit({ title: 'Book Read', streakCount: 12, completedToday: false }),
  new Habit({ title: 'Meditation', streakCount: 7, completedToday: false }),
];

const motivationalMessage = {
  name: 'Emma Wilson',
  avatar: require('../../assets/images/icon.png'),
  habit: 'Morning Run',
  message: "Keep going! Your consistency inspires me every day. Proud to support your journey!"
};

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
    }
    setEditingIndex(null);
    setInputValue('');
    setVersion(v => v + 1);
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
        {/* Habits List */}
        <View style={{ paddingHorizontal: BOTTLE_CONTAINER_PADDING, marginTop: 18, marginBottom: 8 }}>
          {manager.getHabits().map((habit, i) => (
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
              style={{ color: Colors.main.accent, fontSize: 18, fontWeight: 'bold' }}
              onPress={handleAddHabit}
            >
              Add Habit
            </Text>
          </View>
        </View>
        {/* Motivational Card from a Supporter */}
        <View style={{ paddingHorizontal: BOTTLE_CONTAINER_PADDING, marginTop: 18, marginBottom: 18 }}>
          <MotivationalCard {...motivationalMessage} />
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
