import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { messages } from '../data/messages';
import type { Language } from '../types/demo';

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    copy: Record<string, string>;
    direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('fr');

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
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
