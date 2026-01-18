"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, TranslationKey } from './translations';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('zh');

    // Load locale from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale | null;
        if (saved && (saved === 'zh' || saved === 'en')) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: TranslationKey): string => {
        return translations[locale][key] || key;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}
