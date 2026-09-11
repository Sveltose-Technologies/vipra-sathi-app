import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const BG_COLOR = '#FDF0E6';

const LoginScreen = ({ navigation }: any) => {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Number',
        text2: 'Please enter a valid 10-digit mobile number',
      });
      return;
    }
    navigation.navigate('VerifyOtp', { mobile: mobileNumber });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Background temple watermark */}
        <Image
          source={require('../assets/images/onboarding_1.jpg')}
          style={styles.bgTemple}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', BG_COLOR + 'DD', BG_COLOR]}
          style={styles.bgOverlay}
        />

        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>Vipra Sathi</Text>

          {/* Lotus Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.lotusContainer}>
              <Icon name="sun" size={16} color="#C75B12" />
            </View>
            <View style={styles.dividerLine} />
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Enter your mobile number{'\n'}to get started
          </Text>

          {/* Mobile Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <View style={styles.phoneIconContainer}>
                <Icon name="phone" size={18} color="#C75B12" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={mobileNumber}
                onChangeText={(text) =>
                  setMobileNumber(text.replace(/[^0-9]/g, ''))
                }
                maxLength={10}
              />
            </View>
          </View>

          {/* Get OTP Button */}
          <TouchableOpacity
            style={styles.otpButton}
            onPress={handleSendOtp}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#C75B12', '#E8944A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.otpButtonGradient}
            >
              <Text style={styles.otpButtonText}>Get OTP</Text>
              <Icon name="arrow-right" size={20} color="#FFF" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Secure Badge */}
          <View style={styles.secureContainer}>
            <View style={styles.secureLine} />
            <View style={styles.secureContent}>
              <Icon name="shield" size={14} color="#16A34A" />
              <Text style={styles.secureText}>Your data is secure with us</Text>
            </View>
            <View style={styles.secureLine} />
          </View>

          {/* Guest option */}
          <TouchableOpacity style={styles.guestBtn}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

          {/* Bottom Temple Illustration */}
          <View style={styles.bottomSection}>
            <Image
              source={require('../assets/images/onboarding_1.jpg')}
              style={styles.templeBottom}
              resizeMode="cover"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bgTemple: {
    position: 'absolute',
    top: 20,
    right: -30,
    width: width * 0.7,
    height: height * 0.42,
    opacity: 0.1,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 110,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  brandText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#C75B12',
    marginBottom: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '50%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5A872',
  },
  lotusContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 28,
  },
  inputSection: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8DDD4',
    overflow: 'hidden',
  },
  phoneIconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF5EE',
    borderRightWidth: 1,
    borderRightColor: '#E8DDD4',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  otpButton: {
    width: '100%',
    marginTop: 8,
    borderRadius: 30,
    overflow: 'hidden',
  },
  otpButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  otpButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  secureLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5A872',
  },
  secureContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 6,
  },
  secureText: {
    fontSize: 12,
    color: '#6B7280',
  },
  guestBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  guestText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    alignItems: 'center',
    marginTop: 16,
    paddingBottom: 10,
  },
  templeBottom: {
    width: width,
    height: 160,
    opacity: 0.2,
  },
});

export default LoginScreen;
