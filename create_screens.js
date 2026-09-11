const fs = require('fs');
const path = require('path');

const screens = [
  'MenuScreen',
  'KundaliScreen',
  'MuhurtScreen',
  'SamagriScreen',
  'StotramLibraryScreen',
  'AartiLibraryScreen',
  'CommunityScreen',
  'HelpCenterScreen',
  'SubscriptionScreen',
  'DakshinaCalculatorScreen',
  'HistoryScreen'
];

const screenDir = path.join(__dirname, 'src', 'screens');

if (!fs.existsSync(screenDir)) {
  fs.mkdirSync(screenDir, { recursive: true });
}

screens.forEach(screenName => {
  const filePath = path.join(screenDir, `${screenName}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    const title = screenName.replace('Screen', '').replace(/([A-Z])/g, ' $1').trim();
    const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const ${screenName} = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>${title}</Text>
      <Text style={[styles.subtitle, { color: colors.textLight }]}>
        This module is currently under construction.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default ${screenName};
`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${screenName}.tsx`);
  } else {
    console.log(`${screenName}.tsx already exists`);
  }
});
