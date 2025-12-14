import type { TelegramUser, User } from '@/types/User';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Функция для преобразования Telegram пользователя в ваш формат
export const transformTelegramUser = (tgUser: TelegramUser): User => {
  return {
    id: tgUser.id.toString(),
    username: tgUser.username || '',
    firstName: tgUser.first_name,
    lastName: tgUser.last_name,
    telegramId: String(tgUser.id),
    phoneNumber: tgUser.phone_number,
  };
};

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
      name: 'user-storage',
    }
  )
);

// Создайте хуки для удобства
export const useUser = () => useUserStore((state) => state.user);
export const useSetUser = () => useUserStore((state) => state.setUser);
export const useClearUser = () => useUserStore((state) => state.clearUser);
export const useUpdateUser = () => useUserStore((state) => state.updateUser);
export const useIsLoading = () => useUserStore((state) => state.isLoading);