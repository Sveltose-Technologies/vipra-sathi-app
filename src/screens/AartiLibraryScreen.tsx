import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { AARTI_CATEGORIES, MOCK_AARTIS } from '../data/mockLibrary';
import { Feather as Icon } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import CustomDropdown from '../components/CustomDropdown';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AartiLibraryScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAartis = selectedCategory === 'All' 
    ? MOCK_AARTIS 
    : MOCK_AARTIS.filter(a => a.category === selectedCategory);

  const renderAartiCard = ({ item }: { item: typeof MOCK_AARTIS[0] }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.aartiCard, { borderColor: colors.border, backgroundColor: colors.surface }]}
      onPress={() => navigation.navigate('AartiDetail', { aartiId: item.id })}
    >
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.cardImage}
        imageStyle={styles.cardImageStyle}
      >
        {/* Gradient Overlay for Text Readability */}
        <View style={styles.cardOverlay}>
          <View style={styles.cardHeader}>
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="heart" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardFooter}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.playButton, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('AartiDetail', { aartiId: item.id })}
            >
              <Icon name="play" size={24} color="#FFF" style={styles.playIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Aarti Library" showBack={true} />

      <View style={styles.dropdownContainer}>
        <CustomDropdown
          value={selectedCategory}
          options={AARTI_CATEGORIES}
          onSelect={setSelectedCategory}
        />
      </View>

      <FlatList
        data={filteredAartis}
        keyExtractor={(item) => item.id}
        renderItem={renderAartiCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textLight }]}>
              No aartis found in this category.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dropdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  listContainer: { padding: 16, paddingBottom: 30 },
  aartiCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    height: 220,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 20,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay for text
    padding: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginLeft: 4, // Visual center for play icon
  },
  emptyContainer: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 16 }
});

export default AartiLibraryScreen;
