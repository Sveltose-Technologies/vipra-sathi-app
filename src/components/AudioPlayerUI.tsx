import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, AppState, AppStateStatus } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Feather as Icon } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';

interface AudioPlayerUIProps {
  title: string;
  audioUrl?: string;
}

const AudioPlayerUI: React.FC<AudioPlayerUIProps> = ({ title, audioUrl }) => {
  const { colors, isDark } = useTheme();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Handle playback status updates
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    
    setElapsed((status.positionMillis || 0) / 1000);
    setDuration((status.durationMillis || 1000) / 1000);
    
    if (status.didJustFinish) {
      if (isRepeat) {
        soundRef.current?.replayAsync();
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Initialize and load sound
  useEffect(() => {
    if (!audioUrl) return;

    let isCancelled = false;

    const loadSound = async () => {
      setIsLoading(true);
      
      // Unload previous sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        
        if (!isCancelled) {
          soundRef.current = sound;
          setIsLoading(false);
        } else {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log('Failed to load the sound', error);
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadSound();

    return () => {
      isCancelled = true;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [audioUrl]);

  // Handle Play/Pause logic
  useEffect(() => {
    const togglePlayback = async () => {
      if (!soundRef.current || isLoading) return;

      if (isPlaying) {
        await soundRef.current.playAsync();
      } else {
        await soundRef.current.pauseAsync();
      }
    };

    togglePlayback();
  }, [isPlaying, isLoading]);

  // Handle Slow Mode
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setRateAsync(isSlowMode ? 0.75 : 1.0, true);
    }
  }, [isSlowMode]);

  // Handle Repeat Mode
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setIsLoopingAsync(isRepeat);
    }
  }, [isRepeat]);

  // Update playback status callback when isRepeat changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  }, [isRepeat]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (elapsed / duration) * 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [elapsed, duration]);

  // Stop playback when app goes to background
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState.match(/inactive|background/) && isPlaying && soundRef.current) {
        soundRef.current.pauseAsync();
        setIsPlaying(false);
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const togglePlay = async () => {
    if (isLoading || !soundRef.current) return;
    
    // If finished and we press play, restart
    if (!isPlaying && elapsed >= duration - 1) {
      await soundRef.current.setPositionAsync(0);
      setElapsed(0);
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.surface : '#FFF' }]}>
      
      <View style={styles.mainContent}>
        {/* Album Art Icon */}
        <View style={[styles.albumArt, { backgroundColor: colors.primary + '20' }]}>
          <Icon name="music" size={24} color={colors.primary} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.nowPlaying, { color: colors.textLight }]}>
            {isLoading ? 'Loading...' : isPlaying ? 'Playing' : 'Paused'} • {formatTime(elapsed)} / {formatTime(duration)}
          </Text>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
        </View>
        
        <View style={styles.controlsContainer}>
          {/* Slow Mode Button */}
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => setIsSlowMode(!isSlowMode)}
            disabled={isLoading}
          >
            <Text style={[
              styles.slowModeText, 
              { 
                color: isSlowMode ? colors.primary : colors.textLight,
                fontWeight: isSlowMode ? 'bold' : 'normal',
                opacity: isLoading ? 0.5 : 1
              }
            ]}>
              0.75x
            </Text>
          </TouchableOpacity>

          {/* Play/Pause Button */}
          <TouchableOpacity 
            style={[
              styles.playButton, 
              { 
                backgroundColor: isLoading ? colors.border : colors.primary,
                shadowColor: colors.primary 
              }
            ]}
            onPress={togglePlay}
            disabled={isLoading}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={24} color="#FFF" style={!isPlaying && !isLoading ? { marginLeft: 3 } : {}} />
          </TouchableOpacity>

          {/* Repeat Button */}
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => setIsRepeat(!isRepeat)}
            disabled={isLoading}
          >
            <Icon name="repeat" size={20} color={isRepeat ? colors.primary : colors.textLight} style={{ opacity: isLoading ? 0.5 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar at the bottom of the card */}
      <View style={styles.progressBarContainer}>
        <Animated.View 
          style={[
            styles.progressBarFill, 
            { 
              backgroundColor: colors.primary,
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressBarFill: {
    height: '100%',
  },
  mainContent: {
    padding: 16,
    paddingBottom: 20, // Leave space for progress bar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  nowPlaying: {
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  slowModeText: {
    fontSize: 12,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  }
});

export default AudioPlayerUI;
