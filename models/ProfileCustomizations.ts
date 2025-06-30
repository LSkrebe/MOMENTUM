import Colors from '../constants/Colors';

class ProfileCustomizations {
  badges: string[];

  constructor(data: any) {
    this.badges = data.badges || [];
  }
}

export default ProfileCustomizations; 