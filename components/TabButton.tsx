import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
}

const TabButton: React.FC<TabButtonProps> = ({
  title,
  isActive,
  onPress,
  style,
  textStyle,
  activeStyle,
  activeTextStyle,
}) => (
  <Pressable
    style={[styles.tabButton, style, isActive && [styles.activeTabButton, activeStyle]]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, textStyle, isActive && [styles.activeTabText, activeTextStyle]]}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#8EB69B', // fallback, override with props if needed
  },
  tabText: {
    color: '#8EB69B', // fallback, override with props if needed
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#051F20', // fallback, override with props if needed
  },
});

export default TabButton; 