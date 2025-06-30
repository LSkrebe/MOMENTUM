import Colors from '../constants/Colors';
import { ImageSourcePropType } from 'react-native';

export function getRiskColor(riskLevel: string) {
  switch (riskLevel) {
    case 'Low': return Colors.main.accent;
    case 'Medium': return '#FF9800';
    case 'High': return '#F44336';
    default: return Colors.main.textSecondary;
  }
}

export function getImageSource(img: any): ImageSourcePropType {
  if (typeof img === 'number') return img;
  if (typeof img === 'string') return require('../assets/images/icon.png');
  return require('../assets/images/icon.png');
} 