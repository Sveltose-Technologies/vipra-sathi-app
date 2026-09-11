import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ticket, TicketCategory, TicketStatus } from '../types/ticket';
import Toast from 'react-native-toast-message';

const TICKETS_STORAGE_KEY = '@support_tickets';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem(TICKETS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTickets(parsed.sort((a: Ticket, b: Ticket) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Failed to load tickets', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const addTicket = async (payload: Omit<Ticket, 'id' | 'status' | 'createdAt'>) => {
    try {
      const newTicket: Ticket = {
        ...payload,
        id: Date.now().toString(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      const updatedTickets = [newTicket, ...tickets];
      await AsyncStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(updatedTickets));
      setTickets(updatedTickets);
      
      Toast.show({
        type: 'success',
        text1: 'Ticket Submitted',
        text2: 'Your support ticket has been raised successfully.',
      });
      
      return newTicket;
    } catch (error) {
      console.error('Failed to add ticket', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to submit ticket. Please try again.',
      });
      throw error;
    }
  };

  return {
    tickets,
    isLoading,
    refreshTickets: loadTickets,
    addTicket,
  };
};
