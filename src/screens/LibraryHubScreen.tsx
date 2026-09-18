import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LibraryHubScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const renderCard = (title: string, description: string, icon: string, route: keyof RootStackParamList) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => navigation.navigate(route as any)}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
        <Icon name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.cardDesc, { color: colors.textLight }]}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={24} color={colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Pooja" icon="book-open" showThemeToggle={true} />
      <View style={styles.header}>
        <Text style={[styles.headerSubtitle, { color: colors.textLight }]}>
          Access all your spiritual resources
        </Text>
      </View>

      <View style={styles.content}>
        {renderCard(
          'Pooja Library',
          'Detailed rituals, samagri, and dynamic mantras',
          'book-open',
          'PoojaLibrary'
        )}
        {renderCard(
          'Stotram',
          'Collection of powerful stotras with audio support',
          'music',
          'StotramLibrary'
        )}
        {renderCard(
          'Aarti',
          'Beautifully organized aartis with deity images',
          'sun',
          'AartiLibrary'
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 14, paddingTop: 20 },
  headerTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  headerSubtitle: { fontSize: 13 },
  content: { padding: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  cardDesc: { fontSize: 11, lineHeight: 15 },
});

export default LibraryHubScreen;
