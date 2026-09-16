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
    }, 200000);
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

          {/* Header accent bar */}
          <View style={[styles.accentBar, { backgroundColor: colors.primary }]} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <View style={[styles.closeBtnBg, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
              <Icon name="x" size={18} color={colors.textLight} />
            </View>
          </TouchableOpacity>

          {/* Icon */}
          <View style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}>
            <View style={[styles.iconInner, { backgroundColor: colors.primary }]}>
              <Icon name="award" size={28} color="#FFF" />
            </View>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Unlock Premium</Text>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>
            Get access to all poojas, personalized kundalis, and advanced panchangs.
          </Text>

          {/* Feature bullets */}
          <View style={styles.featureList}>
            {['All Pooja Guides', 'Personalized Kundali', 'Advanced Panchang'].map((feat, i) => (
              <View key={i} style={styles.featureRow}>
                <View style={[styles.featureDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.featureText, { color: colors.text }]}>{feat}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.subscribeButton, { backgroundColor: colors.primary }]}
            onPress={handleSubscribe}
            activeOpacity={0.8}
          >
            <Text style={styles.subscribeText}>Subscribe Now</Text>
            <Icon name="arrow-right" size={18} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 1,
  },
  closeBtnBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },
  iconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 21,
    paddingHorizontal: 16,
  },
  featureList: {
    width: '100%',
    paddingHorizontal: 28,
    marginBottom: 24,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subscribeButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  subscribeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SubscriptionReminderModal;
