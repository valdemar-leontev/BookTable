import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Тип для данных от Telegram (snake_case)
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  phone_number?: string;
  allows_write_to_pm?: boolean;
  is_premium?: boolean;
  language_code?: string;
}

// Тип пользователя в вашем приложении (camelCase)
export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName?: string;
  telegramId: string;
  phone?: string;
  photoUrl?: string;
  isPremium?: boolean;
  languageCode?: string;
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

// Функция для преобразования Telegram пользователя в ваш формат
export const transformTelegramUser = (tgUser: TelegramUser): User => {
  return {
    id: `tg-${tgUser.id}`,
    userName: tgUser.username || '',
    firstName: tgUser.first_name,
    lastName: tgUser.last_name,
    telegramId: String(tgUser.id),
    phone: tgUser.phone_number,
    photoUrl: tgUser.photo_url,
    isPremium: tgUser.is_premium,
    languageCode: tgUser.language_code,
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