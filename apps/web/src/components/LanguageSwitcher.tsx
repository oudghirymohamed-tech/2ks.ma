import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types/demo';
import { cn } from '../utils/format';

const languages: Array<{ value: Language; label: string }> = [
    { value: 'en', label: 'EN' },
    { value: 'fr', label: 'FR' },
    { value: 'ar', label: 'AR' }
];

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="inline-flex rounded-full border border-sapphire/30 bg-powder/55 p-1 shadow-sm backdrop-blur transition hover:border-sapphire/45 hover:shadow-md">
            {languages.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => setLanguage(item.value)}
                    className={cn(
                        'min-h-[36px] rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-sm',
                        language === item.value ? 'scale-[1.02] bg-sapphire text-white shadow-[0_8px_18px_rgba(15,82,186,0.28)]' : 'text-navy/80 hover:bg-white/70 hover:text-sapphire'
                    )}
                    aria-pressed={language === item.value}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
