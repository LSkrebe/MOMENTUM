import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Investment } from '../models/Investment';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface InvestmentCardProps {
  investment: Investment;
  habitTitle: string;
  profit: number;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, habitTitle, profit }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{habitTitle}</Text>
    <Text style={styles.value}>Shares: {investment.sharesOwned}</Text>
    <Text style={styles.value}>Current Value: {HABITCOIN_SYMBOL}{investment.purchasePrice}</Text>
    <Text style={[styles.profit, { color: profit >= 0 ? 'green' : 'red' }]}>Profit: {profit >= 0 ? '+' : ''}{HABITCOIN_SYMBOL}{profit}</Text>
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
  profit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
}); 