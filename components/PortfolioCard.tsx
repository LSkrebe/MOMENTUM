import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
// Import the correct type for investment if available
// import { Investment } from '../models/Investment';

const PortfolioCard = ({ investment }: { investment: any }) => {
  const isGain = investment.profit >= 0;
  return (
    <View style={styles.portfolioCard}>
      <View style={styles.portfolioHeader}>
        <View style={styles.portfolioInvestorInfo}>
          <Image source={investment.avatar} style={styles.portfolioAvatar} />
          <View>
            <Text style={styles.portfolioName}>{investment.name}</Text>
            <Text style={styles.portfolioHabit}>{investment.habit}</Text>
          </View>
        </View>
        <View style={styles.portfolioProfitContainer}>
          <Text style={[styles.portfolioProfitAmount, { color: isGain ? Colors.main.accent : Colors.main.textSecondary }]}> 
            {HABITCOIN_SYMBOL}{Math.abs(investment.profit)} {isGain ? '▲' : '▼'}
          </Text>
        </View>
      </View>
      <View style={styles.portfolioValues}>
        <Text style={styles.portfolioInvested}>{HABITCOIN_SYMBOL}{investment.invested}</Text>
        <Text style={styles.portfolioCurrent}>{HABITCOIN_SYMBOL}{investment.currentValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  portfolioCard: {
    backgroundColor: Colors.main.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  portfolioInvestorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  portfolioName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.main.textPrimary,
  },
  portfolioHabit: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
  portfolioProfitContainer: {
    alignItems: 'flex-end',
  },
  portfolioProfitAmount: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  portfolioValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  portfolioInvested: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
  portfolioCurrent: {
    fontSize: 13,
    color: Colors.main.textSecondary,
  },
});

export default PortfolioCard; 