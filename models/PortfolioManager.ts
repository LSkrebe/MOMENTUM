import { User } from './User';
import { Habit } from './Habit';
import { Support } from './Support';

export default class PortfolioManager {
  investments: Support[];
  supporters: Support[];
  users: { [id: string]: User };
  habits: { [id: string]: Habit };

  constructor(users: User[], habits: Habit[]) {
    // Map for quick lookup
    this.users = Object.fromEntries(users.map(u => [u.id, u]));
    this.habits = Object.fromEntries(habits.map(h => [h.id, h]));
    // Investments
    this.investments = [
      new Support({ id: '1', supporterId: 'me', habitId: '1', sharesOwned: 10, purchasePrice: 320, purchaseDate: '2024-04-01' }),
      new Support({ id: '2', supporterId: 'me', habitId: '2', sharesOwned: 5, purchasePrice: 210, purchaseDate: '2024-03-15' }),
      new Support({ id: '3', supporterId: 'me', habitId: '3', sharesOwned: 8, purchasePrice: 150, purchaseDate: '2024-02-20' }),
    ];
    // Supporters
    this.supporters = [
      new Support({ id: '4', supporterId: '5', habitId: '1', sharesOwned: 6, purchasePrice: 150, purchaseDate: '2024-03-01' }),
      new Support({ id: '5', supporterId: '6', habitId: '2', sharesOwned: 10, purchasePrice: 200, purchaseDate: '2024-02-10' }),
      new Support({ id: '6', supporterId: '7', habitId: '4', sharesOwned: 4, purchasePrice: 80, purchaseDate: '2024-01-25' }),
    ];
  }
  getInvestments() { return this.investments; }
  getSupporters() { return this.supporters; }
  getUser(id: string) { return this.users[id]; }
  getHabit(id: string) { return this.habits[id]; }
} 