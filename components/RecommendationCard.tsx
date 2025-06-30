import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { User } from '../models/User';

function getImageSource(img: any) {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
}

const RecommendationCard = ({ user, onSupport }: { user: User, onSupport: (user: User) => void }) => (
  <Pressable style={styles.recommendationCard} onPress={() => onSupport(user)}>
    <View style={styles.recommendationHeader}>
      <View style={styles.recommendationLeftContent}>
        <Image source={getImageSource(user.profileImage)} style={styles.recommendationAvatar} />
        <View>
          <Text style={styles.recommendationName}>{user.name}</Text>
          <Text style={styles.recommendationHabit}>Habit</Text>
          <Text style={styles.recommendationReason}>Consistent streaks</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  recommendationCard: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  recommendationLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recommendationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recommendationName: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  recommendationHabit: {
    color: Colors.main.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  recommendationReason: {
    color: Colors.main.textSecondary,
    fontSize: 12,
    marginBottom: 0,
  },
});

export default RecommendationCard; 