import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const SearchCard = () => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.searchCard}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users, habits, or categories..."
        placeholderTextColor={Colors.main.textSecondary}
        value={value}
        onChangeText={setValue}
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