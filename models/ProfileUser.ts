import ProfileCustomizations from './ProfileCustomizations';

class ProfileUser {
  name: string;
  avatar: any;
  title: string;
  level: number;
  streak: number;
  supporters: number;
  habitsCompleted: number;
  longestStreak: number;
  customizations: ProfileCustomizations;

  constructor(data: any) {
    this.name = data.name;
    this.avatar = data.avatar;
    this.title = data.title;
    this.level = data.level;
    this.streak = data.streak;
    this.supporters = data.supporters;
    this.habitsCompleted = data.habitsCompleted;
    this.longestStreak = data.longestStreak;
    this.customizations = new ProfileCustomizations(data.customizations);
  }
}

export default ProfileUser; 