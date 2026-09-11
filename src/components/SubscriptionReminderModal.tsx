import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SubscriptionReminderModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const { isGuest } = useAuth();
  const navigation = useNavigation<any>();

  // Assuming user has no subscription for now to show the modal
  const hasSubscription = false;

  useEffect(() => {
    if (hasSubscription) return;

    const interval = setInterval(() => {
      setIsVisible(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, 200000); // 20 seconds

    return () => clearInterval(interval);
  }, [hasSubscription, scaleAnim]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const handleSubscribe = () => {
    handleClose();
    navigation.navigate('Subscription');
  };

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { backgroundColor: colors.surface, transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Icon name="x" size={24} color={colors.textLight} />
          </TouchableOpacity>

          <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
            <Icon name="award" size={40} color="#FFF" />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Unlock Premium</Text>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>
            Get access to all poojas, personalized kundalis, and advanced panchangs by subscribing today!
          </Text>

          <TouchableOpacity style={[styles.subscribeButton, { backgroundColor: colors.primary }]} onPress={handleSubscribe}>
            <Text style={styles.subscribeText}>Subscribe Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  subscribeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  subscribeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionReminderModal;
