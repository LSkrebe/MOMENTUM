export class Investment {
  id?: string;
  investorId?: string;
  habitId?: string;
  sharesOwned?: number;
  purchasePrice?: number;
  purchaseDate?: string;

  constructor(params: Partial<Investment>) {
    Object.assign(this, params);
  }
} 