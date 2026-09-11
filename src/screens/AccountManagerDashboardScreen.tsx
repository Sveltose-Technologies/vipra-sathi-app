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

const AccountManagerDashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // Mock Data for Dashboard
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

  const navigateToEntry = (type: 'earning' | 'expense', defaultCategory?: string) => {
    if (type === 'earning') {
      navigation.navigate('EarningEntry', { defaultCategory });
    } else {
      navigation.navigate('ExpenseEntry', { defaultCategory });
    }
  };

  const quickEntries = [
    { title: 'Dakshina', icon: 'dollar-sign', color: '#10b981', type: 'earning', category: 'Dakshina' },
    { title: 'Other Income', icon: 'plus-circle', color: '#3b82f6', type: 'earning', category: 'Other Income' },
    { title: 'Travel', icon: 'navigation', color: '#ef4444', type: 'expense', category: 'Travel' },
    { title: 'Samagri Expense', icon: 'shopping-cart', color: '#f59e0b', type: 'expense', category: 'Samagri' },
  ];

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <CustomHeader title={t('accountManager.title', 'Account Manager')} icon="pie-chart" />
      <ScrollView style={styles.container}>

        {/* Main Dashboard Card */}
        <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('accountManager.monthlySummary', 'Monthly Summary')}</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>{t('accountManager.aaya', 'Aaya (Income)')}</Text>
              <Text style={[styles.summaryAmount, { color: '#10b981' }]}>₹{dashboardData.monthlyTotal.aaya.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: colors.textLight }]}>{t('accountManager.kharcha', 'Kharcha (Expense)')}</Text>
              <Text style={[styles.summaryAmount, { color: '#ef4444' }]}>₹{dashboardData.monthlyTotal.kharcha.toLocaleString()}</Text>
            </View>
          </View>

          <View style={[styles.balanceContainer, { backgroundColor: colors.background }]}>
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
                  <Icon name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={[styles.quickEntryTitle, { color: colors.text }]} numberOfLines={2} textAlign="center">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Source-wise Totals */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.text }]}>{t('accountManager.sourceWise', 'Source-wise Totals')}</Text>
          <View style={[styles.sourceList, { backgroundColor: colors.surface }]}>
            {dashboardData.sourceWise.map((item, index) => (
              <View key={item.id} style={[styles.sourceItem, index < dashboardData.sourceWise.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                <Text style={[styles.sourceName, { color: colors.text }]}>{item.source}</Text>
                <Text style={[styles.sourceAmount, { color: item.type === 'income' ? '#10b981' : '#ef4444' }]}>
                  {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Primary Floating Action Buttons (Optional but helpful) */}
      <View style={[styles.bottomActions, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#10b981' }]}
          onPress={() => navigateToEntry('earning')}
        >
          <Icon name="arrow-down-left" size={20} color="#FFF" style={styles.actionIcon} />
          <Text style={styles.actionBtnText}>{t('accountManager.addEarning', 'Add Earning')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#ef4444' }]}
          onPress={() => navigateToEntry('expense')}
        >
          <Icon name="arrow-up-right" size={20} color="#FFF" style={styles.actionIcon} />
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
    padding: 16,
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  summaryLabel: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  summaryAmount: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  quickEntryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickEntryCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickEntryTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  sourceList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sourceName: {
    fontSize: 15,
    fontWeight: '500',
  },
  sourceAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    margin: 10
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 8,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default AccountManagerDashboardScreen;
