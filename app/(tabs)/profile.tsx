import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, Animated, ImageSourcePropType, Share, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library';
import { GlassCard } from '../../components/GlassCard';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import { HABITCOIN_SYMBOL } from '../../constants/Currency';
import ProfileUser from '../../models/ProfileUser';
import CompleteProfileCard from '../../components/CompleteProfileCard';
import ShareCard from '../../components/ShareCard';
import LeaderboardManager from '../../models/LeaderboardManager';
import LeaderboardCard from '../../components/LeaderboardCard';
import { User } from '../../models/User';
import NeedSupportModal from '../../components/NeedSupportModal';
import ShareStoryModal from '../../components/ShareStoryModal';
import { Habit } from '../../models/Habit';
import SupportEventEmitter from '../../components/SupportEventEmitter';
import ShareableProfileCard from '../../components/ShareableProfileCard';

// Initialize user data
const user = new ProfileUser({
  name: 'Alex Thompson',
  avatar: require('../../assets/images/icon.png'),
  title: 'Habit Tracker',
  level: 42,
  streak: 156,
  supporters: 892,
  habitsCompleted: 1247,
  longestStreak: 67,
  customizations: {
    badges: ['Elite', 'Consistent'],
  }
});

// Helper to map ProfileUser to User
function mapProfileUserToUser(profileUser: ProfileUser): User {
  return new User({
    id: profileUser.name, // or another unique identifier
    name: profileUser.name,
    profileImage: profileUser.avatar,
    bio: profileUser.title,
    stats: {
      habitsCompleted: profileUser.habitsCompleted,
      longestStreak: profileUser.longestStreak,
    },
  });
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const leaderboardManager = new LeaderboardManager();
  const profileCardRef = useRef<ViewShot>(null);

  // Log when component mounts to verify ViewShot ref
  useEffect(() => {
  }, []);

  // Example habits (replace with real user habits if available)
  const userHabits: Habit[] = [
    new Habit({ id: '1', title: 'Morning Run' }),
    new Habit({ id: '2', title: 'Read 10 Pages' }),
    new Habit({ id: '3', title: 'Meditation' }),
  ];

  const [needSupportVisible, setNeedSupportVisible] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<string | undefined>(undefined);
  const [supportMessage, setSupportMessage] = useState('');
  const [needSupportStep, setNeedSupportStep] = useState<1 | 2>(1);

  // Share Story Modal State
  const [shareStoryVisible, setShareStoryVisible] = useState(false);
  const [selectedStoryHabitId, setSelectedStoryHabitId] = useState<string | undefined>(undefined);
  const [storyMessage, setStoryMessage] = useState('');
  const [shareStoryStep, setShareStoryStep] = useState<1 | 2>(1);

  const handleOpenNeedSupport = () => {
    setNeedSupportVisible(true);
    setSelectedHabitId(undefined);
    setSupportMessage('');
    setNeedSupportStep(1);
  };
  const handleOpenShareStory = () => {
    setShareStoryVisible(true);
    setSelectedStoryHabitId(undefined);
    setStoryMessage('');
    setShareStoryStep(1);
  };
  const handleSendNeedSupport = () => {
    // TODO: Implement send logic (e.g., API call)
    // Emit event to notify the social tab
    if (selectedHabitId) {
      const selectedHabit = userHabits.find(h => h.id === selectedHabitId);
      SupportEventEmitter.emit('add-support-request', {
        habitId: selectedHabitId,
        habitTitle: selectedHabit?.title || '',
        comment: supportMessage,
      });
    }
    setNeedSupportVisible(false);
  };
  const handleSendShareStory = () => {
    // TODO: Implement send logic (e.g., API call)
    // Emit event to notify the social tab
    if (selectedStoryHabitId) {
      const selectedHabit = userHabits.find(h => h.id === selectedStoryHabitId);
      SupportEventEmitter.emit('add-success-story', {
        habitId: selectedStoryHabitId,
        habitTitle: selectedHabit?.title || '',
        story: storyMessage,
      });
    }
    setShareStoryVisible(false);
  };
  const handleCancelNeedSupport = () => {
    setNeedSupportVisible(false);
  };
  const handleCancelShareStory = () => {
    setShareStoryVisible(false);
  };
  const handleSelectHabit = (id: string) => {
    setSelectedHabitId(id);
    setNeedSupportStep(2);
  };
  const handleSelectStoryHabit = (id: string) => {
    setSelectedStoryHabitId(id);
    setShareStoryStep(2);
  };
  const handleBackToHabitPicker = () => {
    setNeedSupportStep(1);
    setSupportMessage('');
  };
  const handleBackToStoryHabitPicker = () => {
    setShareStoryStep(1);
    setStoryMessage('');
  };

  const handleInviteFriend = async () => {
    try {
      const result = await Share.share({
        message: 'Join me on MOMENTUM! Build better habits together and support each other on our journey to success. Download the app and let\'s motivate each other! 💪',
        title: 'Invite to MOMENTUM',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleShareProfile = async () => {
    
    try {
      
      if (profileCardRef.current && profileCardRef.current.capture) {
        const uri = await profileCardRef.current.capture();
        
        if (uri) {
          
          // Request permission to save to camera roll
          const { status } = await MediaLibrary.requestPermissionsAsync();
          
          if (status === 'granted') {
            try {
              // Save image to camera roll
              const asset = await MediaLibrary.createAssetAsync(uri);
              
              // Now try to share with the saved image
              const result = await Share.share({
                message: 'Check out my MOMENTUM profile! 🚀',
                url: asset.uri,
                title: 'My MOMENTUM Profile',
              });
              
            } catch (shareError) {
              
              // Fallback to sharing just the message
              await Share.share({
                message: 'Check out my MOMENTUM profile! 🚀\n\nI\'ve been building better habits and would love to connect with you on MOMENTUM!',
                title: 'My MOMENTUM Profile',
              });
            }
          } else {
            
            // Try direct share without saving to camera roll
            try {
              const result = await Share.share({
                message: 'Check out my MOMENTUM profile! 🚀',
                url: uri,
                title: 'My MOMENTUM Profile',
              });
              
            } catch (directShareError) {
              
              // Final fallback to sharing just the message
              await Share.share({
                message: 'Check out my MOMENTUM profile! 🚀\n\nI\'ve been building better habits and would love to connect with you on MOMENTUM!',
                title: 'My MOMENTUM Profile',
              });
            }
          }
          
        } else {
        }
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Sticky Header */}
      <View style={[styles.header, { backgroundColor: Colors.main.accent, position: 'absolute', top: insets.top, left: 0, right: 0, zIndex: 10 }]}>
        <View style={styles.headerRow}>
          <Image source={require('../../assets/images/icon.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.headerTitle, { color: Colors.main.background, textAlign: 'center' }]}>PROFILE</Text>
          </View>
          <View style={{ width: 32, height: 32 }} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 70 + insets.top, paddingBottom: insets.bottom }}
      >
        {/* Profile Content */}
        <View style={{ paddingHorizontal: 12, marginTop: 0 }}>
          {/* Complete Profile Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <CompleteProfileCard user={user} />
          </GlassCard>

          {/* Stats Card */}
          <GlassCard style={{ backgroundColor: Colors.main.surface, marginBottom: 18 }}>
            <ShareCard onBecomeFeatured={handleShareProfile} onNeedSupport={handleOpenNeedSupport} onFourthAction={handleInviteFriend} />
          </GlassCard>

        </View>
      </ScrollView>
      <NeedSupportModal
        visible={needSupportVisible}
        habits={userHabits.map(h => ({ id: h.id || '', title: h.title }))}
        selectedHabitId={selectedHabitId}
        onSelectHabit={handleSelectHabit}
        message={supportMessage}
        onChangeMessage={setSupportMessage}
        onSend={handleSendNeedSupport}
        onCancel={handleCancelNeedSupport}
        step={needSupportStep}
        onBack={handleBackToHabitPicker}
      />
      <ShareStoryModal
        visible={shareStoryVisible}
        habits={userHabits.map(h => ({ id: h.id || '', title: h.title }))}
        selectedHabitId={selectedStoryHabitId}
        onSelectHabit={handleSelectStoryHabit}
        message={storyMessage}
        onChangeMessage={setStoryMessage}
        onSend={handleSendShareStory}
        onCancel={handleCancelShareStory}
        step={shareStoryStep}
        onBack={handleBackToStoryHabitPicker}
      />
      {/* Hidden ShareableProfileCard for image capture */}
      <View style={{ position: 'absolute', left: -1000, top: -1000 }}>
        <ViewShot 
          ref={profileCardRef} 
          options={{ format: 'png', quality: 0.9 }}
        >
          <ShareableProfileCard user={user} />
        </ViewShot>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
  },
  header: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 8,
    marginBottom: 0,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: Colors.main.accentSoft,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  statsTitle: {
    color: Colors.main.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
  },
}); 