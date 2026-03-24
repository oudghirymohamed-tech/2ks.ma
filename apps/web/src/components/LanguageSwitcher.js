import { jsx as _jsx } from "react/jsx-runtime";
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/format';
const languages = [
    { value: 'en', label: 'EN' },
    { value: 'fr', label: 'FR' },
    { value: 'ar', label: 'AR' }
];
export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    return (_jsx("div", { className: "inline-flex rounded-full border border-sapphire/30 bg-powder/55 p-1 shadow-sm backdrop-blur", children: languages.map((item) => (_jsx("button", { type: "button", onClick: () => setLanguage(item.value), className: cn('rounded-full px-3 py-1.5 text-sm font-semibold transition', language === item.value ? 'bg-sapphire text-white' : 'text-navy/80 hover:text-sapphire'), "aria-pressed": language === item.value, children: item.label }, item.value))) }));
}
