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
          {isDark ? (
            <Image
              source={require('../../dark-logo.jpeg')}
              style={styles.logoDark}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../light-logo.jpeg')}
              style={styles.logoLight}
              resizeMode="contain"
            />
          )}
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
          <View style={styles.greetingRow}>
            <Text style={[styles.greetingSubtext, { color: colors.textLight }]}>Namaste,</Text>
            <Text style={[styles.greetingText, { color: colors.text }]}>{user?.fullName || 'Pandit Ji'}</Text>
          </View>
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
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 2,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoLight: {
    width: 140,
    height: 50,
  },
  logoDark: {
    width: 140,
    height: 50,
  },
  appName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
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
    width: 15,
    height: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  greetingSection: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  spiritualCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#C75B12',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
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
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 8,
    gap: 3,
  },
  spiritualTagText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFF',
  },
  quoteText: {
    fontSize: 11,
    color: '#FFF',
    lineHeight: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    opacity: 0.95,
  },
  mantraContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    padding: 8,
  },
  mantraDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 6,
  },
  mantraLabel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
    fontWeight: '500',
  },
  mantraText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  ganeshaImage: {
    width: 70,
    height: 85,
    marginLeft: 6,
    opacity: 0.9,
    tintColor: '#FFF',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderRadius: 12,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFF5EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F3E8DB',
  },
  quickActionLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1E293B',
  },
  serviceSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  exploreAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  exploreAllText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C75B12',
  },
  serviceList: {
    paddingRight: 6,
  },
  serviceCard: {
    width: (width - 60) / 2.2,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  serviceCardGradient: {
    padding: 12,
    borderRadius: 12,
  },
  serviceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  serviceCardSubtitle: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 13,
    marginBottom: 8,
  },
  serviceArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  poojaSection: {
    marginBottom: 16,
  },
  poojaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#C75B12',
  },
  poojaCard: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  poojaImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  poojaInfo: {
    flex: 1,
    marginLeft: 10,
  },
  aajKaTag: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  aajKaTagText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#C75B12',
  },
  poojaName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 2,
  },
  poojaDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    gap: 4,
  },
  poojaDetailText: {
    fontSize: 10,
    color: '#6B7280',
  },
  poojaArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  festivalSection: {
    marginBottom: 12,
  },
  festivalCard: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 1 },
    }),
  },
  festivalIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  festivalInfo: {
    flex: 1,
    marginLeft: 10,
  },
  festivalName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  festivalDate: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#C75B12',
  },
});

export default HomeScreen;
