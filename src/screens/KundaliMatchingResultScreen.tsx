import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { Feather as Icon } from '@expo/vector-icons';
import { MOCK_KUNDALI_RESULT } from '../data/mockKundali';

const KundaliMatchingResultScreen = () => {
  const { colors, isDark } = useTheme();
  const result = MOCK_KUNDALI_RESULT;

  const getScoreColor = (score: number) => {
    if (score >= 28) return colors.primary; // Excellent
    if (score >= 18) return '#25D366'; // Good
    return colors.error; // Poor
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Matching Results" showBack={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Total Score Card */}
        <View style={[styles.scoreCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.scoreTitle, { color: colors.text }]}>Ashta Koota Score</Text>
          <View style={styles.scoreCircleContainer}>
            <View style={[styles.scoreCircle, { borderColor: getScoreColor(result.totalScore) }]}>
              <Text style={[styles.scoreText, { color: getScoreColor(result.totalScore) }]}>
                {result.totalScore}
              </Text>
              <Text style={[styles.scoreDivider, { color: colors.textLight }]}>out of {result.maxScore}</Text>
            </View>
          </View>
        </View>

        {/* Manglik Comparison */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Icon name="shield" size={20} color={colors.secondary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Manglik Comparison</Text>
          </View>
          
          <View style={styles.manglikRow}>
            <View style={styles.manglikBox}>
              <Text style={[styles.manglikLabel, { color: colors.textLight }]}>Bride</Text>
              <Text style={[styles.manglikValue, { color: colors.text }]}>{result.manglikBride}</Text>
            </View>
            <View style={styles.manglikBox}>
              <Text style={[styles.manglikLabel, { color: colors.textLight }]}>Groom</Text>
              <Text style={[styles.manglikValue, { color: colors.text }]}>{result.manglikGroom}</Text>
            </View>
          </View>
          
          <Text style={[styles.conclusionText, { color: colors.primary }]}>{result.manglikConclusion}</Text>
        </View>

        {/* Detailed Scores List */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Icon name="list" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Detailed Analysis</Text>
          </View>

          {result.ashtaKoota.map((koota, index) => (
            <View key={index} style={[styles.kootaRow, { borderBottomColor: colors.border, borderBottomWidth: index === result.ashtaKoota.length - 1 ? 0 : 1 }]}>
              <View style={styles.kootaInfo}>
                <Text style={[styles.kootaName, { color: colors.text }]}>{koota.name}</Text>
                <Text style={[styles.kootaDesc, { color: colors.textLight }]}>{koota.description}</Text>
              </View>
              <Text style={[styles.kootaScore, { color: colors.primary }]}>
                {koota.obtained} / {koota.maximum}
              </Text>
            </View>
          ))}
        </View>

        {/* Observations */}
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Icon name="info" size={20} color={colors.secondary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Important Observations</Text>
          </View>
          
          {result.observations.map((obs, index) => (
            <View key={index} style={styles.obsRow}>
              <View style={[styles.bullet, { backgroundColor: colors.textLight }]} />
              <Text style={[styles.obsText, { color: colors.text }]}>{obs}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
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
  },
  scoreCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreDivider: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  manglikRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  manglikBox: {
    flex: 1,
  },
  manglikLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '600',
  },
  manglikValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  conclusionText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    backgroundColor: 'rgba(255, 153, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  kootaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  kootaInfo: {
    flex: 1,
    paddingRight: 16,
  },
  kootaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  kootaDesc: {
    fontSize: 12,
  },
  kootaScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  obsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 10,
  },
  obsText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  }
});

export default KundaliMatchingResultScreen;
