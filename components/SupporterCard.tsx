import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
// Import the correct type for supporter if available
// import { Supporter } from '../models/Support';

const SupporterCard = ({ supporter }: { supporter: any }) => {
  const isGain = supporter.profit >= 0;
  return (
    <View style={styles.supporterCard}>
      <View style={styles.supporterHeader}>
        <View style={styles.supporterInfo}>
          <Image source={supporter.avatar} style={styles.supporterAvatar} />
          <View>
            <Text style={styles.supporterName}>{supporter.name}</Text>
            <Text style={styles.supporterHabit}>{supporter.habit}</Text>
          </View>
        </View>
        <View style={styles.supporterProfitContainer}>
          <Text style={[styles.supporterProfitAmount, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}> 
            {HABITCOIN_SYMBOL}{Math.abs(supporter.profit)} {isGain ? '▲' : '▼'}
          </Text>
        </View>
      </View>
      <View style={styles.supporterDetails}>
        <Text style={styles.supporterDate}>{supporter.supportDate}</Text>
        <Text style={styles.supporterCurrent}>{HABITCOIN_SYMBOL}{supporter.currentValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  supporterCard: {
    backgroundColor: Colors.main.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  supporterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  supporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supporterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  supporterName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.main.textPrimary,
  },
  supporterHabit: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
  supporterProfitContainer: {
    alignItems: 'flex-end',
  },
  supporterProfitAmount: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  supporterDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  supporterDate: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
  supporterCurrent: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
});

export default SupporterCard; 