import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Habit } from '../models/Habit';
import Colors from '../constants/Colors';
import { HABITCOIN_SYMBOL } from '../constants/Currency';
import Typography from '../constants/Typography';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HabitCardProps {
  habit: Habit;
  onComplete?: () => void;
  onToggle: () => void;
  bottleWidth?: number;
  editable?: boolean;
  inputValue?: string;
  onInputChange?: (text: string) => void;
  onInputBlur?: () => void;
  onLongPress?: () => void;
  showActions?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onNeedSupport?: () => void;
}

const BOTTLE_HEIGHT = 74;
const BOTTLE_WIDTH = 320; // fallback, should be set by parent

export default function HabitCard({ habit, onComplete, onToggle, bottleWidth = BOTTLE_WIDTH, editable, inputValue, onInputChange, onInputBlur, onLongPress, showActions, onDelete, onEdit, onNeedSupport }: HabitCardProps) {
  const completed = !!habit.completedToday;
  const textColor = completed ? Colors.main.textPrimary : Colors.main.textSecondary;

  // Interpolate color for fill
  const interpolateColor = (animatedColor: Animated.Value) =>
    animatedColor.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.main.accentSoft, Colors.main.accent],
    });

  // --- Streak Animation ---
  const streakAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (habit.completedToday) {
      Animated.sequence([
        Animated.timing(streakAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
        Animated.timing(streakAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(streakAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
        Animated.timing(streakAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  }, [habit.completedToday]);
  // ------------------------

  // Shrink width if actions are shown
  const effectiveWidth = (showActions ? bottleWidth - 120 : bottleWidth) + 25

  return (
    <View style={[
      bottleStyles.bottleWrap,
      {
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        width: showActions ? effectiveWidth : '100%',
        shadowColor: Colors.main.accentSoft,
        shadowOpacity: 0.10,
        shadowRadius: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.main.border,
        overflow: 'visible',
      },
    ]}>
      <Pressable
        style={[
          bottleStyles.bottleOuter,
          { width: showActions ? effectiveWidth : '100%' }
        ]}
        onPress={onToggle}
        onLongPress={onLongPress}
        disabled={habit.disabled}
      >
        <Animated.View
          style={[
            bottleStyles.bottleFill,
            {
              width: habit.animatedFill.interpolate({
                inputRange: [0, 1],
                outputRange: [0, effectiveWidth],
              }),
              backgroundColor: interpolateColor(habit.animatedColor),
            },
          ]}
        />
        <View style={[bottleStyles.bottleGlass, { borderWidth: 0 }]} />
        <View style={bottleStyles.bottleContent} pointerEvents="none">
          <View style={{ flex: 1 }}>
            {editable ? (
              <TextInput
                style={[
                  bottleStyles.bottleLabel,
                  { color: Colors.main.textPrimary, backgroundColor: 'transparent', padding: 0, borderWidth: 0 }
                ]}
                autoFocus
                placeholder="Enter habit name"
                placeholderTextColor={Colors.main.textSecondary}
                value={inputValue}
                onChangeText={onInputChange}
                onBlur={onInputBlur}
                onSubmitEditing={() => { Keyboard.dismiss(); onInputBlur && onInputBlur(); }}
                returnKeyType="done"
              />
            ) : (
              <Text style={[bottleStyles.bottleLabel, { color: textColor }]} numberOfLines={2} ellipsizeMode="tail">{habit.title}</Text>
            )}
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Animated.Text
              style={[
                bottleStyles.bottleStreak,
                { color: textColor, transform: [{ scale: streakAnim }] },
              ]}
            >
              {(habit.streakCount || 0) + 'D'}
            </Animated.Text>
          </View>
        </View>
      </Pressable>
      {showActions && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }} pointerEvents="box-none">
          <TouchableOpacity
            onPress={onEdit}
            style={{ marginRight: 12 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="pencil-outline" size={22} color={Colors.main.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNeedSupport}
            style={{ marginRight: 12 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="add-circle-outline" size={22} color={Colors.main.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={22} color={Colors.main.accent} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const bottleStyles = StyleSheet.create({
  bottleWrap: {
    alignItems: 'center',
    width: '100%',
  },
  bottleOuter: {
    height: BOTTLE_HEIGHT,
    borderRadius: 16,
    backgroundColor: Colors.main.card,
    borderWidth: 1,
    borderColor: Colors.main.border,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 6,
  },
  bottleFill: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '100%',
    borderRadius: 16,
    zIndex: 1,
  },
  bottleGlass: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    borderWidth: 0,
    borderColor: Colors.main.accentSoft,
    zIndex: 2,
  },
  bottleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: BOTTLE_HEIGHT,
    paddingHorizontal: 16,
    zIndex: 3,
  },
  bottleLabel: {
    color: Colors.main.textSecondary,
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: BOTTLE_WIDTH * 0.55,
  },
  bottleStreak: {
    color: Colors.main.textSecondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
}); 