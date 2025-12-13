import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { init } from '@tma.js/sdk-react'
import { retrieveRawInitData } from '@tma.js/bridge';

try {
  init()
} catch (error) {
  console.log(error);
}

const Root = () => {

  useEffect(() => {
    (async () => {
      let telegramUser = null;

      try {
        const queryString = retrieveRawInitData();
        console.log('Telegram init data:', queryString);

        if (queryString) {
          const decodedString = decodeURIComponent(queryString);
          const params = new URLSearchParams(decodedString);
          const userJson = params.get('user');

          if (userJson) {
            telegramUser = JSON.parse(decodeURIComponent(userJson));
            console.log('Telegram user:', telegramUser);
          }
        }
      } catch (error) {
        console.error('Error parsing Telegram data:', error);
      }

      // // Используем тестовые данные если нет Telegram
      // const userData = await apiClient.post<IDataUser>('users', {
      //   userName: telegramUser?.username || 'test_username',
      //   firstName: telegramUser?.first_name || 'Test',
      //   lastName: telegramUser?.last_name || 'User',
      //   telegramId: telegramUser?.id ? String(telegramUser.id) : '123456789',
      //   phone: telegramUser?.phone_number || '+79991234567',
      //   photoUrl: telegramUser?.photo_url || '',
      // });

      // setUser(userData.data);
    })();
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);