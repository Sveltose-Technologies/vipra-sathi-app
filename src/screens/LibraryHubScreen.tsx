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
        <Icon name={icon} size={32} color={colors.primary} />
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
  header: { padding: 20, paddingTop: 30 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { fontSize: 16 },
  content: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDesc: { fontSize: 14, lineHeight: 20 },
});

export default LibraryHubScreen;
