import { axiosInstance } from './axios';

export interface YajmanApiPayload {
  userId: string;
  name: string;
  email?: string;
  callingMobileNumber: string;
  whatsappMobileNumber?: string;
  birthday?: string;
  anniversary?: string;
  yearlyFixedProgramDate?: string;
  city?: string;
  state?: string;
  address?: string;
  categoryId?: string[]; 
  date?: string; // kycDate
  remark?: string;
}

export const yajmanApi = {
  create: async (data: YajmanApiPayload) => {
    const response = await axiosInstance.post('/yajman-entry/create', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<YajmanApiPayload>) => {
    const response = await axiosInstance.put(`/yajman-entry/update/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/yajman-entry/delete/${id}`);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await axiosInstance.get(`/yajman-entry/get-by-id/${id}`);
    return response.data;
  },
  
  getByUserId: async (userId: string) => {
    const response = await axiosInstance.get(`/yajman-entry/get-by-userId/${userId}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/yajman-category/get-all');
    return response.data;
  }
};
