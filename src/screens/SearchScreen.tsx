import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../theme/colors';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Everything</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="e.g. Ganesh"
          placeholderTextColor={colors.textLight}
          autoFocus
        />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quick Suggestions</Text>
        <Text style={styles.resultItem}>• Ganesh Pooja</Text>
        <Text style={styles.resultItem}>• Ganesh Aarti</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: colors.surface,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  resultItem: {
    fontSize: 16,
    color: colors.textLight,
    paddingVertical: 8,
  },
});

export default SearchScreen;
