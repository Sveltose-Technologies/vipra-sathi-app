import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title?: string;
  icon?: string;
  isHome?: boolean;
  notificationCount?: number;
  onNotificationPress?: () => void;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  icon,
  isHome,
  notificationCount = 0,
  onNotificationPress,
  showBack = false,
  showThemeToggle = false,
}) => {
  const { colors, isDark, setTheme } = useTheme();
  const navigation = useNavigation();

  const iconColor = isDark ? '#FFF' : '#1E293B';
  const textColor = isDark ? '#FFF' : '#1E293B';

  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={{ backgroundColor: colors.background, paddingTop: insets.top }}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        {isHome ? (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.titleContainer}>
            {showBack && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <View style={[styles.backBtnCircle, { backgroundColor: isDark ? '#334155' : '#F3E8DB' }]}>
                  <Icon name="arrow-left" size={20} color={textColor} />
                </View>
              </TouchableOpacity>
            )}
            {icon && !showBack && (
              <View style={[styles.headerIconCircle, { backgroundColor: colors.primary + '15' }]}>
                <Icon name={icon} size={20} color={colors.primary} />
              </View>
            )}
            <Text style={[styles.titleText, { color: textColor }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          </View>
        )}

        <View style={styles.rightActions}>
          {showThemeToggle && (
            <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}>
              <Icon name={isDark ? 'sun' : 'moon'} size={18} color={iconColor} />
            </TouchableOpacity>
          )}

          {isHome && (
            <TouchableOpacity style={styles.iconBtn} onPress={onNotificationPress}>
              <Icon name="bell" size={18} color={iconColor} />
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 140,
    height: 48,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  backBtnCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E8DB',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: '#DC2626',
    width: 17,
    height: 17,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
