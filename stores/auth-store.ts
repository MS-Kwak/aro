import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  storeId: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setStoreId: (storeId: string | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  storeId: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setStoreId: (storeId) => set({ storeId }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ user: null, storeId: null, isLoading: false }),
}));
