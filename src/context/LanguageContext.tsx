'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '../locales/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: { code: Language; label: string; short: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languagesList: { code: Language; label: string; short: string; flag: string }[] = [
  { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
  { code: 'uz', label: 'O‘zbek', short: 'UZ', flag: '🇺🇿' },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ruslan_ai_lang') as Language;
      if (saved && (saved === 'en' || saved === 'ru' || saved === 'uz')) {
        setCurrentLanguageState(saved);
      }
    } catch (e) {
      // ignore in SSR or blocked localStorage
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem('ruslan_ai_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      // ignore
    }
  };

  const t = translations[currentLanguage] || translations.en;

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages: languagesList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
