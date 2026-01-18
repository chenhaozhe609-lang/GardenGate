"use client";

import { BoldInsight } from './BoldInsight';
import { CheatSheet } from './CheatSheet';
import { ZenWriter } from './ZenWriter';
import type { LayoutMode } from '@/lib/layout-engine/detector';

interface TemplateRendererProps {
    text: string;
    mode: LayoutMode;
    className?: string;
}

/**
 * Template Renderer
 * Dynamically renders the appropriate template based on detected layout mode
 */
export function TemplateRenderer({ text, mode, className = '' }: TemplateRendererProps) {
    if (!text) {
        return null;
    }

    switch (mode) {
        case 'bold-insight':
            return <BoldInsight text={text} className={className} />;
        case 'cheat-sheet':
            return <CheatSheet text={text} className={className} />;
        case 'zen-writer':
            return <ZenWriter text={text} className={className} />;
        default:
            return <BoldInsight text={text} className={className} />;
    }
}
