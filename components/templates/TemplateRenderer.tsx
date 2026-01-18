"use client";

import { BoldInsight } from './BoldInsight';
import { CheatSheet } from './CheatSheet';
import { ZenWriter } from './ZenWriter';
import { BrandFooter } from '@/components/BrandFooter';
import type { LayoutMode } from '@/lib/layout-engine/detector';
import type { AspectRatio } from '@/lib/safe-area-calculator';
import { getSafeArea, getDimensionsForRatio } from '@/lib/safe-area-calculator';

interface TemplateRendererProps {
    text: string;
    mode: LayoutMode;
    aspectRatio?: AspectRatio;
    className?: string;
    handle?: string;
    brandType?: 'qrcode' | 'domain';
    customDomain?: string;
}

/**
 * Template Renderer with Aspect Ratio and Safe Area Support
 * Dynamically renders the appropriate template based on detected layout mode
 * Applies safe area logic for Douyin 9:16 mode
 */
export function TemplateRenderer({
    text,
    mode,
    aspectRatio = '3:4',
    className = '',
    handle,
    brandType,
    customDomain,
}: TemplateRendererProps) {
    if (!text) {
        return null;
    }

    const dimensions = getDimensionsForRatio(aspectRatio, 1080);
    const safeArea = getSafeArea(aspectRatio, dimensions.width, dimensions.height);

    // Calculate content height considering safe area
    const contentHeight = aspectRatio === '9:16'
        ? `${safeArea.contentArea.height}px`
        : `${dimensions.height - 80}px`; // Reserve 80px for brand footer

    // Select template component
    let TemplateComponent;
    switch (mode) {
        case 'bold-insight':
            TemplateComponent = BoldInsight;
            break;
        case 'cheat-sheet':
            TemplateComponent = CheatSheet;
            break;
        case 'zen-writer':
            TemplateComponent = ZenWriter;
            break;
        default:
            TemplateComponent = BoldInsight;
    }

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`,
                aspectRatio: aspectRatio === '3:4' ? '3/4' : '9/16',
            }}
        >
            {/* Content Area */}
            <div
                style={{
                    height: contentHeight,
                    maxWidth: aspectRatio === '9:16' ? `${safeArea.contentArea.width}px` : '100%',
                }}
            >
                <TemplateComponent text={text} />
            </div>

            {/* Brand Footer - Fixed at bottom */}
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                    maxWidth: aspectRatio === '9:16' ? `${safeArea.contentArea.width}px` : '100%',
                }}
            >
                <BrandFooter
                    handle={handle}
                    brandType={brandType}
                    customDomain={customDomain}
                />
            </div>

            {/* Safe Area Indicator for 9:16 (Dev Mode) */}
            {aspectRatio === '9:16' && process.env.NODE_ENV === 'development' && (
                <>
                    {/* Bottom safe area */}
                    <div
                        className="absolute bottom-0 left-0 right-0 border-t-2 border-dashed border-red-500 opacity-30 pointer-events-none"
                        style={{ height: `${safeArea.footerArea?.height}px` }}
                    />
                    {/* Right safe area */}
                    <div
                        className="absolute top-0 bottom-0 right-0 border-l-2 border-dashed border-red-500 opacity-30 pointer-events-none"
                        style={{ width: `${safeArea.rightMargin?.width}px` }}
                    />
                </>
            )}
        </div>
    );
}
