"use client";

import { useI18n } from '@/lib/i18n/i18n-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
    const { t } = useI18n();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-deepNavy/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-neonGreen to-neonBlue rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">G</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                {t('title')}
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {t('tagline')}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
