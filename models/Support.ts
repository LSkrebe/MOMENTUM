export class Support {
  id?: string;
  supporterId?: string;
  habitId?: string;
  sharesOwned?: number;
  purchasePrice?: number;
  purchaseDate?: string;

  constructor(params: Partial<Support>) {
    Object.assign(this, params);
  }
} 