import { User } from './User';

export default class LeaderboardManager {
  leaderboardUsers: User[];
  constructor() {
    this.leaderboardUsers = [
      new User({ name: 'Alex Thompson', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 120, longestStreak: 15, supportAccuracy: 95, habitCoinsEarned: 5000 } }),
      new User({ name: 'Sarah Chen', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 110, longestStreak: 12, supportAccuracy: 92, habitCoinsEarned: 4800 } }),
      new User({ name: 'Mike Rodriguez', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 105, longestStreak: 10, supportAccuracy: 90, habitCoinsEarned: 4700 } }),
      new User({ name: 'Emma Wilson', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 100, longestStreak: 9, supportAccuracy: 88, habitCoinsEarned: 4600 } }),
      new User({ name: 'David Kim', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 98, longestStreak: 8, supportAccuracy: 87, habitCoinsEarned: 4500 } }),
      new User({ name: 'Lisa Park', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 95, longestStreak: 7, supportAccuracy: 85, habitCoinsEarned: 4400 } }),
      new User({ name: 'James Thompson', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 93, longestStreak: 6, supportAccuracy: 84, habitCoinsEarned: 4300 } }),
      new User({ name: 'Maria Rodriguez', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 90, longestStreak: 5, supportAccuracy: 82, habitCoinsEarned: 4200 } }),
      new User({ name: 'Chris Johnson', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 88, longestStreak: 4, supportAccuracy: 80, habitCoinsEarned: 4100 } }),
      new User({ name: 'Anna Lee', profileImage: require('../assets/images/icon.png'), stats: { habitsCompleted: 85, longestStreak: 3, supportAccuracy: 78, habitCoinsEarned: 4000 } }),
    ];
  }
  getLeaderboardUsers() { return this.leaderboardUsers; }
} 