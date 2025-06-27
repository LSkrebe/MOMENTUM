import React, { ReactNode } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import Colors from '../constants/Colors';

interface GlassCardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, onPress, style }) => {
  const scale = new Animated.Value(1);
  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };
  const card = (
    <Animated.View style={[styles.card, style, { transform: [{ scale }] }]}> 
      {children}
    </Animated.View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ borderRadius: 16 }}>
        {card}
      </Pressable>
    );
  }
  return card;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.main.border,
    overflow: 'hidden',
  },
}); 