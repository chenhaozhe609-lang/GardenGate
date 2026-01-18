import { optimizeCJKText } from '@/lib/layout-engine/cjk-optimizer';

interface BoldInsightProps {
    text: string;
    className?: string;
}

/**
 * Bold Insight Template
 * For short text (<50 characters)
 * High visual impact with large typography
 */
export function BoldInsight({ text, className = '' }: BoldInsightProps) {
    const optimizedText = optimizeCJKText(text);

    return (
        <div
            className={`flex items-center justify-center min-h-[400px] p-8 ${className}`}
        >
            <div className="text-center max-w-2xl">
                <h1
                    className="text-impact font-bold leading-tight
                     bg-gradient-to-r from-neonGreen via-neonBlue to-neonPink
                     bg-clip-text text-transparent
                     animate-fade-in"
                    style={{
                        fontFamily: 'var(--font-noto-sans-sc), sans-serif',
                    }}
                >
                    {optimizedText}
                </h1>
            </div>
        </div>
    );
}
