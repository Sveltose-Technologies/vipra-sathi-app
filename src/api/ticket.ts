import { axiosInstance } from './axios';

export interface CreateTicketPayload {
  userId: string;
  categoryId: string; // The category name will be passed here as there's no dynamic category API
  subject: string;
  description: string;
  remarks?: string;
  status: 'Pending' | 'Resolved' | 'Closed';
  adminId?: string;
}

export interface UpdateTicketPayload extends Partial<CreateTicketPayload> {}

export const ticketApi = {
  create: async (payload: CreateTicketPayload) => {
    const response = await axiosInstance.post('/support-ticket/create', payload);
    return response.data;
  },

  update: async (id: string, payload: UpdateTicketPayload) => {
    const response = await axiosInstance.put(`/support-ticket/update/${id}`, payload);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/support-ticket/delete/${id}`);
    return response.data;
  },

  getByUserId: async (userId: string) => {
    const response = await axiosInstance.get(`/support-ticket/get-by-userid/${userId}`);
    return response.data;
  },

  getByAdminId: async (adminId: string) => {
    const response = await axiosInstance.get(`/support-ticket/get-by-adminid/${adminId}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/support-ticket-category/get-all');
    return response.data;
  }
};
