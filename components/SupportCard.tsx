import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Support } from '../models/Support';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';

interface SupportCardProps {
  investment?: any;
  habitTitle: string;
  supporting: string;
  profit: number;
  purchasePrice: number;
}

export const SupportCard = ({ investment, habitTitle, supporting, profit, purchasePrice }: SupportCardProps) => {
  const isGain = profit >= 0;
  const chart = isGain ? ['/', '/', '/'] : ['\\', '\\', '\\'];
  const value = investment?.currentValue ?? purchasePrice + profit;

  // Animated value logic
  const animatedValue = useRef(new Animated.Value(value)).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [value]);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(value);
    });
    return () => animatedValue.removeListener(listener);
  }, [animatedValue]);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{habitTitle}</Text>
        <Text style={[styles.percent, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}> {HABITCOIN_SYMBOL}{Math.abs(profit)} {isGain ? '▲' : '▼'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{HABITCOIN_SYMBOL}{displayValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <Text style={styles.shares}>{supporting}</Text>
      <View style={styles.chartWrap} pointerEvents="none">
        {chart.map((c, i) => (
          <Text key={i} style={[styles.chartLine, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}>{c}</Text>
        ))}
      </View>
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
  chartWrap: { position: 'absolute', right: 12, bottom: 10, flexDirection: 'row', alignItems: 'flex-end' },
  chartLine: { fontSize: 18, marginLeft: 1, marginRight: 1, fontWeight: 'bold' },
  purchasePrice: {
    fontSize: 14,
    color: Colors.main.textPrimary,
    marginTop: 2,
  },
}); 