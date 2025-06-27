export class Customization {
  id?: string;
  userId?: string;
  itemType?: 'titleColor' | 'backgroundTheme' | 'border' | 'icon';
  itemId?: string;
  purchaseDate?: string;
  isActive?: boolean;

  constructor(params: Partial<Customization>) {
    Object.assign(this, params);
  }
} 