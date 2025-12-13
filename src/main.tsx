import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { init } from '@tma.js/sdk-react'
import { retrieveRawInitData } from '@tma.js/bridge';
import { useUserStore, transformTelegramUser, type TelegramUser } from './stores/UserStore';

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

      if (telegramUser) {
        // Преобразуем Telegram пользователя в ваш формат
        const user = transformTelegramUser(telegramUser);
        setUser(user);
        console.log('Transformed user:', user);
      } else {
        // Тестовый пользователь если нет Telegram
        const testUser = {
          id: 'test-123',
          userName: 'test_username',
          firstName: 'Test',
          lastName: 'User',
          telegramId: '123456789',
          phone: '+79991234567',
          photoUrl: '',
        };
        setUser(testUser);
      }
    })();
  }, [setUser]);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);