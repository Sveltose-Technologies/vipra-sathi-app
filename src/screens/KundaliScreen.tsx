import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import CustomHeader from '../components/CustomHeader';
import { Feather as Icon } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Kundali'>;

const KundaliScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [brideDetails, setBrideDetails] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [groomDetails, setGroomDetails] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [createDetails, setCreateDetails] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [activeTab, setActiveTab] = useState<'match' | 'create'>('create');

  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [currentPickerField, setCurrentPickerField] = useState<{ person: 'bride' | 'groom' | 'create', field: 'dob' | 'tob' } | null>(null);

  const renderInput = (
    label: string, 
    value: string, 
    onChangeText: (text: string) => void, 
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.textLight }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          { 
            backgroundColor: colors.surface, 
            borderColor: colors.border, 
            color: colors.text 
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight + '80'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  const renderDateTimePicker = (
    label: string, 
    value: string, 
    person: 'bride' | 'groom' | 'create', 
    field: 'dob' | 'tob',
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.textLight }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.input, 
          { 
            backgroundColor: colors.surface, 
            borderColor: colors.border, 
            justifyContent: 'center'
          }
        ]}
        onPress={() => {
          setPickerMode(field === 'dob' ? 'date' : 'time');
          setCurrentPickerField({ person, field });
          setPickerVisible(true);
        }}
      >
        <Text style={{ color: value ? colors.text : colors.textLight + '80', fontSize: 16 }}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <CustomHeader title="Kundali" showBack={true} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'create' ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }]}
          onPress={() => setActiveTab('create')}
        >
          <Text style={[styles.tabText, activeTab === 'create' ? { color: '#FFF' } : { color: colors.textLight }]}>Create Kundali</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'match' ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }]}
          onPress={() => setActiveTab('match')}
        >
          <Text style={[styles.tabText, activeTab === 'match' ? { color: '#FFF' } : { color: colors.textLight }]}>Kundali Matching</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'match' ? (
          <>
            {/* Bride Details Section */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.sectionHeader}>
                <Icon name="user" size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Bride Details</Text>
              </View>
              
              {renderInput('Name', brideDetails.name, (text) => setBrideDetails({...brideDetails, name: text}), 'Enter Bride Name')}
              {renderDateTimePicker('Date of Birth', brideDetails.dob, 'bride', 'dob', 'DD/MM/YYYY')}
              {renderDateTimePicker('Time of Birth', brideDetails.tob, 'bride', 'tob', 'HH:MM AM/PM')}
              {renderInput('Place of Birth', brideDetails.place, (text) => setBrideDetails({...brideDetails, place: text}), 'City, State')}
            </View>

            {/* Groom Details Section */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.sectionHeader}>
                <Icon name="user" size={20} color={colors.secondary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Groom Details</Text>
              </View>
              
              {renderInput('Name', groomDetails.name, (text) => setGroomDetails({...groomDetails, name: text}), 'Enter Groom Name')}
              {renderDateTimePicker('Date of Birth', groomDetails.dob, 'groom', 'dob', 'DD/MM/YYYY')}
              {renderDateTimePicker('Time of Birth', groomDetails.tob, 'groom', 'tob', 'HH:MM AM/PM')}
              {renderInput('Place of Birth', groomDetails.place, (text) => setGroomDetails({...groomDetails, place: text}), 'City, State')}
            </View>

            <TouchableOpacity 
              style={[styles.matchBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('KundaliMatchingResult')}
            >
              <Text style={styles.matchBtnText}>Match Kundali</Text>
              <Icon name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Create Kundali Section */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.sectionHeader}>
                <Icon name="star" size={20} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Birth Details</Text>
              </View>
              
              {renderInput('Name', createDetails.name, (text) => setCreateDetails({...createDetails, name: text}), 'Enter Full Name')}
              {renderDateTimePicker('Date of Birth', createDetails.dob, 'create', 'dob', 'DD/MM/YYYY')}
              {renderDateTimePicker('Time of Birth', createDetails.tob, 'create', 'tob', 'HH:MM AM/PM')}
              {renderInput('Place of Birth', createDetails.place, (text) => setCreateDetails({...createDetails, place: text}), 'City, State')}
            </View>

            <TouchableOpacity 
              style={[styles.matchBtn, { backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('KundaliGenerated', {
                name: createDetails.name || 'John Doe',
                dob: createDetails.dob || '01/01/1990',
                tob: createDetails.tob || '12:00 PM',
                place: createDetails.place || 'Mumbai, MH'
              })}
            >
              <Text style={styles.matchBtnText}>Generate Kundali</Text>
              <Icon name="sparkles" size={20} color="#FFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <DatePicker
        modal
        open={pickerVisible}
        date={new Date()}
        mode={pickerMode}
        onConfirm={(date) => {
          setPickerVisible(false);
          let formattedValue = '';
          if (pickerMode === 'date') {
            formattedValue = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
          } else {
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutes = String(date.getMinutes()).padStart(2, '0');
            formattedValue = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
          }
          
          if (currentPickerField) {
            const { person, field } = currentPickerField;
            if (person === 'bride') setBrideDetails(prev => ({ ...prev, [field]: formattedValue }));
            if (person === 'groom') setGroomDetails(prev => ({ ...prev, [field]: formattedValue }));
            if (person === 'create') setCreateDetails(prev => ({ ...prev, [field]: formattedValue }));
          }
        }}
        onCancel={() => {
          setPickerVisible(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  matchBtn: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  matchBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default KundaliScreen;
