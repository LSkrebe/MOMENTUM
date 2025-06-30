class InventoryItem {
  id: string;
  name: string;
  type: string;
  icon: any;
  equipped: boolean;
  rarity: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.icon = data.icon;
    this.equipped = data.equipped || false;
    this.rarity = data.rarity || 'Common';
  }
}

export default InventoryItem; 