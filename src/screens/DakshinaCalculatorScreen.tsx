import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Share } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../components/CustomHeader';
import DatePicker from 'react-native-date-picker';

const DakshinaCalculatorScreen = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const [poojaName, setPoojaName] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [calendarMode, setCalendarMode] = useState<'start' | 'end'>('start');

  const [acharyaPerDay, setAcharyaPerDay] = useState('');
  const [panditPerDay, setPanditPerDay] = useState('');
  const [samagriAmount, setSamagriAmount] = useState('');
  const [transportAmount, setTransportAmount] = useState('');

  // Calculate days inclusively
  let calculatedDays = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    calculatedDays = diffDays >= 0 ? diffDays + 1 : 0;
  } else if (startDate || endDate) {
    calculatedDays = 1; // At least 1 day if one is selected
  }

  const A = calculatedDays;
  const B = parseFloat(acharyaPerDay) || 0;
  const C = parseFloat(panditPerDay) || 0;
  const D = parseFloat(samagriAmount) || 0;
  const E = parseFloat(transportAmount) || 0;

  const acharyaTotal = A * B;
  const panditTotal = A * C;
  const finalAmount = acharyaTotal + panditTotal;
  const totalAmount = finalAmount + D + E;

  const handleShare = async () => {
    const msg = `Dakshina Calculation${poojaName ? '\nPooja: ' + poojaName : ''}\n\nTotal Days: ${calculatedDays}\nAcharya/Day: ₹${B}\nPandit/Day: ₹${C}\n\nAcharya Total: ₹${acharyaTotal.toFixed(2)}\nPandit Total: ₹${panditTotal.toFixed(2)}\nPooja Final: ₹${finalAmount.toFixed(2)}${D > 0 ? '\nSamagri: ₹' + D.toFixed(2) : ''}${E > 0 ? '\nTransport: ₹' + E.toFixed(2) : ''}\n\nGrand Total: ₹${totalAmount.toFixed(2)}\n\n- Vipra Saarthi`;
    try {
      await Share.share({ message: msg, title: 'Dakshina Calculation' });
    } catch {}
  };

  const handleDateConfirm = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (calendarMode === 'start') {
      setStartDate(formattedDate);
      if (endDate && new Date(endDate) < date) {
        setEndDate(formattedDate);
      }
    } else {
      setEndDate(formattedDate);
      if (startDate && new Date(startDate) > date) {
        setStartDate(formattedDate);
      }
    }
    setPickerVisible(false);
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: string,
    placeholder: string,
    optional: boolean = false,
    flex: number = 1
  ) => (
    <View style={[styles.inputContainer, { flex }]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>{label}</Text>
        {optional && <Text style={[styles.optionalBadge, { color: colors.textLight }]}>{t('dakshina_calc.optional', 'Opt')}</Text>}
      </View>
      <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Icon name={icon} size={16} color={colors.primary} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          keyboardType={icon === 'file-text' ? 'default' : 'numeric'}
        />
      </View>
    </View>
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader title={t('dakshina_calc.title', 'Dakshina Calculator')} icon="dollar-sign" showThemeToggle={true} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.header}>
            <Text style={[styles.subtitle, { color: colors.textLight }]}>
              {t('dakshina_calc.subtitle', 'Calculate pooja dakshina with dates and additional expenses.')}
            </Text>
          </View> */}

          {/* Pooja Details */}
          <View style={styles.section}>
            {renderInput(t('dakshina_calc.pooja_name', 'Pooja Name'), poojaName, setPoojaName, 'file-text', 'e.g., Satyanarayan Pooja')}

            <View style={styles.datesRow}>
              <View style={styles.datePickerContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Start Date</Text>
                <TouchableOpacity
                  style={[styles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => { setCalendarMode('start'); setPickerVisible(true); }}
                >
                  <Icon name="calendar" size={16} color={colors.primary} style={styles.inputIcon} />
                  <Text style={[styles.dateText, { color: startDate ? colors.text : colors.textLight }]} numberOfLines={1}>
                    {formatDate(startDate)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: 12 }} />

              <View style={styles.datePickerContainer}>
                <Text style={[styles.label, { color: colors.text }]}>End Date</Text>
                <TouchableOpacity
                  style={[styles.dateButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                  onPress={() => { setCalendarMode('end'); setPickerVisible(true); }}
                >
                  <Icon name="calendar" size={16} color={colors.primary} style={styles.inputIcon} />
                  <Text style={[styles.dateText, { color: endDate ? colors.text : colors.textLight }]} numberOfLines={1}>
                    {formatDate(endDate)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.daysBadge, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
              <Icon name="clock" size={18} color={colors.primaryDark} />
              <Text style={[styles.daysBadgeText, { color: colors.primaryDark }]}>
                Total Pooja Days: {calculatedDays}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Per Day Amounts - Side by Side */}
          <View style={styles.row}>
            {renderInput(t('dakshina_calc.acharya_amt', 'Acharya / Day'), acharyaPerDay, setAcharyaPerDay, 'user', 'e.g., 2100')}
            <View style={{ width: 12 }} />
            {renderInput(t('dakshina_calc.pandit_amt', 'Pandit / Day'), panditPerDay, setPanditPerDay, 'users', 'e.g., 1100')}
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Optional Amounts - Side by Side */}
          <View style={styles.row}>
            {renderInput(t('dakshina_calc.samagri_amt', 'Samagri'), samagriAmount, setSamagriAmount, 'shopping-bag', 'e.g., 5000', true)}
            <View style={{ width: 12 }} />
            {renderInput(t('dakshina_calc.transport_amt', 'Transport'), transportAmount, setTransportAmount, 'truck', 'e.g., 1000', true)}
          </View>

          <View style={[styles.resultCard, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
            <View style={styles.resultHeader}>
              <Icon name="file-text" size={20} color="#FFF" />
              <Text style={styles.resultTitle}>{t('dakshina_calc.summary', 'Calculation Summary')}</Text>
              <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
                <Icon name="share-2" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>

            {poojaName ? (
              <Text style={styles.poojaNameTitle}>{poojaName}</Text>
            ) : null}

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('dakshina_calc.acharya_total', 'Acharya Total')} ({calculatedDays}d)</Text>
              <Text style={styles.resultValue}>₹{acharyaTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t('dakshina_calc.pandit_total', 'Pandit Total')} ({calculatedDays}d)</Text>
              <Text style={styles.resultValue}>₹{panditTotal.toFixed(2)}</Text>
            </View>
            <View style={[styles.resultRow, styles.resultRowHighlight]}>
              <Text style={styles.resultLabelBold}>{t('dakshina_calc.pooja_final', 'Pooja Final Amount')}</Text>
              <Text style={styles.resultValueBold}>₹{finalAmount.toFixed(2)}</Text>
            </View>

            {(D > 0 || E > 0) && (
              <>
                {D > 0 && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{t('dakshina_calc.samagri', 'Samagri')}</Text>
                    <Text style={styles.resultValue}>+ ₹{D.toFixed(2)}</Text>
                  </View>
                )}
                {E > 0 && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>{t('dakshina_calc.transportation', 'Transportation')}</Text>
                    <Text style={styles.resultValue}>+ ₹{E.toFixed(2)}</Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.grandTotalContainer}>
              <Text style={styles.grandTotalLabel}>{t('dakshina_calc.grand_total', 'Grand Total')}</Text>
              <Text style={styles.grandTotalValue}>₹{totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      <DatePicker
        modal
        open={pickerVisible}
        date={
          calendarMode === 'start' && startDate
            ? new Date(startDate)
            : calendarMode === 'end' && endDate
              ? new Date(endDate)
              : new Date()
        }
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setPickerVisible(false)}
        minimumDate={calendarMode === 'end' && startDate ? new Date(startDate) : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 12 },
  header: { alignItems: 'center', marginBottom: 14, marginTop: 4 },
  subtitle: { fontSize: 11, textAlign: 'center', lineHeight: 16, paddingHorizontal: 16 },
  section: { marginBottom: 2 },
  divider: { height: 1, marginVertical: 8, opacity: 0.3 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  inputContainer: { marginBottom: 8, flex: 1 },
  labelContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  label: { fontSize: 11, fontWeight: '600' },
  optionalBadge: { fontSize: 9, fontStyle: 'italic' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, height: 40 },
  inputIcon: { marginRight: 6 },
  input: { flex: 1, fontSize: 12, height: '100%' },

  datesRow: { flexDirection: 'row', marginBottom: 10, marginTop: 2 },
  datePickerContainer: { flex: 1 },
  dateButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, height: 40, marginTop: 4 },
  dateText: { fontSize: 12, flex: 1 },

  daysBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 8, borderWidth: 1 },
  daysBadgeText: { fontSize: 12, fontWeight: 'bold', marginLeft: 6 },

  resultCard: { borderRadius: 10, padding: 12, marginTop: 6, elevation: 4, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 5 },
  resultHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  resultTitle: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginLeft: 6, flex: 1 },
  shareBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poojaNameTitle: { color: '#FFF', fontSize: 14, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  resultRowHighlight: { marginTop: 2, marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
  resultLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 11 },
  resultValue: { color: '#FFF', fontSize: 11, fontWeight: '500' },
  resultLabelBold: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  resultValueBold: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  grandTotalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 8 },
  grandTotalLabel: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  grandTotalValue: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

});

export default DakshinaCalculatorScreen;
