import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import DynamicSection from '../components/DynamicSection';
import { usePoojaLibrary } from '../hooks/usePoojaLibrary';
import { MOCK_POOJAS } from '../data/mockPoojas';
import CustomHeader from '../components/CustomHeader';

type PoojaDetailRouteProp = {
  key: string;
  name: 'PoojaDetail';
  params: { poojaId: string };
};

const PoojaDetailScreen = () => {
  const route = useRoute<PoojaDetailRouteProp>();
  const { poojaId } = route.params;
  const { colors, isDark } = useTheme();
  
  // In a real app, we'd use useQuery here with offline persistence
  const pooja = MOCK_POOJAS.find(p => p.id === poojaId);
  
  const { favorites, toggleFavorite, notes, saveNotes, isReady } = usePoojaLibrary(poojaId);
  const [localNotes, setLocalNotes] = useState(notes);
  
  // Update local notes when the hook is ready (if it changed)
  React.useEffect(() => {
    if (isReady) {
      setLocalNotes(notes);
    }
  }, [isReady, notes]);

  // Debounce save (simple version)
  const handleSaveNotes = (text: string) => {
    setLocalNotes(text);
    saveNotes(poojaId, text);
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.isNotesSection) {
      return (
        <View style={[styles.notesContainer, { backgroundColor: isDark ? colors.surface : '#f8f9fa' }]}>
          <Text style={[styles.notesTitle, { color: colors.primaryDark }]}>My Notes</Text>
          <TextInput
            style={[
              styles.notesInput, 
              { 
                backgroundColor: colors.background, 
                color: colors.text,
                borderColor: colors.border
              }
            ]}
            multiline
            placeholder="Add your personal notes for this pooja..."
            placeholderTextColor={colors.textLight}
            value={localNotes}
            onChangeText={handleSaveNotes}
          />
        </View>
      );
    }

    if (item.isHeader) {
      return (
        <View style={styles.headerContainer}>
          <Text style={[styles.poojaTitle, { color: colors.primaryDark }]}>{pooja?.title}</Text>
          <Text style={[styles.poojaCategory, { color: colors.secondary }]}>
            {pooja?.category} {pooja?.subCategory ? `• ${pooja.subCategory}` : ''}
          </Text>
        </View>
      );
    }

    return (
      <DynamicSection 
        section={item} 
        isFavorite={favorites.has(item.sectionId)}
        onToggleFavorite={toggleFavorite}
      />
    );
  };

  if (!pooja || !isReady) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const listData = [
    { isHeader: true, id: 'header' },
    ...pooja.sections, 
    { isNotesSection: true, id: 'notes' }
  ];

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <CustomHeader title={pooja.title} showBack={true} />
      <FlatList
        data={listData}
        keyExtractor={(item: any) => item.sectionId || item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 8,
  },
  poojaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  poojaCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  notesContainer: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notesInput: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
  }
});

export default PoojaDetailScreen;
