import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Feather as Icon } from '@expo/vector-icons';
import { CalendarEvent, EventStatus } from '../types/calendar';
import { generateMockCalendarEvents } from '../data/mockCalendar';
import EventModal from '../components/EventModal';
import CustomHeader from '../components/CustomHeader';

const STATUS_COLORS: Record<EventStatus, string> = {
  upcoming: '#16A34A',
  done: '#2563EB',
  cancelled: '#DC2626',
  festival: '#F59E0B',
};

const CalendarScreen = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockCalendarEvents());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState<string>(new Date().toISOString().split('T')[0].substring(0, 7));

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const selectedEvents = events.filter(e => e.date === selectedDate);

  const markedDates = useMemo(() => {
    const marked: Record<string, any> = {};

    events.forEach(event => {
      if (!marked[event.date]) {
        marked[event.date] = { dots: [] };
      }
      marked[event.date].dots.push({
        key: event.id,
        color: STATUS_COLORS[event.status],
      });
    });

    if (marked[selectedDate]) {
      marked[selectedDate] = { ...marked[selectedDate], selected: true, selectedColor: colors.primary + '30' };
    } else {
      marked[selectedDate] = { selected: true, selectedColor: colors.primary + '30' };
    }

    return marked;
  }, [events, selectedDate, colors]);

  const monthlyStats = useMemo(() => {
    const monthEvents = events.filter(e => e.date.startsWith(currentMonth));
    const totalBookings = monthEvents.length;
    const busyDays = new Set(monthEvents.map(e => e.date)).size;
    const daysInMonth = new Date(parseInt(currentMonth.split('-')[0]), parseInt(currentMonth.split('-')[1]), 0).getDate();
    const freeDays = daysInMonth - busyDays;

    return { totalBookings, busyDays, freeDays };
  }, [events, currentMonth]);

  const handleSaveEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...eventData } : e));
    } else {
      const newEvent: CalendarEvent = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setModalVisible(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <CustomHeader title={t('tabs.calendar', 'Calendar')} icon="calendar" showThemeToggle={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Calendar Grid */}
        <View style={[styles.calendarWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Calendar
            current={selectedDate}
            onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
            onMonthChange={(month: DateData) => setCurrentMonth(month.dateString.substring(0, 7))}
            markingType={'multi-dot'}
            markedDates={markedDates}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: colors.textLight,
              dayTextColor: colors.text,
              todayTextColor: colors.primary,
              selectedDayTextColor: colors.primary,
              monthTextColor: colors.text,
              arrowColor: colors.primary,
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
            }}
            style={styles.calendar}
          />
        </View>

        {/* Monthly Summary */}
        <View style={styles.summaryContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('calendar.monthly_summary', 'Monthly Summary')}</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.statIconContainer, { backgroundColor: colors.primary + '15' }]}>
                <Icon name="calendar" size={18} color={colors.primary} />
              </View>
              <Text style={[styles.statValue, { color: colors.primary }]}>{monthlyStats.totalBookings}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Total Events</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.statIconContainer, { backgroundColor: '#DC2626' + '15' }]}>
                <Icon name="alert-circle" size={18} color="#DC2626" />
              </View>
              <Text style={[styles.statValue, { color: '#DC2626' }]}>{monthlyStats.busyDays}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Busy Days</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={[styles.statIconContainer, { backgroundColor: '#16A34A' + '15' }]}>
                <Icon name="check-circle" size={18} color="#16A34A" />
              </View>
              <Text style={[styles.statValue, { color: '#16A34A' }]}>{monthlyStats.freeDays}</Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>Free Days</Text>
            </View>
          </View>
        </View>

        {/* Selected Day Summary */}
        <View style={styles.summaryContainer}>
          <View style={[styles.daySummaryCard, { backgroundColor: colors.primary }]}>
            <View style={styles.daySummaryContent}>
              <View style={styles.daySummaryIconContainer}>
                <Icon name="calendar" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.daySummaryDate}>
                  {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Text>
                <Text style={styles.daySummaryText}>
                  {selectedEvents.length === 0
                    ? 'No tasks scheduled for this day'
                    : `You have ${selectedEvents.length} task${selectedEvents.length > 1 ? 's' : ''} today`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Agenda */}
        <View style={styles.agendaContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t('calendar.agenda_for', 'Agenda for')} {selectedDate}
          </Text>

          {selectedEvents.length === 0 ? (
            <View style={[styles.noEventsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Icon name="inbox" size={32} color={colors.textLight} />
              <Text style={[styles.noEventsText, { color: colors.textLight }]}>
                No events scheduled for this day.
              </Text>
            </View>
          ) : (
            selectedEvents.map(event => (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, { backgroundColor: colors.surface, borderLeftColor: STATUS_COLORS[event.status] }]}
                onPress={() => openEditModal(event)}
                activeOpacity={0.7}
              >
                <View style={styles.eventHeader}>
                  <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                  <Text style={[styles.eventTime, { color: colors.textLight }]}>{event.time}</Text>
                </View>
                <View style={styles.eventFooter}>
                  <Text style={[styles.eventType, { color: colors.textLight }]}>
                    {event.type.toUpperCase()}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[event.status] + '20' }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[event.status] }]}>
                      {event.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                {event.description && (
                  <Text style={[styles.eventDesc, { color: colors.textLight }]} numberOfLines={2}>
                    {event.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: '#1E293B' }]}
        onPress={openAddModal}
        activeOpacity={0.9}
      >
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>

      <EventModal
        visible={modalVisible}
        selectedDate={selectedDate}
        initialData={editingEvent}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  scrollContent: {
    paddingBottom: 20,
  },
  calendarWrapper: {
    margin: 16,
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
  calendar: {
    marginBottom: 0,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  daySummaryCard: {
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  daySummaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daySummaryIconContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginRight: 14,
  },
  daySummaryDate: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  daySummaryText: {
    color: '#FFF',
    fontSize: 13,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  agendaContainer: {
    paddingHorizontal: 16,
  },
  noEventsCard: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  noEventsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventCard: {
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: { elevation: 1 },
    }),
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  eventTime: {
    fontSize: 13,
    fontWeight: '600',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  eventDesc: {
    fontSize: 13,
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
});

export default CalendarScreen;
