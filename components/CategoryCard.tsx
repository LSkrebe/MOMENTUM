import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CategoryCard = ({ category }: { category: { name: string; trend: string; color: string } }) => (
  <Pressable style={styles.categoryCard}>
    <Text style={styles.categoryName}>{category.name}</Text>
    <Text style={[styles.categoryTrend, { color: Colors.main.accent }]}>{category.trend}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.main.border,
    flex: 1,
    minWidth: '48%',
  },
  categoryName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryTrend: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryCard; 