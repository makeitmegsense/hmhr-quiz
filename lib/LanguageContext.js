'use client';

import { createContext, useContext } from 'react';
import { translations, DEFAULT_LANG } from './i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const lang = DEFAULT_LANG;
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
