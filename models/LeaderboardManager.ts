import { User } from './User';

export default class LeaderboardManager {
  leaderboardUsers: User[];
  constructor() {
    this.leaderboardUsers = [
      new User({ name: 'Alex Thompson', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Sarah Chen', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Mike Rodriguez', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Emma Wilson', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'David Kim', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Lisa Park', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'James Thompson', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Maria Rodriguez', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Chris Johnson', profileImage: require('../assets/images/icon.png') }),
      new User({ name: 'Anna Lee', profileImage: require('../assets/images/icon.png') }),
    ];
  }
  getLeaderboardUsers() { return this.leaderboardUsers; }
} 