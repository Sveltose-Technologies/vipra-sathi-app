import AsyncStorage from '@react-native-async-storage/async-storage';

export interface YajmanApiPayload {
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
  categoryId?: string; // Send category name string for now
  date?: string; // kycDate
  remark?: string;
}

const STORAGE_KEY = '@yajmans_data';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const yajmanApi = {
  create: async (data: YajmanApiPayload) => {
    await delay(500);
    const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    const newYajman = {
      ...data,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newYajman, ...existing]));
    return { data: newYajman };
  },
  
  update: async (id: string, data: Partial<YajmanApiPayload>) => {
    await delay(500);
    const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
    let existing = existingStr ? JSON.parse(existingStr) : [];
    
    const index = existing.findIndex((y: any) => y._id === id || y.id === id);
    if (index === -1) throw new Error('Yajman not found');
    
    const updated = {
      ...existing[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    existing[index] = updated;
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return { data: updated };
  },
  
  delete: async (id: string) => {
    await delay(500);
    const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
    let existing = existingStr ? JSON.parse(existingStr) : [];
    
    existing = existing.filter((y: any) => y._id !== id && y.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return { success: true };
  },
  
  getById: async (id: string) => {
    await delay(500);
    const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    const found = existing.find((y: any) => y._id === id || y.id === id);
    if (!found) throw new Error('Yajman not found');
    return { data: found };
  },
  
  getAll: async () => {
    await delay(500);
    const existingStr = await AsyncStorage.getItem(STORAGE_KEY);
    return { data: existingStr ? JSON.parse(existingStr) : [] };
  }
};
