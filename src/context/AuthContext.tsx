import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  mobileNumber: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  user: UserProfile | null;
  login: (userData: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  completeOnboardingFlow: () => Promise<void>;
  exitGuestToLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isGuest: false,
  isLoading: true,
  hasSeenOnboarding: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  continueAsGuest: async () => {},
  completeOnboardingFlow: async () => {},
  exitGuestToLogin: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const guestStatus = await AsyncStorage.getItem('is_guest');
      if (guestStatus === 'true') {
        setIsGuest(true);
      }

      const id = await AsyncStorage.getItem('user_id');
      const mobileNumber = await AsyncStorage.getItem('user_mobile');
      const fullName = await AsyncStorage.getItem('user_fullName') || '';
      const displayName = await AsyncStorage.getItem('user_displayName') || '';
      const email = await AsyncStorage.getItem('user_email') || '';
      const role = await AsyncStorage.getItem('user_role') || 'user';
      
      if (id && mobileNumber) {
        setUser({ id, mobileNumber, fullName, displayName, email, role });
        setIsAuthenticated(true);
      }
    } catch (e) {
      // AsyncStorage may fail on some platforms - continue without persistence
      console.warn('AsyncStorage not available, running without persistence');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: UserProfile) => {
    try {
      await AsyncStorage.setItem('user_id', userData.id);
      await AsyncStorage.setItem('user_mobile', userData.mobileNumber);
      await AsyncStorage.setItem('user_fullName', userData.fullName || '');
      await AsyncStorage.setItem('user_displayName', userData.displayName || '');
      await AsyncStorage.setItem('user_email', userData.email || '');
      await AsyncStorage.setItem('user_role', userData.role || 'user');
      await AsyncStorage.removeItem('is_guest');
    } catch (e) {
      // Continue without persistence
    }
    setUser(userData);
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('user_mobile');
      await AsyncStorage.removeItem('user_fullName');
      await AsyncStorage.removeItem('user_displayName');
      await AsyncStorage.removeItem('user_email');
      await AsyncStorage.removeItem('user_role');
      await AsyncStorage.removeItem('is_guest');
      await AsyncStorage.removeItem('has_seen_onboarding');
    } catch (e) {
      // Continue without persistence
    }
    setUser(null);
    setIsAuthenticated(false);
    setIsGuest(false);
    setHasSeenOnboarding(false);
  };

  const continueAsGuest = async () => {
    try {
      await AsyncStorage.setItem('is_guest', 'true');
    } catch (e) {
      // Continue without persistence
    }
    setHasSeenOnboarding(true);
    setIsGuest(true);
  };

  const completeOnboardingFlow = async () => {
    setHasSeenOnboarding(true);
  };

  const exitGuestToLogin = async () => {
    try {
      await AsyncStorage.removeItem('is_guest');
    } catch (e) {
      // Continue without persistence
    }
    setIsGuest(false);
    setHasSeenOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isGuest, isLoading, hasSeenOnboarding, user, login, logout, continueAsGuest, completeOnboardingFlow, exitGuestToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

