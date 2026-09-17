import { useState, useCallback, useEffect } from 'react';
import { Ticket, TicketStatus } from '../types/ticket';
import Toast from 'react-native-toast-message';
import { ticketApi } from '../api/ticket';
import { useAuth } from '../context/AuthContext';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadTickets = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await ticketApi.getByUserId(user.id);
      if (res && res.data) {
        setTickets(res.data.sort((a: Ticket, b: Ticket) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else if (Array.isArray(res)) {
        setTickets(res.sort((a: Ticket, b: Ticket) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Failed to load tickets', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const addTicket = async (payload: Pick<Ticket, 'categoryId' | 'subject' | 'description' | 'remarks'>) => {
    if (!user?.id) throw new Error('User not authenticated');
    
    try {
      const newTicket = await ticketApi.create({
        ...payload,
        userId: user.id,
        status: 'Pending',
      });

      // API might return data wrapped
      const addedTicket = newTicket.data || newTicket;
      
      setTickets(prev => [addedTicket, ...prev]);
      
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
