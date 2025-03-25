import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

// 语言资源
const resources = {
  en: {
    public: {
      back: "back",
      submit: "submit"
    }
  },
  zh: {
    public: {
      back: "返回",
      submit: "提交"
    }
  }
};

// 初始化 i18n
i18n.use(LanguageDetector).use(initReactI18next).init({
  detection: {
    order: ['localStorage', 'cookie', 'navigator'], // 检测顺序
    caches: ['localStorage', 'cookie'] // 语言存储到 localStorage 和 cookie
  },
  resources,
  lng: "zh", // 默认语言
  fallbackLng: "en", // 备用语言
  interpolation: {
    escapeValue: false // 防止 XSS
  }
});

export default i18n;
