"use client";

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface ShareButtonProps {
    postId: string | null;
    onPublish: () => Promise<string>;
    disabled?: boolean;
}

export function ShareButton({ postId, onPublish, disabled = false }: ShareButtonProps) {
    const { t } = useI18n();
    const [isPublishing, setIsPublishing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    const handlePublishAndShare = async () => {
        if (disabled || isPublishing) return;

        setIsPublishing(true);
        try {
            const id = await onPublish();
            const url = `${window.location.origin}/p/${id}`;
            setShareUrl(url);
            setShowSuccess(true);

            // Copy to clipboard
            await navigator.clipboard.writeText(url);

            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Publish failed:', error);
            alert('Failed to publish');
        } finally {
            setIsPublishing(false);
        }
    };

    const handleCopy = async () => {
        if (shareUrl) {
            await navigator.clipboard.writeText(shareUrl);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
    };

    return (
        <div className="space-y-2">
            {/* Publish Button */}
            {!postId ? (
                <button
                    onClick={handlePublishAndShare}
                    disabled={disabled || isPublishing}
                    className={`min-w-minTouch px-6 py-3 rounded-xl font-semibold text-sm
                     flex items-center justify-center gap-2 transition-all w-full
                     ${disabled || isPublishing
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-neonPink to-neonBlue text-white hover:shadow-lg hover:scale-105'
                        }`}
                >
                    {isPublishing ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Publishing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Publish & Share
                        </>
                    )}
                </button>
            ) : (
                /* Share Link Display */
                <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <input
                            type="text"
                            value={shareUrl || `${window.location.origin}/p/${postId}`}
                            readOnly
                            className="flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-400 outline-none"
                        />
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Copy link"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                    <a
                        href={shareUrl || `/p/${postId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center px-4 py-2 text-sm text-neonBlue hover:text-neonPink transition-colors"
                    >
                        View Public Page →
                    </a>
                </div>
            )}

            {/* Success Message */}
            {showSuccess && (
                <div className="text-center text-sm text-neonGreen animate-fade-in">
                    ✓ Link copied to clipboard!
                </div>
            )}
        </div>
    );
}
