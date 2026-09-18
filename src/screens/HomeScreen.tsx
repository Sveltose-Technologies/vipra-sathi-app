import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

const SERVICE_CARDS = [
  {
    id: '1',
    title: 'Panchang',
    subtitle: 'Tithi, Muhurat & Festivals',
    icon: 'sun',
    gradient: ['#C75B12', '#E8944A'],
  },
  {
    id: '2',
    title: 'Kundali',
    subtitle: 'Birth Chart & Compatibility',
    icon: 'star',
    gradient: ['#16A34A', '#4ADE80'],
  },
  {
    id: '3',
    title: 'Pooja',
    subtitle: 'Book, Plan & Rituals',
    icon: 'droplet',
    gradient: ['#2563EB', '#60A5FA'],
  },
  {
    id: '4',
    title: 'Muhurat',
    subtitle: 'Auspicious Times',
    icon: 'clock',
    gradient: ['#7C3AED', '#A78BFA'],
  },
];

const QUICK_ACTIONS = [
  { id: '1', label: 'Yajman', icon: 'users', screen: 'YajmanList' },
  { id: '2', label: 'Stotram', icon: 'book-open', screen: 'StotramLibrary' },
  { id: '3', label: 'Community', icon: 'message-circle', screen: 'Community' },
  { id: '4', label: 'History', icon: 'clock', screen: 'History' },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { colors, isDark, setTheme } = useTheme();
  const { user } = useAuth();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      {/* Header - outside ScrollView to avoid content padding */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../logo_ganesh.png')}
            style={styles.logoGanesh}
            resizeMode="contain"
          />
          <Image
            source={require('../../logo_text.png')}
            style={styles.logoText}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.headerIconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={toggleTheme}>
            <Icon name={isDark ? 'sun' : 'moon'} size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell" size={18} color={colors.text} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconBtn, styles.profileBtn]}
          >
            <Icon name="user" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greetingSubtext, { color: colors.textLight }]}>Namaste,</Text>
          <Text style={[styles.greetingText, { color: colors.text }]}>{user?.fullName || 'Pandit Ji'}</Text>
        </View>

        {/* Daily Spiritual Card */}
        <LinearGradient
          colors={['#C75B12', '#E8944A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.spiritualCard}
        >
          <View style={styles.spiritualContent}>
            <View style={styles.spiritualTag}>
              <Icon name="sun" size={12} color="#C75B12" />
              <Text style={styles.spiritualTagText}>Daily Spiritual</Text>
            </View>
            <Text style={styles.quoteText}>
              "Inner peace begins when you choose not to allow another person or event to control your emotions."
            </Text>
            <View style={styles.mantraContainer}>
              <View style={styles.mantraDivider} />
              <Text style={styles.mantraLabel}>Today's Mantra</Text>
              <Text style={styles.mantraText}>Om Gam Ganapataye Namaha</Text>
            </View>
          </View>
          <Image
            source={require('../../logo.png')}
            style={styles.ganeshaImage}
            resizeMode="contain"
          />
        </LinearGradient>

        {/* Quick Actions Row */}
        <View style={[styles.quickActionsRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {QUICK_ACTIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.quickActionItem}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: isDark ? colors.surface : '#FFF5EE', borderColor: colors.border }]}>
                <Icon name={item.icon as any} size={20} color="#C75B12" />
              </View>
              <Text style={[styles.quickActionLabel, { color: colors.text }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* What would you like to do? */}
        <View style={styles.serviceSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What would you like to do?</Text>
            <TouchableOpacity style={styles.exploreAllBtn}>
              <Text style={styles.exploreAllText}>Explore All</Text>
              <Icon name="arrow-right" size={14} color="#C75B12" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={SERVICE_CARDS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.serviceList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.serviceCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.title === 'Panchang' ? 'Panchang' : item.title === 'Kundali' ? 'Kundali' : item.title === 'Pooja' ? 'PoojaLibrary' : 'Muhurt')}
              >
                <LinearGradient
                  colors={item.gradient as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceCardGradient}
                >
                  <View style={styles.serviceIconContainer}>
                    <Icon name={item.icon as any} size={22} color="#FFF" />
                  </View>
                  <Text style={styles.serviceCardTitle}>{item.title}</Text>
                  <Text style={styles.serviceCardSubtitle}>{item.subtitle}</Text>
                  <View style={styles.serviceArrow}>
                    <Icon name="arrow-right" size={14} color="#FFF" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Today's Pooja */}
        <View style={styles.poojaSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.poojaTitleRow}>
              <Icon name="calendar" size={18} color="#C75B12" />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Pooja</Text>
            </View>
            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <Icon name="chevron-right" size={14} color="#C75B12" />
            </TouchableOpacity>
          </View>

          <View style={[styles.poojaCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Image
              source={require('../assets/images/onboarding_1.jpg')}
              style={styles.poojaImage}
              resizeMode="cover"
            />
            <View style={styles.poojaInfo}>
              <View style={styles.aajKaTag}>
                <Text style={styles.aajKaTagText}>Aaj Ka Karyakram</Text>
              </View>
              <Text style={[styles.poojaName, { color: colors.text }]}>Griha Pravesh</Text>
              <View style={styles.poojaDetailRow}>
                <Icon name="user" size={13} color={colors.textLight} />
                <Text style={[styles.poojaDetailText, { color: colors.textLight }]}>Sharma Family</Text>
              </View>
              <View style={styles.poojaDetailRow}>
                <Icon name="clock" size={13} color={colors.textLight} />
                <Text style={[styles.poojaDetailText, { color: colors.textLight }]}>10:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.poojaArrowBtn}>
              <Icon name="chevron-right" size={18} color="#C75B12" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Festivals */}
        <View style={styles.festivalSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.poojaTitleRow}>
              <Icon name="star" size={18} color="#C75B12" />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Festivals</Text>
            </View>
          </View>

          <View style={[styles.festivalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.festivalIconContainer}>
              <Icon name="droplet" size={20} color="#C75B12" />
            </View>
            <View style={styles.festivalInfo}>
              <Text style={[styles.festivalName, { color: colors.text }]}>Ganesh Chaturthi</Text>
              <Text style={[styles.festivalDate, { color: colors.textLight }]}>7 Sep 2025</Text>
            </View>
            <TouchableOpacity style={styles.viewDetailsBtn}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Icon name="chevron-right" size={14} color="#C75B12" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 0,
    paddingRight: 16,
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoGanesh: {
    width: 50,
    height: 50,
  },
  logoText: {
    width: 75,
    height: 22,
    marginLeft: 2,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
  profileBtn: {
    backgroundColor: '#C75B12',
    borderColor: '#C75B12',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#DC2626',
    width: 17,
    height: 17,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  greetingSection: {
    marginBottom: 16,
  },
  greetingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  spiritualCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#C75B12',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  spiritualContent: {
    flex: 1,
  },
  spiritualTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    gap: 4,
  },
  spiritualTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  quoteText: {
    fontSize: 13,
    color: '#FFF',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 12,
    opacity: 0.95,
  },
  mantraContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 10,
  },
  mantraDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 8,
  },
  mantraLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
    fontWeight: '500',
  },
  mantraText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  ganeshaImage: {
    width: 100,
    height: 120,
    marginLeft: 8,
    opacity: 0.9,
    tintColor: '#FFF',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderRadius: 16,
    padding: 14,
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
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF5EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#F3E8DB',
  },
  quickActionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },
  serviceSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  exploreAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C75B12',
  },
  serviceList: {
    paddingRight: 8,
  },
  serviceCard: {
    width: (width - 60) / 2.2,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  serviceCardGradient: {
    padding: 16,
    borderRadius: 16,
  },
  serviceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  serviceCardSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 15,
    marginBottom: 10,
  },
  serviceArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  poojaSection: {
    marginBottom: 24,
  },
  poojaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C75B12',
  },
  poojaCard: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
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
  poojaImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  poojaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  aajKaTag: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  aajKaTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#C75B12',
  },
  poojaName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  poojaDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  poojaDetailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  poojaArrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  festivalSection: {
    marginBottom: 16,
  },
  festivalCard: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
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
  festivalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  festivalInfo: {
    flex: 1,
    marginLeft: 12,
  },
  festivalName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  festivalDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C75B12',
  },
});

export default HomeScreen;
