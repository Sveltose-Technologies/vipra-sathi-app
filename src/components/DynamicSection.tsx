import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { PoojaSection } from '../types/pooja';
import { useTheme } from '../theme/ThemeContext';

interface DynamicSectionProps {
  section: PoojaSection;
  isFavorite: boolean;
  onToggleFavorite: (sectionId: string) => void;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ section, isFavorite, onToggleFavorite }) => {
  const { colors, isDark } = useTheme();

  switch (section.sectionType) {
    case 'Heading':
      return (
        <Text style={[styles.heading, { color: colors.text }]}>
          {section.content}
        </Text>
      );
    
    case 'Description':
      return (
        <Text style={[styles.description, { color: colors.textLight }]}>
          {section.content}
        </Text>
      );
    
    case 'Dhyan':
    case 'Mantra':
      return (
        <View style={[
          styles.mantraCard, 
          { 
            backgroundColor: isDark ? colors.surface : '#FFF3E0', // Pale saffron color for light mode
            borderColor: colors.border
          }
        ]}>
          <Text style={[styles.sanskritText, { color: colors.primaryDark }]}>
            {section.content}
          </Text>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => onToggleFavorite(section.sectionId)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? '#E91E63' : colors.textLight} 
            />
          </TouchableOpacity>
        </View>
      );
      
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  mantraCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sanskritText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    fontStyle: 'italic',
    flex: 1,
    marginRight: 12,
  },
  favoriteButton: {
    padding: 4,
  }
});

export default DynamicSection;
