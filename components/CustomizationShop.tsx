import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SHOP_ITEMS } from '../constants/Shop';
import Colors from '../constants/Colors';

export const CustomizationShop: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Customization Shop</Text>
    <Text style={styles.section}>Title Colors</Text>
    {SHOP_ITEMS.titleColors.map(item => (
      <Text key={item.name} style={{ color: item.color, marginVertical: 2 }}>{item.name}: {item.price}Ⱨ</Text>
    ))}
    <Text style={styles.section}>Background Themes</Text>
    {SHOP_ITEMS.backgroundThemes.map(item => (
      <Text key={item.name} style={{ marginVertical: 2 }}>{item.name}: {item.price}Ⱨ</Text>
    ))}
    <Text style={styles.section}>Borders</Text>
    {SHOP_ITEMS.borders.map(item => (
      <Text key={item.name} style={{ marginVertical: 2 }}>{item.name}: {item.price}Ⱨ</Text>
    ))}
    <Text style={styles.section}>Custom Icons</Text>
    {SHOP_ITEMS.customIcons.map(item => (
      <Text key={item.name} style={{ marginVertical: 2 }}>{item.name}: {item.price}Ⱨ</Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.main.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.main.textPrimary,
    marginBottom: 8,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.main.accent,
    marginTop: 10,
  },
}); 