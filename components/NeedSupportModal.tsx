import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

interface NeedSupportModalProps {
  visible: boolean;
  habits: { id: string; title: string }[];
  selectedHabitId?: string;
  onSelectHabit: (id: string) => void;
  message: string;
  onChangeMessage: (msg: string) => void;
  onSend: () => void;
  onCancel: () => void;
  step: 1 | 2;
  onBack?: () => void;
}

const NeedSupportModal: React.FC<NeedSupportModalProps> = ({
  visible,
  habits,
  selectedHabitId,
  onSelectHabit,
  message,
  onChangeMessage,
  onSend,
  onCancel,
  step,
  onBack,
}) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible && step === 2 && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible, step]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Need Support</Text>
          {step === 1 && (
            <>
              <Text style={styles.label}>Select a Habit</Text>
              <View style={styles.pickerContainer}>
                {habits.map(habit => (
                  <TouchableOpacity
                    key={habit.id}
                    style={[styles.pickerItem, styles.pickerItemFullWidth, selectedHabitId === habit.id && styles.pickerItemSelected]}
                    onPress={() => onSelectHabit(habit.id)}
                  >
                    <Text style={[styles.pickerItemText, selectedHabitId === habit.id && styles.pickerItemTextSelected]}>
                      {habit.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="How can others help?"
                placeholderTextColor={Colors.main.textSecondary}
                value={message}
                onChangeText={onChangeMessage}
                multiline
                textAlignVertical="top"
                textAlign="left"
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
                  <Text style={styles.cancelButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]}
                  onPress={onSend}
                  disabled={!message.trim()}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 18,
    padding: 28,
    width: 320,
    alignItems: 'center',
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  title: {
    color: Colors.main.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    color: Colors.main.textSecondary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  pickerItem: {
    backgroundColor: Colors.main.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.main.border,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  pickerItemSelected: {
    backgroundColor: Colors.main.accent,
    borderColor: Colors.main.accent,
  },
  pickerItemText: {
    color: Colors.main.textSecondary,
    fontSize: 15,
  },
  pickerItemTextSelected: {
    color: Colors.main.textPrimary, // lighter color for selected habit text
    fontWeight: 'bold',
  },
  pickerItemFullWidth: {
    width: '100%',
    marginRight: 0,
  },
  input: {
    width: '100%',
    minHeight: 80,
    backgroundColor: Colors.main.surface,
    color: Colors.main.textPrimary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.main.border,
    padding: 12,
    fontSize: 15,
    marginBottom: 18,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.main.surface,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  cancelButtonText: {
    color: Colors.main.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sendButton: {
    flex: 1,
    backgroundColor: Colors.main.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: Colors.main.textPrimary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default NeedSupportModal; 