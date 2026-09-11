import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@pooja_favorites';
const NOTES_PREFIX = '@pooja_notes_';

export const usePoojaLibrary = (poojaId?: string) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadFavorites();
    if (poojaId) {
      loadNotes(poojaId);
    } else {
      setIsReady(true);
    }
  }, [poojaId]);

  const loadFavorites = async () => {
    try {
      const storedFavs = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavs) {
        setFavorites(new Set(JSON.parse(storedFavs)));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  const loadNotes = async (id: string) => {
    try {
      const storedNotes = await AsyncStorage.getItem(`${NOTES_PREFIX}${id}`);
      if (storedNotes) {
        setNotes(storedNotes);
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    } finally {
      setIsReady(true);
    }
  };

  const toggleFavorite = useCallback(async (sectionId: string) => {
    setFavorites(prevFavs => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(sectionId)) {
        newFavs.delete(sectionId);
      } else {
        newFavs.add(sectionId);
      }
      
      // Save to AsyncStorage
      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavs))).catch(e => {
        console.error('Failed to save favorites', e);
      });
      
      return newFavs;
    });
  }, []);

  const saveNotes = useCallback(async (id: string, newNotes: string) => {
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem(`${NOTES_PREFIX}${id}`, newNotes);
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, []);

  return {
    favorites,
    toggleFavorite,
    notes,
    saveNotes,
    isReady,
  };
};
