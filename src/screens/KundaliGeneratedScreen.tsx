import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import VedicChart from '../components/VedicChart';
import { Feather as Icon } from '@expo/vector-icons';

type KundaliGeneratedRouteProp = RouteProp<RootStackParamList, 'KundaliGenerated'>;

type ChartType = 'Lagna' | 'Chandra' | 'Surya' | 'D9' | 'D10' | 'Dashas';

// Mock data for the charts
const MOCK_CHARTS: Record<string, { name: string, house: number }[]> = {
  'Lagna': [
    { name: 'Su', house: 1 }, { name: 'Me', house: 1 },
    { name: 'Mo', house: 4 }, { name: 'Ma', house: 7 },
    { name: 'Ju', house: 9 }, { name: 'Ve', house: 10 },
    { name: 'Sa', house: 12 }, { name: 'Ra', house: 6 }, { name: 'Ke', house: 12 }
  ],
  'Chandra': [
    { name: 'Mo', house: 1 }, { name: 'Ma', house: 4 },
    { name: 'Su', house: 10 }, { name: 'Me', house: 10 },
    { name: 'Ju', house: 6 }, { name: 'Ve', house: 7 },
    { name: 'Sa', house: 9 }, { name: 'Ra', house: 3 }, { name: 'Ke', house: 9 }
  ],
  'Surya': [
    { name: 'Su', house: 1 }, { name: 'Me', house: 1 },
    { name: 'Mo', house: 4 }, { name: 'Ma', house: 7 },
    { name: 'Ju', house: 9 }, { name: 'Ve', house: 10 },
    { name: 'Sa', house: 12 }, { name: 'Ra', house: 6 }, { name: 'Ke', house: 12 }
  ],
  'D9': [
    { name: 'Ju', house: 1 }, { name: 'Ve', house: 2 },
    { name: 'Su', house: 5 }, { name: 'Mo', house: 8 },
    { name: 'Ma', house: 10 }, { name: 'Me', house: 11 },
    { name: 'Sa', house: 3 }, { name: 'Ra', house: 4 }, { name: 'Ke', house: 10 }
  ],
  'D10': [
    { name: 'Su', house: 10 }, { name: 'Me', house: 10 },
    { name: 'Mo', house: 11 }, { name: 'Ma', house: 2 },
    { name: 'Ju', house: 4 }, { name: 'Ve', house: 5 },
    { name: 'Sa', house: 7 }, { name: 'Ra', house: 1 }, { name: 'Ke', house: 7 }
  ]
};

const MOCK_DASHAS = [
  { planet: 'Jupiter', duration: '2010 - 2026', current: true },
  { planet: 'Saturn', duration: '2026 - 2045', current: false },
  { planet: 'Mercury', duration: '2045 - 2062', current: false },
  { planet: 'Ketu', duration: '2062 - 2069', current: false },
  { planet: 'Venus', duration: '2069 - 2089', current: false },
];

const KundaliGeneratedScreen = () => {
  const route = useRoute<KundaliGeneratedRouteProp>();
  const { colors } = useTheme();
  const { name, dob, tob, place } = route.params;

  const [activeTab, setActiveTab] = useState<ChartType>('Lagna');
  const tabs: ChartType[] = ['Lagna', 'Chandra', 'Surya', 'D9', 'D10', 'Dashas'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Your Kundali" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* User Info Card */}
        <View style={[styles.userInfoCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <View style={styles.userIconBg}>
            <Icon name="user" size={32} color={colors.surface} />
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: colors.text }]}>{name}</Text>
            <Text style={[styles.userInfoText, { color: colors.textLight }]}>{dob} • {tob}</Text>
            <Text style={[styles.userInfoText, { color: colors.textLight }]}>📍 {place}</Text>
          </View>
        </View>

        {/* Tab Navigator */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabScroll}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab ? { backgroundColor: colors.primary, borderColor: colors.primary } : { backgroundColor: colors.surface, borderColor: colors.border }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab ? { color: '#FFF' } : { color: colors.textLight }
              ]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Dynamic Content Area */}
        <View style={[styles.contentArea, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {activeTab === 'Dashas' ? 'Vimshottari Dasha' : `${activeTab} Chart`}
          </Text>

          {activeTab !== 'Dashas' ? (
            <View style={styles.chartWrapper}>
              <VedicChart planets={MOCK_CHARTS[activeTab]} size={280} />
            </View>
          ) : (
            <View style={styles.dashasContainer}>
              {MOCK_DASHAS.map((dasha, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dashaItem, 
                    { borderBottomColor: colors.border },
                    dasha.current && { backgroundColor: colors.primary + '10', borderLeftColor: colors.primary, borderLeftWidth: 4 }
                  ]}
                >
                  <View>
                    <Text style={[styles.dashaPlanet, { color: dasha.current ? colors.primary : colors.text }]}>
                      {dasha.planet} Mahadasha
                    </Text>
                    <Text style={[styles.dashaDuration, { color: colors.textLight }]}>{dasha.duration}</Text>
                  </View>
                  {dasha.current && (
                    <View style={[styles.activeBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.activeBadgeText}>Current</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  userInfoCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  userIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B0909',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userInfoText: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '500',
  },
  tabScroll: {
    marginBottom: 20,
  },
  tabScrollContent: {
    paddingRight: 16,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentArea: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    minHeight: 350,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dashasContainer: {
    marginTop: 10,
  },
  dashaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  dashaPlanet: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dashaDuration: {
    fontSize: 14,
  },
  activeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default KundaliGeneratedScreen;
