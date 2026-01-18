"use client";

import { useI18n } from '@/lib/i18n/i18n-context';
import { useState, useEffect, useRef } from 'react';
import { useClipboardSniffer } from '@/hooks/useClipboardSniffer';

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
    maxHeight?: string;
    enableClipboardSniffer?: boolean;
}

export function TextEditor({
    value,
    onChange,
    placeholder,
    minHeight = '200px',
    maxHeight = '500px',
    enableClipboardSniffer = true,
}: TextEditorProps) {
    const { t } = useI18n();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = useState(0);
    const [showClipboardHint, setShowClipboardHint] = useState(false);

    // Clipboard sniffer
    const { clipboardText, isLoading, hasPermission, requestPermission } = useClipboardSniffer({
        enabled: enableClipboardSniffer,
        onSuccess: (text) => {
            if (!value && text) {
                onChange(text);
                setShowClipboardHint(true);
                setTimeout(() => setShowClipboardHint(false), 3000);
            }
        },
        onError: (error) => {
            console.warn('Clipboard sniffer error:', error);
        },
    });

    // Update character count
    useEffect(() => {
        setCharCount(value.length);
    }, [value]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="relative w-full">
            {/* Clipboard hint */}
            {showClipboardHint && (
                <div className="absolute -top-12 left-0 right-0 z-10 animate-fade-in">
                    <div className="bg-neonGreen text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm font-medium inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {t('copied')}
                    </div>
                </div>
            )}

            {/* Loading state */}
            {isLoading && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neonBlue"></div>
                </div>
            )}

            {/* Textarea */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={placeholder || t('inputPlaceholder')}
                className="w-full px-4 py-3 rounded-xl 
                   bg-gray-50 dark:bg-gray-900 
                   border-2 border-gray-200 dark:border-gray-800
                   focus:border-neonBlue dark:focus:border-neonBlue
                   text-gray-900 dark:text-white
                   placeholder:text-gray-400 dark:placeholder:text-gray-600
                   transition-all duration-200
                   resize-none overflow-hidden
                   focus:outline-none focus:ring-2 focus:ring-neonBlue/20"
                style={{
                    minHeight,
                    maxHeight,
                    fontFamily: 'var(--font-noto-sans-sc), sans-serif',
                }}
                enterKeyHint="done"
            />

            {/* Character count and clipboard permission */}
            <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex items-center gap-3">
                    {/* Character count */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('charCount')}: <span className="font-mono font-semibold">{charCount}</span>
                    </div>

                    {/* Clipboard permission status */}
                    {enableClipboardSniffer && hasPermission === false && (
                        <button
                            onClick={requestPermission}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-neonBlue 
                       dark:hover:text-neonBlue underline transition-colors"
                        >
                            Enable clipboard auto-fill
                        </button>
                    )}

                    {hasPermission === true && (
                        <div className="text-xs text-neonGreen flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Auto-fill active
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
