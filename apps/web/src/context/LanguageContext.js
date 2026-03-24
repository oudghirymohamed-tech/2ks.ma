import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { messages } from '../data/messages';
const LanguageContext = createContext(undefined);
export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState('en');
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);
    const value = useMemo(() => ({
        language,
        setLanguage: (nextLanguage) => setLanguageState(nextLanguage),
        copy: messages[language],
        direction: language === 'ar' ? 'rtl' : 'ltr'
    }), [language]);
    return _jsx(LanguageContext.Provider, { value: value, children: children });
}
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider');
    }
    return context;
}
