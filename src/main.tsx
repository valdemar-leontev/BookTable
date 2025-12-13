import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { init } from '@telegram-apps/sdk-react'
import { retrieveRawInitData } from '@telegram-apps/bridge';

try {
  init()
} catch (error) {
  console.log(error);
}

const Root = () => {

  useEffect(() => {
    (async () => {
      let telegramUser;

      try {
        const queryString = retrieveRawInitData();
        console.log(queryString);

        const decodedString = decodeURIComponent(queryString!);
        const params = new URLSearchParams(decodedString);
        const userJson = params.get('user');
        telegramUser = JSON.parse(decodeURIComponent(userJson as any));

        console.log(telegramUser);
      } catch (error) {
        console.log("SOME ERROR");

        console.log(error);
      }

      // const user = await apiClient.post<IDataUser>('users', {
      //   userName: telegramUser ? telegramUser.username : 'test username',
      //   firstName: telegramUser ? telegramUser.first_name : 'test first_name',
      //   lastName: telegramUser ? telegramUser.last_name : 'test last_name',
      //   telegramId: telegramUser ? String(telegramUser.id) : String(1235986704),
      //   phone: telegramUser ? String(telegramUser.phone) : String(8951000000),
      //   photoUrl: telegramUser ? String(telegramUser.photo_url) : String(8951000000),
      // })

      // setUser(user.data);
    })()
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);