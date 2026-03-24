import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types/demo';
import { cn } from '../utils/format';

const languages: Array<{ value: Language; label: string }> = [
    { value: 'en', label: 'EN' },
    { value: 'ar', label: 'AR' }
];

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="inline-flex rounded-full border border-sapphire/30 bg-powder/55 p-1 shadow-sm backdrop-blur">
            {languages.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => setLanguage(item.value)}
                    className={cn(
                        'rounded-full px-3 py-1.5 text-sm font-semibold transition',
                        language === item.value ? 'bg-sapphire text-white' : 'text-navy/80 hover:text-sapphire'
                    )}
                    aria-pressed={language === item.value}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
