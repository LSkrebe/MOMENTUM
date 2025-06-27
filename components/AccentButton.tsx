import React from 'react';
import { Pressable, Text, StyleSheet, Animated } from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';

interface AccentButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: any;
}

export const AccentButton: React.FC<AccentButtonProps> = ({ title, onPress, icon, style }) => {
  const scale = new Animated.Value(1);
  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };
  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [styles.button, style, pressed && { opacity: 0.85 }]}
    >
      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', transform: [{ scale }] }}>
        {icon && <>{icon}</>}
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.main.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    shadowColor: Colors.main.accent,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 120,
  },
  text: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    letterSpacing: 0.5,
    fontFamily: Typography.fontFamily.primary,
  },
}); 