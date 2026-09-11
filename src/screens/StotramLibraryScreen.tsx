import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { STOTRAM_CATEGORIES, MOCK_STOTRAS } from '../data/mockLibrary';
import { Feather as Icon } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const StotramLibraryScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredStotras = selectedCategory === 'All' 
    ? MOCK_STOTRAS 
    : MOCK_STOTRAS.filter(s => s.category === selectedCategory);

  const renderCategoryPill = (category: string) => {
    const isSelected = selectedCategory === category;
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryPill,
          { 
            backgroundColor: isSelected ? colors.primary : (isDark ? colors.surface : '#f0f0f0'),
            borderColor: isSelected ? colors.primary : colors.border
          }
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text style={[
          styles.categoryText,
          { color: isSelected ? '#FFFFFF' : colors.text }
        ]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStotramCard = ({ item }: { item: typeof MOCK_STOTRAS[0] }) => (
    <TouchableOpacity
      style={[styles.stotramCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => navigation.navigate('StotramDetail', { stotramId: item.id })}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
          <Icon name="music" size={20} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.category, { color: colors.textLight }]}>{item.category}</Text>
        </View>
        <Icon name="play-circle" size={24} color={colors.secondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader title="Stotram Library" showBack={true} />

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {STOTRAM_CATEGORIES.map(renderCategoryPill)}
        </ScrollView>
      </View>

      <FlatList
        data={filteredStotras}
        keyExtractor={(item) => item.id}
        renderItem={renderStotramCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textLight }]}>
              No stotras found in this category.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoriesContainer: { marginBottom: 12 },
  categoriesScroll: { paddingHorizontal: 16, paddingBottom: 8 },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
  },
  categoryText: { fontSize: 15, fontWeight: '600' },
  listContainer: { padding: 16, paddingBottom: 30 },
  stotramCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  category: { fontSize: 14 },
  emptyContainer: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 16 }
});

export default StotramLibraryScreen;
