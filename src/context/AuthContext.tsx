import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  user: { uid: string; mobileNumber: string } | null;
  login: (uid: string, mobileNumber: string) => Promise<void>;
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
  const [user, setUser] = useState<{ uid: string; mobileNumber: string } | null>(null);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const guestStatus = await AsyncStorage.getItem('is_guest');
      if (guestStatus === 'true') {
        setIsGuest(true);
      }

      const uid = await AsyncStorage.getItem('user_uid');
      const mobileNumber = await AsyncStorage.getItem('user_mobile');
      
      if (uid && mobileNumber) {
        setUser({ uid, mobileNumber });
        setIsAuthenticated(true);
      }
    } catch (e) {
      // AsyncStorage may fail on some platforms - continue without persistence
      console.warn('AsyncStorage not available, running without persistence');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (uid: string, mobileNumber: string) => {
    try {
      await AsyncStorage.setItem('user_uid', uid);
      await AsyncStorage.setItem('user_mobile', mobileNumber);
      await AsyncStorage.removeItem('is_guest');
    } catch (e) {
      // Continue without persistence
    }
    setUser({ uid, mobileNumber });
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_uid');
      await AsyncStorage.removeItem('user_mobile');
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

