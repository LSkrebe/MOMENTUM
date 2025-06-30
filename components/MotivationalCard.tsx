import React from 'react';
import { View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';

export function MotivationalCard({ name, avatar, habit, message }: { name: string, avatar: any, habit: string, message: string }) {
  return (
    <View style={{
      backgroundColor: Colors.main.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.main.border,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      shadowColor: Colors.main.accentSoft,
      shadowOpacity: 0.10,
      shadowRadius: 16,
      elevation: 4,
    }}>
      <View style={{
        backgroundColor: Colors.main.accent,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Image source={avatar} style={{ width: 40, height: 40, borderRadius: 20 }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.main.textPrimary, fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>{name}</Text>
        <Text style={{ color: Colors.main.textSecondary, fontSize: 14, marginBottom: 8 }}>{habit}</Text>
        <Text style={{ color: Colors.main.textSecondary, fontSize: 14, fontStyle: 'italic' }}>
          "{message}"
        </Text>
      </View>
    </View>
  );
} 