import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
