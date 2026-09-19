import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomHeader from '../components/CustomHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LibraryHubScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const renderFullCard = (
    title: string,
    desc: string,
    icon: string,
    route: keyof RootStackParamList,
    gradient: [string, string],
    iconColor: string
  ) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate(route as any)}
      style={styles.fullCardWrapper}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fullCard}
      >
        <Icon name={icon as any} size={60} color="rgba(255,255,255,0.15)" style={styles.cardBgIcon} />
        <View style={styles.cardHeaderRow}>
          <View style={styles.iconCircle}>
            <Icon name={icon as any} size={18} color={iconColor} />
          </View>
          <View style={styles.arrowCircle}>
            <Icon name="arrow-right" size={14} color="#FFF" />
          </View>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Spiritual Hub" icon="book-open" showThemeToggle={true} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {renderFullCard(
          'Pooja Library',
          'Detailed rituals, samagri lists, and dynamic mantras for every auspicious occasion.',
          'book-open',
          'PoojaLibrary',
          ['#C75B12', '#E8944A'],
          '#C75B12'
        )}

        {renderFullCard(
          'Stotram',
          'A rich collection of powerful stotras with audio support for daily recitation.',
          'music',
          'StotramLibrary',
          ['#16A34A', '#4ADE80'],
          '#16A34A'
        )}

        {renderFullCard(
          'Aarti',
          'Beautifully organized aartis with high-quality deity images and lyrics.',
          'sun',
          'AartiLibrary',
          ['#7C3AED', '#A78BFA'],
          '#7C3AED'
        )}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  fullCardWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },
  fullCard: {
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    minHeight: 170,
    justifyContent: 'space-between',
  },
  cardBgIcon: {
    position: 'absolute',
    right: -10,
    bottom: -15,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 16,
  },
});

export default LibraryHubScreen;
