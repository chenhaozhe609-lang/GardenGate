"use client";

import { useI18n } from '@/lib/i18n/i18n-context';

export function LanguageSwitcher() {
    const { locale, setLocale } = useI18n();

    return (
        <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
            <button
                onClick={() => setLocale('zh')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${locale === 'zh'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                aria-label="Switch to Chinese"
            >
                中文
            </button>
            <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${locale === 'en'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                aria-label="Switch to English"
            >
                EN
            </button>
        </div>
    );
}
