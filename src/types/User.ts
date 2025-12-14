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

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName?: string;
  telegramId: string;
  phoneNumber?: string;
  role?: string;
}