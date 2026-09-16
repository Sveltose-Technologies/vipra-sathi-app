import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Feather as Icon } from '@expo/vector-icons';
import CustomDropdown from '../components/CustomDropdown';

type EarningEntryRouteProp = RouteProp<RootStackParamList, 'EarningEntry'>;

const EARNING_CATEGORIES = [
  'Dakshina',
  'Karmkand',
  'Astrology',
  'Puja Path',
  'Jyotish Consultation',
  'Vastu Consulting',
  'Hastarekha',
  'Numerology',
  'Tarot Reading',
  'Other Income',
];

const EarningEntryScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<EarningEntryRouteProp>();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const defaultCategory = route.params?.defaultCategory || 'Dakshina';

  const [formData, setFormData] = useState({
    source: '',
    category: defaultCategory,
    amount: '',
    remark: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.source.trim()) newErrors.source = t('validation.required', 'This field is required');
    if (!formData.amount.trim() || isNaN(Number(formData.amount))) newErrors.amount = t('validation.validAmount', 'Enter a valid amount');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.goBack();
    }, 500);
  };

  const renderInput = (
    field: keyof typeof formData,
    label: string,
    placeholder: string,
    options?: { keyboardType?: 'numeric' | 'default', multiline?: boolean, prefix?: string }
  ) => (
    <View style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.text }]}>{label} {errors[field] && <Text style={styles.errorText}>*</Text>}</Text>
      <View style={[
        styles.inputWrapper,
        { backgroundColor: colors.surface, borderColor: errors[field] ? '#ef4444' : colors.border },
        options?.multiline && styles.textAreaWrapper
      ]}>
        {options?.prefix && <Text style={[styles.prefix, { color: colors.textLight }]}>{options.prefix}</Text>}
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            options?.multiline && styles.textArea,
            options?.prefix && { paddingLeft: 4 }
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={formData[field]}
          onChangeText={(text) => {
            setFormData({ ...formData, [field]: text });
            if (errors[field]) setErrors({ ...errors, [field]: '' });
          }}
          keyboardType={options?.keyboardType || 'default'}
          multiline={options?.multiline}
          textAlignVertical={options?.multiline ? 'top' : 'center'}
        />
      </View>
      {errors[field] && <Text style={styles.errorMsg}>{errors[field]}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.earning} translucent={true} />
      
      <View style={[styles.header, { backgroundColor: colors.earning, paddingTop: Math.max(insets.top, 14) }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: '#FFF' }]}>
          {t('accountManager.addEarning', 'Add Earning')}
        </Text>
        <View style={styles.headerBtnPlaceholder} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.section}>
          {renderInput('amount', t('accountManager.amount', 'Amount'), '0.00', { keyboardType: 'numeric', prefix: '₹' })}
          {renderInput('source', t('accountManager.sourceOfReceiving', 'Source of Receiving'), 'e.g. Yajman Name or Event')}
          
          <CustomDropdown
            label={t('accountManager.category', 'Category')}
            value={formData.category}
            options={EARNING_CATEGORIES}
            onSelect={(val) => setFormData({ ...formData, category: val })}
          />

          {renderInput('remark', t('accountManager.remark', 'Remark'), 'Add any notes (optional)', { multiline: true })}
        </View>

      </ScrollView>

      <View style={[styles.bottomActions, { backgroundColor: colors.surface, borderTopColor: colors.border, paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.earning }]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          <Text style={styles.saveBtnText}>
            {isSubmitting ? t('common.saving', 'Saving...') : t('common.save', 'Save Entry')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 20,
  },
  headerBtn: {
    padding: 4,
  },
  headerBtnPlaceholder: {
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
  },
  textAreaWrapper: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  prefix: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  textArea: {
    height: '100%',
  },
  errorText: {
    color: '#ef4444',
  },
  errorMsg: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  bottomActions: {
    padding: 16,
    borderTopWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveBtn: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  }
});

export default EarningEntryScreen;
