import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

interface ChartDataPoint {
  date: string;
  value: number;
}

interface ChartData {
  supporters: ChartDataPoint[];
  habitsDone: ChartDataPoint[];
  supporting: ChartDataPoint[];
}

interface ChartCardProps {
  data: ChartData;
}

class ChartCard extends React.Component<ChartCardProps> {
  private renderChart(data: ChartDataPoint[], title: string, color: string) {
    const maxValue = Math.max(...data.map(d => d.value));
    const minHeight = 80;
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <View style={styles.chartBars}>
          {data.map((point, index) => {
            const height = maxValue > 0 ? (point.value / maxValue) * minHeight : 0;
            return (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barValue}>{point.value}</Text>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: Math.max(height, 8), // Minimum 8px height for visibility
                      backgroundColor: color 
                    }
                  ]} 
                />
                <Text style={styles.barLabel}>{point.date}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    
    return (
      <View style={styles.card}>
        <View style={styles.chartsColumn}>
          {this.renderChart(data.supporters, "Supporters", Colors.main.accent)}
          <View style={styles.chartDivider} />
          {this.renderChart(data.habitsDone, "Habits Done", Colors.main.textPrimary)}
          <View style={styles.chartDivider} />
          {this.renderChart(data.supporting, "Supporting", Colors.main.accent)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.main.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.main.border,
  },
  chartsColumn: {
    flexDirection: 'column',
    gap: 24,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chartTitle: {
    color: Colors.main.textSecondary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 120,
    paddingHorizontal: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barValue: {
    color: Colors.main.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  bar: {
    width: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  barLabel: {
    color: Colors.main.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  chartDivider: {
    height: 1,
    backgroundColor: Colors.main.border,
    marginVertical: 8,
  },
});

export default ChartCard; 