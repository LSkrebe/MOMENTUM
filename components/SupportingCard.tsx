import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface SupportingCardProps {
  name: string;
  avatar: any;
  amount: number;
}

export const SupportingCard: React.FC<SupportingCardProps> = ({ name, avatar, amount }) => {
  const isGain = amount >= 0;
  
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={avatar} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.amount, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}>
        {HABITCOIN_SYMBOL}{Math.abs(amount)} {isGain ? '▲' : '▼'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.main.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  name: {
    flex: 1,
    color: Colors.main.textPrimary,
    fontWeight: 'bold',
  },
  amount: {
    fontWeight: 'bold',
  },
}); 