import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Тип пользователя
export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName?: string;
  telegramId: string;
  phone?: string;
  photoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, error: null }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      clearUser: () => set({ user: null }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'user-storage', // имя для localStorage
      // Можно исключить некоторые поля из сохранения
      // partialize: (state) => ({ user: state.user }),
    }
  )
);

// Создайте хуки для удобства
export const useUser = () => useUserStore((state) => state.user);
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useClearUser = () => useUserStore((state) => state.clearUser);
export const useUpdateUser = () => useUserStore((state) => state.updateUser);
export const useIsLoading = () => useUserStore((state) => state.isLoading);