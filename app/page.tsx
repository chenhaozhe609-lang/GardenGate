"use client";

import { Header } from "@/components/Header";
import { TextEditor } from "@/components/TextEditor";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { AspectRatioToggle } from "@/components/AspectRatioToggle";
import { ExportButton } from "@/components/ExportButton";
import { ShareButton } from "@/components/ShareButton";
import { useState, useEffect } from "react";
import { analyzeText } from "@/lib/layout-engine/detector";
import { useI18n } from "@/lib/i18n/i18n-context";
import { savePost, generatePostId } from "@/lib/post-storage";
import type { AspectRatio } from "@/lib/safe-area-calculator";
import type { Post } from "@/types/post";

export default function HomePage() {
    const { t } = useI18n();
    const [text, setText] = useState("");
    const [layoutInfo, setLayoutInfo] = useState<ReturnType<typeof analyzeText> | null>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('3:4');
    const [publishedPostId, setPublishedPostId] = useState<string | null>(null);

    // Analyze text when it changes
    useEffect(() => {
        if (text) {
            const info = analyzeText(text);
            setLayoutInfo(info);
        } else {
            setLayoutInfo(null);
        }
    }, [text]);

    // Reset published post ID when text changes
    useEffect(() => {
        if (text && publishedPostId) {
            setPublishedPostId(null);
        }
    }, [text]);

    const handlePublish = async (): Promise<string> => {
        const id = generatePostId();
        const post: Post = {
            id,
            text,
            mode: layoutInfo?.mode || 'bold-insight',
            aspectRatio,
            createdAt: Date.now(),
            handle: '@GardenGate',
            brandType: 'domain',
            customDomain: 'gardengate.app',
        };

        savePost(post);
        setPublishedPostId(id);
        return id;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-deepNavy">
            <Header />
            <main className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column: Editor */}
                        <div>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {t('title')}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('tagline')}
                                </p>
                            </div>

                            {/* Editor */}
                            <div className="mb-6">
                                <TextEditor
                                    value={text}
                                    onChange={setText}
                                    enableClipboardSniffer={true}
                                />
                            </div>

                            {/* Layout detection info */}
                            {layoutInfo && (
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-neonGreen animate-pulse"></div>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Layout Detection Active
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Mode:</span>
                                            <div className="font-semibold text-gray-900 dark:text-white mt-1">
                                                {layoutInfo.mode === 'bold-insight' && t('boldInsight')}
                                                {layoutInfo.mode === 'cheat-sheet' && t('cheatSheet')}
                                                {layoutInfo.mode === 'zen-writer' && t('zenWriter')}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Characters:</span>
                                            <div className="font-mono font-semibold text-neonBlue mt-1">
                                                {layoutInfo.charCount}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Lines:</span>
                                            <div className="font-mono font-semibold text-neonPink mt-1">
                                                {layoutInfo.lineCount}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Type:</span>
                                            <div className="font-semibold text-gray-900 dark:text-white mt-1">
                                                {layoutInfo.isList && '📝 List'}
                                                {layoutInfo.isShort && '💡 Short'}
                                                {layoutInfo.isLong && '📄 Long'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Preview */}
                        <div>
                            <div className="sticky top-24 space-y-4">
                                {/* Header with controls */}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <svg className="w-5 h-5 text-neonPink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Live Preview
                                    </h3>

                                    {text && (
                                        <ExportButton
                                            targetElementId="preview-canvas"
                                            filename={`garden-gate-${aspectRatio.replace(':', 'x')}-${Date.now()}.png`}
                                            scale={2}
                                            disabled={!text}
                                        />
                                    )}
                                </div>

                                {/* Aspect Ratio Toggle */}
                                {text && (
                                    <AspectRatioToggle
                                        value={aspectRatio}
                                        onChange={setAspectRatio}
                                    />
                                )}

                                {/* Preview Canvas */}
                                {text ? (
                                    <div className="flex justify-center">
                                        <div
                                            id="preview-canvas"
                                            className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-800"
                                            style={{
                                                maxWidth: '100%',
                                                width: 'fit-content',
                                            }}
                                        >
                                            <TemplateRenderer
                                                text={text}
                                                mode={layoutInfo?.mode || 'bold-insight'}
                                                aspectRatio={aspectRatio}
                                                handle="@GardenGate"
                                                brandType="domain"
                                                customDomain="gardengate.app"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-gray-400 dark:text-gray-600">
                                            Preview will appear here
                                        </p>
                                    </div>
                                )}

                                {/* Share Button */}
                                {text && (
                                    <ShareButton
                                        postId={publishedPostId}
                                        onPublish={handlePublish}
                                        disabled={!text}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Empty state - only show when no editor focus */}
                    {!text && (
                        <div className="text-center py-8 text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
                            <p className="text-sm">
                                💡 Try pasting some text to see the smart layout engine in action
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

return (
    <div className="min-h-screen bg-white dark:bg-deepNavy">
        <Header />
        <main className="pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Editor */}
                    <div>
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                {t('title')}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {t('tagline')}
                            </p>
                        </div>

                        {/* Editor */}
                        <div className="mb-6">
                            <TextEditor
                                value={text}
                                onChange={setText}
                                enableClipboardSniffer={true}
                            />
                        </div>

                        {/* Layout detection info */}
                        {layoutInfo && (
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-neonGreen animate-pulse"></div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Layout Detection Active
                                    </h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">Mode:</span>
                                        <div className="font-semibold text-gray-900 dark:text-white mt-1">
                                            {layoutInfo.mode === 'bold-insight' && t('boldInsight')}
                                            {layoutInfo.mode === 'cheat-sheet' && t('cheatSheet')}
                                            {layoutInfo.mode === 'zen-writer' && t('zenWriter')}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">Characters:</span>
                                        <div className="font-mono font-semibold text-neonBlue mt-1">
                                            {layoutInfo.charCount}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">Lines:</span>
                                        <div className="font-mono font-semibold text-neonPink mt-1">
                                            {layoutInfo.lineCount}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 dark:text-gray-400">Type:</span>
                                        <div className="font-semibold text-gray-900 dark:text-white mt-1">
                                            {layoutInfo.isList && '📝 List'}
                                            {layoutInfo.isShort && '💡 Short'}
                                            {layoutInfo.isLong && '📄 Long'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Preview */}
                    <div>
                        <div className="sticky top-24 space-y-4">
                            {/* Header with controls */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <svg className="w-5 h-5 text-neonPink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Live Preview
                                </h3>

                                {text && (
                                    <ExportButton
                                        targetElementId="preview-canvas"
                                        filename={`garden-gate-${aspectRatio.replace(':', 'x')}-${Date.now()}.png`}
                                        scale={2}
                                        disabled={!text}
                                    />
                                )}
                            </div>

                            {/* Aspect Ratio Toggle */}
                            {text && (
                                <AspectRatioToggle
                                    value={aspectRatio}
                                    onChange={setAspectRatio}
                                />
                            )}

                            {/* Preview Canvas */}
                            {text ? (
                                <div className="flex justify-center">
                                    <div
                                        id="preview-canvas"
                                        className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-800"
                                        style={{
                                            maxWidth: '100%',
                                            width: 'fit-content',
                                        }}
                                    >
                                        <TemplateRenderer
                                            text={text}
                                            mode={layoutInfo?.mode || 'bold-insight'}
                                            aspectRatio={aspectRatio}
                                            handle="@GardenGate"
                                            brandType="domain"
                                            customDomain="gardengate.app"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-400 dark:text-gray-600">
                                        Preview will appear here
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Empty state - only show when no editor focus */}
                {!text && (
                    <div className="text-center py-8 text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
                        <p className="text-sm">
                            💡 Try pasting some text to see the smart layout engine in action
                        </p>
                    </div>
                )}
            </div>
        </main>
    </div>
);
}
