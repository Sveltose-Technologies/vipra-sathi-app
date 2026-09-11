import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { Feather as Icon } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const BG_COLOR = '#FDF0E6';

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to',
    brand: 'Vipra Sathi',
    description:
      'Your digital companion for daily spiritual practices, poojas, and panchang.',
    image: require('../assets/images/onboarding_1.jpg'),
    isFirst: true,
  },
  {
    id: '2',
    title: 'Daily Panchang\n& Muhurt',
    description:
      'Stay updated with accurate daily panchang, auspicious timings, and personalized alerts.',
    image: require('../assets/images/onboarding_2.jpg'),
    isFirst: false,
  },
  {
    id: '3',
    title: 'Library of\nMantras & Poojas',
    description:
      'Access a vast library of aartis, stotrams, and complete pooja guidelines.',
    image: require('../assets/images/onboarding_3.jpg'),
    isFirst: false,
  },
];

const OnboardingScreen = () => {
  const { continueAsGuest, completeOnboardingFlow } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboardingFlow();
    }
  };

  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => {
    if (item.isFirst) {
      return (
        <View style={[styles.slide, { width }]}>
          <Text style={styles.skipPlaceholder} />
          <Image
            source={require('../../logo.png')}
            style={styles.slideLogo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeLabel}>{item.title}</Text>
          <Text style={styles.brandName}>{item.brand}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
          <View style={styles.imageWrapper}>
            <Image
              source={item.image}
              style={styles.slideImage}
              resizeMode="cover"
            />
            {/* Curved bottom overlay */}
            <View style={styles.curveContainer}>
              <View style={styles.curve1} />
              <View style={styles.curve2} />
              <View style={styles.curve3} />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.imageContainerOther}>
          <Image
            source={item.image}
            style={styles.slideImageOther}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={continueAsGuest}
        style={[styles.skipButton, { top: insets.top + 12 }]}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? '#C75B12' : '#E5D5C3',
                },
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextText}>
            {currentIndex === SLIDES.length - 1 ? 'Login / Signup' : 'Next'}
          </Text>
          <Icon
            name={
              currentIndex === SLIDES.length - 1 ? 'log-in' : 'arrow-right'
            }
            size={20}
            color="#FFF"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C75B12',
  },
  skipPlaceholder: {
    height: 40,
  },
  slide: {
    alignItems: 'center',
    paddingTop: 10,
  },
  slideLogo: {
    width: 130,
    height: 120,
    marginBottom: 8,
  },
  welcomeLabel: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  brandName: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#C75B12',
    marginBottom: 12,
  },
  slideDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    paddingHorizontal: 40,
    lineHeight: 24,
    marginBottom: 8,
  },
  imageWrapper: {
    width: width,
    height: height * 0.46,
    position: 'relative',
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  curveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  curve1: {
    width: width * 0.5,
    height: 50,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    position: 'absolute',
    bottom: 0,
    left: -20,
  },
  curve2: {
    width: width * 0.45,
    height: 40,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    position: 'absolute',
    bottom: 0,
    right: -10,
  },
  curve3: {
    width: width * 0.3,
    height: 30,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    position: 'absolute',
    bottom: 0,
    left: width * 0.35,
  },
  imageContainerOther: {
    width: width * 0.85,
    height: height * 0.45,
    marginBottom: 30,
  },
  slideImageOther: {
    width: '100%',
    height: '100%',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  footer: {
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 28,
    borderRadius: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#C75B12',
    width: '100%',
    shadowColor: '#C75B12',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;
