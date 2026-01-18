"use client";

import { useState } from 'react';
import { useSettings } from '@/lib/settings/settings-context';
import { useI18n } from '@/lib/i18n/i18n-context';

interface SettingsPanelProps {
    onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
    const { settings, updateSettings, resetSettings } = useSettings();
    const { t } = useI18n();
    const [localSettings, setLocalSettings] = useState(settings);

    const handleSave = () => {
        updateSettings(localSettings);
        onClose();
    };

    const handleReset = () => {
        if (confirm('Reset all settings to default?')) {
            resetSettings();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('settings')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Handle Setting */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('brandHandle')}
                        </label>
                        <input
                            type="text"
                            value={localSettings.handle}
                            onChange={(e) => setLocalSettings({ ...localSettings, handle: e.target.value })}
                            placeholder={t('handlePlaceholder')}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-neonBlue focus:border-transparent transition-all"
                        />
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Your brand handle will appear on generated images
                        </p>
                    </div>

                    {/* Brand Type Setting */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('brandType')}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setLocalSettings({ ...localSettings, brandType: 'domain' })}
                                className={`p-4 rounded-xl border-2 transition-all ${localSettings.brandType === 'domain'
                                        ? 'border-neonBlue bg-neonBlue/10 dark:bg-neonBlue/20'
                                        : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className="text-2xl mb-2">🌐</div>
                                <div className="font-semibold text-gray-900 dark:text-white">{t('domain')}</div>
                            </button>
                            <button
                                onClick={() => setLocalSettings({ ...localSettings, brandType: 'qrcode' })}
                                className={`p-4 rounded-xl border-2 transition-all ${localSettings.brandType === 'qrcode'
                                        ? 'border-neonBlue bg-neonBlue/10 dark:bg-neonBlue/20'
                                        : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                                    }`}
                            >
                                <div className="text-2xl mb-2">📱</div>
                                <div className="font-semibold text-gray-900 dark:text-white">{t('qrCode')}</div>
                            </button>
                        </div>
                    </div>

                    {/* Custom Domain Setting (shown when domain is selected) */}
                    {localSettings.brandType === 'domain' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Custom Domain
                            </label>
                            <input
                                type="text"
                                value={localSettings.customDomain}
                                onChange={(e) => setLocalSettings({ ...localSettings, customDomain: e.target.value })}
                                placeholder="your-domain.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-neonBlue focus:border-transparent transition-all"
                            />
                        </div>
                    )}

                    {/* Export Quality Setting */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Export Quality
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map((scale) => (
                                <button
                                    key={scale}
                                    onClick={() => setLocalSettings({ ...localSettings, exportScale: scale })}
                                    className={`p-3 rounded-xl border-2 transition-all ${localSettings.exportScale === scale
                                            ? 'border-neonGreen bg-neonGreen/10 dark:bg-neonGreen/20'
                                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <div className="font-bold text-lg text-gray-900 dark:text-white">{scale}x</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {scale === 1 ? 'Standard' : scale === 2 ? 'HD' : 'Ultra HD'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-6 flex gap-3">
                    <button
                        onClick={handleReset}
                        className="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-neonGreen to-neonBlue hover:shadow-lg hover:scale-105 transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
