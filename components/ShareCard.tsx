import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

interface ShareCardProps {
  onBecomeFeatured?: () => void;
  onNeedSupport?: () => void;
  onFourthAction?: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({
  onBecomeFeatured,
  onNeedSupport,
  onFourthAction,
}) => (
  <View style={styles.buttonGrid}>
    <TouchableOpacity style={styles.button} onPress={onBecomeFeatured}>
      <Text style={styles.buttonText}>Share Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onNeedSupport}>
      <Text style={styles.buttonText}>Need Support</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onFourthAction}>
      <Text style={styles.buttonText}>Invite Friend</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  button: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.main.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
    alignItems: 'center',
    marginBottom: 0,
  },
  buttonText: {
    color: Colors.main.accent,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShareCard; 