"use client";

import { AspectRatio } from '@/lib/safe-area-calculator';
import { useI18n } from '@/lib/i18n/i18n-context';

interface AspectRatioToggleProps {
    value: AspectRatio;
    onChange: (ratio: AspectRatio) => void;
}

export function AspectRatioToggle({ value, onChange }: AspectRatioToggleProps) {
    const { t } = useI18n();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('aspectRatio')}:
            </span>
            <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                <button
                    onClick={() => onChange('3:4')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${value === '3:4'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    title={t('redNoteMode')}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="7" y="4" width="10" height="16" rx="2" strokeWidth="2" />
                    </svg>
                    3:4
                </button>
                <button
                    onClick={() => onChange('9:16')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${value === '9:16'
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    title={t('douyinMode')}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="9" y="3" width="6" height="18" rx="1" strokeWidth="2" />
                    </svg>
                    9:16
                </button>
            </div>
        </div>
    );
}
