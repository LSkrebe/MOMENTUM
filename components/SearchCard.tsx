import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface SearchCardProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ value, onChangeText, onFocus, onBlur }) => {
  return (
    <View style={styles.searchCard}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users, habits..."
        placeholderTextColor={Colors.main.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  searchInput: {
    color: Colors.main.textPrimary,
    fontSize: 14,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default SearchCard; 