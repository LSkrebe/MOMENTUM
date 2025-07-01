import { User } from './User';

export default class LeaderboardManager {
  leaderboardUsers: User[];
  constructor() {
    this.leaderboardUsers = [
      new User({ id: '2', name: 'Sarah Chen', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 120, habitsCompleted: 1000 } }),
      new User({ id: '3', name: 'Mike Rodriguez', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 110, habitsCompleted: 950 } }),
      new User({ id: '4', name: 'Lisa Park', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 105, habitsCompleted: 900 } }),
      new User({ id: '5', name: 'David Kim', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 100, habitsCompleted: 850 } }),
      new User({ id: '6', name: 'Emma Wilson', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 95, habitsCompleted: 800 } }),
      new User({ id: '7', name: 'James Thompson', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 90, habitsCompleted: 750 } }),
      new User({ id: '8', name: 'Maria Rodriguez', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 85, habitsCompleted: 700 } }),
      new User({ id: '9', name: 'John Lee', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 80, habitsCompleted: 650 } }),
      new User({ id: '10', name: 'Sophia Brown', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 75, habitsCompleted: 600 } }),
      new User({ id: '11', name: 'Olivia Green', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 70, habitsCompleted: 550 } }),
      new User({ id: '1', name: 'Alex Thompson', profileImage: require('../assets/images/icon.png'), stats: { longestStreak: 67, habitsCompleted: 1247 } }),
    ];
  }
  getLeaderboardUsers() { return this.leaderboardUsers; }
} 