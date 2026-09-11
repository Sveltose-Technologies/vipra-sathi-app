import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { useTickets } from '../hooks/useTickets';
import { Ticket } from '../types/ticket';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RESOURCES = [
  { id: 'faq', title: 'FAQ', icon: 'help-circle' },
  { id: 'video_kundali', title: 'Video Guides (How to Generate Kundali)', icon: 'video' },
  { id: 'video_payment', title: 'Payment Help', icon: 'credit-card' },
  { id: 'contact', title: 'Contact Support', icon: 'phone-call' },
];

const HelpCenterScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { tickets, isLoading, refreshTickets } = useTickets();

  useFocusEffect(
    useCallback(() => {
      refreshTickets();
    }, [refreshTickets])
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
      case 'Closed':
        return colors.success || '#10b981';
      case 'Admin Review':
        return colors.secondary || '#f59e0b';
      case 'Pending':
      default:
        return colors.primary;
    }
  };

  const renderResource = (item: typeof RESOURCES[0]) => (
    <TouchableOpacity key={item.id} style={[styles.resourceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.resourceIcon, { backgroundColor: colors.primary + '15' }]}>
        <Icon name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={[styles.resourceTitle, { color: colors.text }]}>{item.title}</Text>
      <Icon name="chevron-right" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );

  const renderTicket = ({ item }: { item: Ticket }) => (
    <View style={[styles.ticketCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.ticketHeader}>
        <Text style={[styles.ticketCategory, { color: colors.textLight }]}>{item.category}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={[styles.ticketSubject, { color: colors.text }]} numberOfLines={1}>{item.subject}</Text>
      <Text style={[styles.ticketDate, { color: colors.textLight }]}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingBottom: insets.bottom }]}>
      <CustomHeader title="Help Center" icon="help-circle" />

      <ScrollView
        style={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshTickets} tintColor={colors.primary} />}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support Resources</Text>
          <View style={styles.resourcesList}>
            {RESOURCES.map(renderResource)}
          </View>
        </View>

        <View style={[styles.section, styles.ticketsSection]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Support Tickets</Text>
          </View>

          {tickets.length === 0 && !isLoading ? (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Icon name="message-square" size={20} color={colors.textLight} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Tickets Yet</Text>
              <Text style={[styles.emptySubtitle, { color: colors.textLight }]}>
                If you have any suggestions, issues, or queries, feel free to raise a support ticket.
              </Text>
              <TouchableOpacity
                style={[styles.emptyButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('CreateTicket' as any)} // Will update AppNavigator
              >
                <Icon name="plus" size={20} color="#FFF" style={styles.emptyButtonIcon} />
                <Text style={styles.emptyButtonText}>Raise a New Ticket</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={tickets}
              keyExtractor={(item) => item.id}
              renderItem={renderTicket}
              scrollEnabled={false}
              contentContainerStyle={styles.ticketsList}
            />
          )}
        </View>
      </ScrollView>

      {tickets.length > 0 && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary, shadowColor: colors.primary, bottom: Math.max(insets.bottom + 24, 24) }]}
          onPress={() => navigation.navigate('CreateTicket' as any)}
          activeOpacity={0.8}
        >
          <Icon name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    marginTop: 10,
  },
  ticketsSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourcesList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  ticketsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  ticketCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketCategory: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ticketDate: {
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
    borderStyle: 'dashed',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyButtonIcon: {
    marginRight: 8,
  },
  emptyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HelpCenterScreen;
