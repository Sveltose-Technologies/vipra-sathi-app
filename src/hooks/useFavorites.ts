import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const FAVORITES_KEY = 'user_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavs = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      let updatedFavs = [...favorites];
      if (updatedFavs.includes(id)) {
        updatedFavs = updatedFavs.filter(favId => favId !== id);
      } else {
        updatedFavs.push(id);
      }
      setFavorites(updatedFavs);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavs));
      
      // Automatic Backup Strategy: Trigger a background sync here
      syncSettingsWithServer(updatedFavs);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error saving favorite' });
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Mock server sync
  const syncSettingsWithServer = (currentFavs: string[]) => {
    // In a real app, this would be an API call, e.g.:
    // axios.post('/api/user/settings', { favorites: currentFavs })
    // For now, it silently simulates a backup.
    console.log('Background sync: Backup completed for favorites', currentFavs);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
