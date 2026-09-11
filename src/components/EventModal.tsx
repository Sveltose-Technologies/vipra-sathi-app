import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { CalendarEvent, EventType, EventStatus } from '../types/calendar';
import DatePicker from 'react-native-date-picker';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (id: string) => void;
  initialData?: CalendarEvent | null;
  selectedDate: string;
}

const EventModal: React.FC<EventModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialData,
  selectedDate
}) => {
  const { colors, isDark } = useTheme();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('pooja');
  const [status, setStatus] = useState<EventStatus>('upcoming');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setType(initialData.type);
      setStatus(initialData.status);
      setTime(initialData.time || '');
      setDescription(initialData.description || '');
    } else {
      resetForm();
    }
  }, [initialData, visible]);

  const resetForm = () => {
    setTitle('');
    setType('pooja');
    setStatus('upcoming');
    setTime('');
    setDescription('');
  };

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      date: initialData?.date || selectedDate,
      type,
      status,
      time: time.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>

          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.primary }]}>
            <Text style={[styles.headerTitle, { color: '#FFF' }]}>
              {initialData ? 'Edit Event' : 'Add Event'}
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Title Input */}
            <Text style={[styles.label, { color: colors.text }]}>Title</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
              placeholder="Event Title..."
              placeholderTextColor={colors.textLight}
              value={title}
              onChangeText={setTitle}
            />

            {/* Time Input */}
            <Text style={[styles.label, { color: colors.text }]}>Time</Text>
            <TouchableOpacity
              style={[
                styles.input,
                { borderColor: colors.border, backgroundColor: colors.surface, justifyContent: 'center' }
              ]}
              onPress={() => setTimePickerVisible(true)}
            >
              <Text style={{ color: time ? colors.text : colors.textLight, fontSize: 16 }}>
                {time || 'Select Time'}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={timePickerVisible}
              date={new Date()}
              mode="time"
              onConfirm={(date) => {
                setTimePickerVisible(false);
                let hours = date.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                const minutes = String(date.getMinutes()).padStart(2, '0');
                setTime(`${String(hours).padStart(2, '0')}:${minutes} ${ampm}`);
              }}
              onCancel={() => {
                setTimePickerVisible(false);
              }}
            />

            {/* Event Type Selector */}
            <Text style={[styles.label, { color: colors.text }]}>Event Type</Text>
            <View style={styles.segmentedControl}>
              {(['pooja', 'task', 'festival'] as EventType[]).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.segmentButton,
                    type === t && { backgroundColor: colors.primary },
                    { borderColor: colors.border }
                  ]}
                  onPress={() => setType(t)}
                >
                  <Text style={[
                    styles.segmentText,
                    { color: type === t ? '#FFF' : colors.text }
                  ]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Status Selector */}
            <Text style={[styles.label, { color: colors.text }]}>Status</Text>
            <View style={styles.segmentedControl}>
              {(['upcoming', 'done', 'cancelled'] as EventStatus[]).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[
                    styles.segmentButton,
                    status === s && { backgroundColor: colors.primary },
                    { borderColor: colors.border }
                  ]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={[
                    styles.segmentText,
                    { color: status === s ? '#FFF' : colors.text }
                  ]}>
                    {s === 'done' ? 'Done' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Description Input */}
            <Text style={[styles.label, { color: colors.text }]}>Description / Notes</Text>
            <TextInput
              style={[styles.textArea, { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface }]}
              placeholder="Additional details..."
              placeholderTextColor={colors.textLight}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Delete Button (Only if editing) */}
            {initialData && onDelete && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  onDelete(initialData.id);
                  onClose();
                }}
              >
                <Icon name="trash-2" size={20} color="#DC2626" />
                <Text style={styles.deleteText}>Delete Event</Text>
              </TouchableOpacity>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { borderColor: colors.primary, borderWidth: 1, backgroundColor: 'transparent' }]}
                onPress={onClose}
              >
                <Text style={[styles.cancelButtonText, { color: colors.primary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.saveButtonText, { color: '#FFF' }]}>Save</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    borderRadius: 20,
    maxHeight: '90%',
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  iconButton: { padding: 4 },
  content: { paddingHorizontal: 20, paddingBottom: 10 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  segmentText: { fontSize: 14, fontWeight: '500' },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#DC262615',
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default EventModal;
