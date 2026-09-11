import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MENU_SECTIONS = [
  {
    title: 'Manage',
    items: [
      { title: 'Account Manager', icon: 'pie-chart', screen: 'AccountManagerDashboard', color: '#C75B12' },
      { title: 'Yajman Manager', icon: 'users', screen: 'YajmanList', color: '#7C3AED' },
      { title: 'Work History', icon: 'clock', screen: 'History', color: '#2563EB' },
    ],
  },
  {
    title: 'Community & Support',
    items: [
      { title: 'Community', icon: 'message-circle', screen: 'Community', color: '#16A34A' },
      { title: 'Help Center', icon: 'help-circle', screen: 'HelpCenter', color: '#F59E0B' },
    ],
  },
  {
    title: 'Account',
    items: [
      { title: 'Profile & Branding', icon: 'user', screen: 'Profile', color: '#C75B12' },
      { title: 'Subscription & Wallet', icon: 'credit-card', screen: 'Subscription', color: '#7C3AED' },
      { title: 'Settings', icon: 'settings', screen: 'Settings', color: '#6B7280' },
    ],
  },
];

const MenuScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const renderMenuItem = ({ title, icon, screen, color }: any) => (
    <TouchableOpacity
      key={screen}
      style={styles.menuItem}
      onPress={() => navigation.navigate(screen)}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: color + '15' }]}>
        <Icon name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.menuTitle, { color: colors.text }]}>{title}</Text>
      <View style={[styles.chevronContainer, { backgroundColor: isDark ? '#334155' : '#F3E8DB' }]}>
        <Icon name="chevron-right" size={16} color={colors.textLight} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={t('menu.title', 'Menu')} icon="grid" />
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <TouchableOpacity style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.primary + '15' }]}>
            <Icon name="user" size={28} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>Pandit Ji</Text>
            <Text style={[styles.profileRole, { color: colors.textLight }]}>View Profile & Settings</Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.textLight} />
        </TouchableOpacity>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textLight }]}>{section.title}</Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {section.items.map((item, index) => (
                <View key={item.screen}>
                  {renderMenuItem(item)}
                  {index < section.items.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 2 },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
  },
  chevronContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    marginLeft: 66,
  },
});

export default MenuScreen;
