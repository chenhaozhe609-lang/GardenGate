"use client";

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { exportAndDownload } from '@/lib/image-export';

interface ExportButtonProps {
    targetElementId: string;
    filename?: string;
    scale?: number;
    disabled?: boolean;
}

export function ExportButton({
    targetElementId,
    filename = 'garden-gate-export.png',
    scale = 2,
    disabled = false,
}: ExportButtonProps) {
    const { t } = useI18n();
    const [isExporting, setIsExporting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleExport = async () => {
        if (disabled || isExporting) return;

        setIsExporting(true);
        try {
            await exportAndDownload(targetElementId, filename, { scale });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Export failed:', error);
            alert(t('error'));
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative">
            {showSuccess && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 animate-fade-in">
                    <div className="bg-neonGreen text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
                        ✓ {t('success')}
                    </div>
                </div>
            )}

            <button
                onClick={handleExport}
                disabled={disabled || isExporting}
                className={`min-w-minTouch px-6 py-3 rounded-xl font-semibold text-sm
                   flex items-center justify-center gap-2 transition-all
                   ${disabled || isExporting
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-neonGreen to-neonBlue text-white hover:shadow-lg hover:scale-105'
                    }`}
            >
                {isExporting ? (
                    <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('generating')}
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('download')}
                    </>
                )}
            </button>

            {scale > 1 && !disabled && !isExporting && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    {scale}x HD
                </div>
            )}
        </div>
    );
}
