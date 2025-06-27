import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit } from '../models/Habit';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface HabitCardProps {
  habit: Habit;
  onComplete?: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onComplete }) => {
  let status = 'due';
  let statusColor = Colors.main.accent;
  let statusText = 'DUE';
  if (habit.completedToday) {
    status = 'completed';
    statusColor = Colors.main.accent;
    statusText = 'COMPLETED';
  } else if (habit.missedToday) {
    status = 'missed';
    statusColor = Colors.main.textSecondary;
    statusText = 'MISSED';
  }
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{habit.title}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{statusText}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{HABITCOIN_SYMBOL}{habit.currentPrice}</Text>
        <Text style={styles.streak}>🔥 {habit.streakCount}d</Text>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: status === 'completed' ? Colors.main.accent : Colors.main.accent }]} onPress={onComplete} disabled={status === 'completed'}>
        <Text style={styles.buttonText}>{status === 'completed' ? 'Done' : 'Mark Complete'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.main.textPrimary,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.main.accent,
  },
  streak: {
    fontSize: 15,
    color: Colors.main.accent,
    fontWeight: '500',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 