import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { init } from '@tma.js/sdk-react'
import { retrieveRawInitData } from '@tma.js/bridge';
import { useUserStore, transformTelegramUser } from './stores/UserStore';
import type { TelegramUser, User } from './types/User';
import axios from 'axios';
import { API_URL } from './constants';

try {
  init()
} catch (error) {
  console.log(error);
}

const Root = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    (async () => {
      let telegramUser: TelegramUser | null = null;

      try {
        const queryString = retrieveRawInitData();
        console.log('Telegram init data:', queryString);

        if (queryString) {
          const decodedString = decodeURIComponent(queryString);
          const params = new URLSearchParams(decodedString);
          const userJson = params.get('user');

          if (userJson) {
            telegramUser = JSON.parse(decodeURIComponent(userJson)) as TelegramUser;
            console.log('Telegram user:', telegramUser);
          }
        }
      } catch (error) {
        console.error('Error parsing Telegram data:', error);
      }

      let user: User | null = null;

      if (!telegramUser) {
        user = {
          id: '1',
          username: 'valdemar_leontev test',
          firstName: 'vladimir test',
          lastName: 'leontev test',
          telegramId: '12345678933',
          phoneNumber: '+79991234567',
        } as User;
      }

      const { data } = await axios.post(`${API_URL}/api/user/get`, telegramUser ? transformTelegramUser(telegramUser) : user)

      setUser(data);
    })();
  }, [setUser]);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);