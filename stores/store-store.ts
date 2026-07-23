import { create } from 'zustand';

interface StoreInfo {
  id: string;
  name: string;
  business_type: string;
  address: string;
  phone?: string;
  operating_hours?: string;
  image_url?: string;
  stamp_goal: number;
  reward_name: string;
  qr_code: string;
  plan: 'free' | 'premium';
}

interface StoreState {
  store: StoreInfo | null;
  setStore: (store: StoreInfo | null) => void;
  updateStore: (partial: Partial<StoreInfo>) => void;
}

export const useStoreStore = create<StoreState>((set) => ({
  store: null,
  setStore: (store) => set({ store }),
  updateStore: (partial) =>
    set((state) => ({
      store: state.store ? { ...state.store, ...partial } : null,
    })),
}));
