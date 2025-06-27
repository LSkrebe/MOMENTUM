import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investment } from '../models/Investment';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface InvestmentCardProps {
  investment: Investment;
  habitTitle: string;
  profit: number;
  percent: number;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, habitTitle, profit, percent }) => {
  const isGain = profit >= 0;
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{habitTitle}</Text>
        <Text style={[styles.percent, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}> {isGain ? '▲' : '▼'} {percent}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{HABITCOIN_SYMBOL}{investment.purchasePrice}</Text>
        <Text style={[styles.profit, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}> {isGain ? '+' : ''}{HABITCOIN_SYMBOL}{profit}</Text>
      </View>
      <Text style={styles.shares}>Shares: {investment.sharesOwned}</Text>
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
    fontSize: 17,
    fontWeight: '600',
    color: Colors.main.textPrimary,
  },
  percent: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.main.accent,
  },
  profit: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shares: {
    fontSize: 14,
    color: Colors.main.textPrimary,
    marginTop: 2,
  },
}); 