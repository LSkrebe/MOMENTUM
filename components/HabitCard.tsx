import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit } from '../models/Habit';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface HabitCardProps {
  habit: Habit;
  onComplete?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{habit.title}</Text>
    <Text style={styles.value}>Current Value: {HABITCOIN_SYMBOL}{habit.currentPrice}</Text>
    <Text style={styles.streak}>Streak: {habit.streakCount} days</Text>
    <TouchableOpacity style={styles.button} onPress={onComplete}>
      <Text style={styles.buttonText}>Complete Habit</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  value: {
    fontSize: 16,
    color: Colors.light.tint,
    marginVertical: 4,
  },
  streak: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 