import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Habit } from '../models/Habit';
import { User } from '../models/User';

function getImageSource(img: any) {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
}

const InvestmentCard = ({ habit, user, onSupport }: { habit: Habit, user: User | undefined, onSupport: (habit: Habit) => void }) => {
  return (
    <Pressable style={styles.investmentCard} onPress={() => onSupport(habit)}>
      <View style={styles.investmentHeader}>
        <View style={styles.investorInfo}>
          <Image source={getImageSource(user?.profileImage)} style={styles.avatar} />
          <View>
            <Text style={styles.investorName}>{user?.name}</Text>
            <Text style={styles.habitTitle}>{habit.title}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 0,
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
});

export default InvestmentCard; 