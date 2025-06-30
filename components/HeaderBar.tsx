import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface HeaderBarProps {
  title: string;
}

export default function HeaderBar({ title }: HeaderBarProps) {
  return (
    <View style={[styles.headerBg, { backgroundColor: Colors.main.accent }]}> 
      <View style={styles.headerRow}>
        <Image source={require('../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>{title}</Text>
        </View>
        <View style={{ width: 32, height: 32 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: Colors.main.accent,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 18,
    paddingHorizontal: 18,
    paddingTop: 8,
    marginBottom: 8,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    color: Colors.main.background,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
}); 