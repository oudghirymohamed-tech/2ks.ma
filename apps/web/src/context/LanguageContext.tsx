import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { messages } from '../data/messages';
import type { Language } from '../types/demo';

const LANGUAGE_STORAGE_KEY = 'hayatid_language';

function getInitialLanguage(): Language {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'fr' || saved === 'ar') {
        return saved;
    }

    return 'en';
}

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    copy: Record<string, string>;
    direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }, [language]);

    const value = useMemo<LanguageContextValue>(
        () => ({
            language,
            setLanguage: (nextLanguage) => setLanguageState(nextLanguage),
            copy: messages[language],
            direction: language === 'ar' ? 'rtl' : 'ltr'
        }),
        [language]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider');
    }

    return context;
}
