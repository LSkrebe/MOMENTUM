import { User } from './User';
import { Habit } from './Habit';

// SocialManager: Handles friends, recommendations, trending categories, featured, and stories
export default class SocialManager {
  friendsHabits: Habit[];
  friends: User[];
  recommendations: User[];
  trendingCategories: { name: string; trend: string; color: string }[];
  featuredProfile: User;
  successStory: {
    user: User;
    habit: string;
    streak: number;
    totalEarned: number;
    story: string;
    supporters: number;
    currentValue: number;
  };

  constructor() {
    // Users
    this.friends = [
      new User({ id: '1', name: 'Sarah Chen', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '2', name: 'Mike Rodriguez', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '3', name: 'Lisa Park', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '4', name: 'David Kim', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '5', name: 'Emma Wilson', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '6', name: 'James Thompson', profileImage: require('../assets/images/icon.png') }),
    ];
    // Habits
    this.friendsHabits = [
      new Habit({ id: '1', userId: '1', title: 'Morning Run', streakCount: 23 }),
      new Habit({ id: '2', userId: '2', title: 'Coding Practice', streakCount: 67 }),
      new Habit({ id: '3', userId: '3', title: 'Meditation', streakCount: 12 }),
      new Habit({ id: '4', userId: '4', title: 'Reading', streakCount: 45 }),
      new Habit({ id: '5', userId: '5', title: 'Yoga Flow', streakCount: 8 }),
      new Habit({ id: '6', userId: '6', title: 'Healthy Cooking', streakCount: 15 }),
    ];
    // Recommendations
    this.recommendations = [
      new User({ id: '5', name: 'Emma Wilson', profileImage: require('../assets/images/icon.png') }),
      new User({ id: '6', name: 'James Thompson', profileImage: require('../assets/images/icon.png') }),
    ];
    // Trending
    this.trendingCategories = [
      { name: 'Fitness', trend: '+12.5%', color: '#4CAF50' },
      { name: 'Learning', trend: '+8.3%', color: '#2196F3' },
      { name: 'Wellness', trend: '+15.2%', color: '#9C27B0' },
      { name: 'Productivity', trend: '+6.7%', color: '#FF9800' },
    ];
    // Featured
    this.featuredProfile = new User({
      name: 'Alex Thompson',
      profileImage: require('../assets/images/icon.png'),
      bio: 'Top habit performer this month with incredible consistency across multiple categories.',
    });
    // Success Story
    this.successStory = {
      user: new User({ name: 'Maria Rodriguez', profileImage: require('../assets/images/icon.png') }),
      habit: 'Daily Meditation',
      streak: 100,
      totalEarned: 3240,
      story: "I never thought I could maintain a meditation practice for 100 days straight. The support from this community kept me going through the toughest days. Now I can't imagine my life without this daily ritual. Thank you to everyone who believed in me!",
      supporters: 234,
      currentValue: 89,
    };
  }
  getFriendHabits() { return this.friendsHabits; }
  getFriends() { return this.friends; }
  getRecommendations() { return this.recommendations; }
  getTrendingCategories() { return this.trendingCategories; }
  getFeaturedProfile() { return this.featuredProfile; }
  getSuccessStory() { return this.successStory; }
} 