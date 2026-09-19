import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HorizontalBarChart = ({ data, maxValue, colors: themeColors }: { data: { label: string; value: number }[]; maxValue: number; colors: any }) => {
  const ticks = [100, 75, 50, 25, 0];

  return (
    <View style={styles.barChartContainer}>
      <View style={styles.barChartRow}>
        <View style={styles.yAxis}>
          {ticks.map((tick) => (
            <Text key={tick} style={[styles.yAxisLabel, { color: themeColors.textLight }]}>
              {tick}%
            </Text>
          ))}
        </View>
        <View style={styles.barsArea}>
          {ticks.map((tick) => (
            <View key={tick} style={[styles.gridLine, { top: `${100 - tick}%`, backgroundColor: themeColors.border }]} />
          ))}
          <View style={styles.barsRow}>
            {data.map((item, index) => {
              const pct = maxValue > 0 ? Math.round((item.value / maxValue) * 100) : 0;
              return (
                <View key={index} style={styles.barColumn}>
                  <Text style={[styles.barPercent, { color: '#C75B12' }]}>{pct}%</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { height: `${pct}%`, backgroundColor: '#C75B12' }]} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={[styles.xAxis, { paddingLeft: 32 }]}>
        {data.map((item, index) => (
          <View key={index} style={styles.xAxisItem}>
            <Text style={[styles.xAxisLabel, { color: themeColors.text }]} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const AccountManagerDashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [dashboardData] = useState({
    monthlyTotal: {
      aaya: 45000,
      kharcha: 12000,
      balance: 33000,
    },
    sourceWise: [
      { id: '1', source: 'Karmkand', amount: 30000, type: 'income' },
      { id: '2', source: 'Astrology', amount: 15000, type: 'income' },
      { id: '3', source: 'Travel', amount: 5000, type: 'expense' },
      { id: '4', source: 'Samagri', amount: 7000, type: 'expense' },
    ]
  });

  const maxValue = Math.max(...dashboardData.sourceWise.map(s => s.amount));

  const barData = dashboardData.sourceWise.map((item) => ({
    label: item.source,
    value: item.amount,
  }));

  const navigateToEntry = (type: 'earning' | 'expense', defaultCategory?: string) => {
    if (type === 'earning') {
      navigation.navigate('EarningEntry', { defaultCategory });
    } else {
      navigation.navigate('ExpenseEntry', { defaultCategory });
    }
  };

  const quickEntries = [
    { title: 'Dakshina', icon: 'dollar-sign', color: colors.earning, type: 'earning', category: 'Dakshina' },
    { title: 'Other Income', icon: 'plus-circle', color: colors.primary, type: 'earning', category: 'Other Income' },
    { title: 'Travel', icon: 'navigation', color: colors.expense, type: 'expense', category: 'Travel' },
    { title: 'Samagri Expense', icon: 'shopping-cart', color: colors.secondary, type: 'expense', category: 'Samagri' },
  ];

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <CustomHeader title={t('accountManager.title', 'Account Manager')} icon="pie-chart" />
      <ScrollView style={styles.container}>

        {/* Balance Card */}
        <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
          <View style={styles.balanceRow}>
            <Text style={[styles.balanceLabel, { color: colors.text }]}>{t('accountManager.balance', 'Balance')}</Text>
            <Text style={[styles.balanceAmount, { color: colors.primary }]}>₹{dashboardData.monthlyTotal.balance.toLocaleString()}</Text>
          </View>
        </View>

        {/* Quick Entry Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>{t('accountManager.quickEntry', 'Quick Entry')}</Text>
          <View style={styles.quickEntryGrid}>
            {quickEntries.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickEntryCard, { backgroundColor: colors.surface }]}
                onPress={() => navigateToEntry(item.type as any, item.category)}
              >
                <View style={[styles.iconWrapper, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={[styles.quickEntryTitle, { color: colors.text, textAlign: 'center' }]} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Source-wise Horizontal Bar Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>{t('accountManager.sourceWise', 'Source-wise Totals')}</Text>
          <View style={[styles.chartCard, { backgroundColor: colors.surface }]}>
            <HorizontalBarChart data={barData} maxValue={maxValue} colors={colors} />
          </View>

          {/* Source List */}
          <View style={[styles.sourceList, { backgroundColor: colors.surface }]}>
            {dashboardData.sourceWise.map((item, index) => (
              <View key={item.id} style={[styles.sourceItem, index < dashboardData.sourceWise.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                <Text style={[styles.sourceName, { color: colors.text }]}>{item.source}</Text>
                <Text style={[styles.sourceAmount, { color: item.type === 'income' ? colors.earning : colors.expense }]}>
                  {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* View History Button */}
        <TouchableOpacity
          style={[styles.historyBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => navigation.navigate('AccountHistory')}
        >
          <Icon name="clock" size={18} color={colors.primary} />
          <Text style={[styles.historyBtnText, { color: colors.primary }]}>{t('accountManager.viewHistory', 'View Full History')}</Text>
          <Icon name="chevron-right" size={18} color={colors.primary} />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={[styles.bottomActions, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.earning }]}
          onPress={() => navigateToEntry('earning')}
        >
          <Icon name="arrow-down-left" size={16} color="#FFF" style={styles.actionIcon} />
          <Text style={styles.actionBtnText}>{t('accountManager.addEarning', 'Add Earning')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.expense }]}
          onPress={() => navigateToEntry('expense')}
        >
          <Icon name="arrow-up-right" size={16} color="#FFF" style={styles.actionIcon} />
          <Text style={styles.actionBtnText}>{t('accountManager.addExpense', 'Add Expense')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  quickEntryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickEntryCard: {
    width: '48%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickEntryTitle: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartCard: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  barChartContainer: {
    width: '100%',
  },
  barChartRow: {
    flexDirection: 'row',
    height: 140,
  },
  yAxis: {
    width: 32,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  yAxisLabel: {
    fontSize: 8,
    fontWeight: '500',
  },
  barsArea: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    opacity: 0.3,
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 4,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barPercent: {
    fontSize: 8,
    fontWeight: '700',
    marginBottom: 2,
  },
  barTrack: {
    width: 22,
    height: '90%',
    justifyContent: 'flex-end',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  barFill: {
    width: '100%',
    borderRadius: 4,
  },
  xAxis: {
    flexDirection: 'row',
    marginTop: 6,
  },
  xAxisItem: {
    flex: 1,
    alignItems: 'center',
  },
  xAxisLabel: {
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
  },
  sourceList: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  sourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  sourceName: {
    fontSize: 12,
    fontWeight: '500',
  },
  sourceAmount: {
    fontSize: 12,
    fontWeight: '700',
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },
  historyBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderTopWidth: 1,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 6,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  }
});

export default AccountManagerDashboardScreen;
