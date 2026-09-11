import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { MOCK_AARTIS } from '../data/mockLibrary';
import AudioPlayerUI from '../components/AudioPlayerUI';
import { Feather as Icon } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

type AartiDetailRouteProp = {
  key: string;
  name: 'AartiDetail';
  params: { aartiId: string };
};

const AartiDetailScreen = () => {
  const route = useRoute<AartiDetailRouteProp>();
  const { aartiId } = route.params;
  const { colors, isDark } = useTheme();
  
  const aarti = MOCK_AARTIS.find(a => a.id === aartiId);

  if (!aarti) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Aarti not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <CustomHeader title={aarti.title} showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: aarti.imageUrl }} style={styles.heroImage} />
          <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: colors.surface }]}>
            <Icon name="heart" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.textHeader}>
          <Text style={[styles.category, { color: colors.secondary }]}>{aarti.category}</Text>
        </View>
        
        <View style={[styles.contentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.hindiText, { color: colors.text }]}>
            {aarti.content}
          </Text>
        </View>
      </ScrollView>
      
      {/* Sticky Audio Player */}
      <AudioPlayerUI title={aarti.title} audioUrl={aarti.audioUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textHeader: {
    padding: 20,
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  hindiText: {
    fontSize: 18,
    lineHeight: 34,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default AartiDetailScreen;
