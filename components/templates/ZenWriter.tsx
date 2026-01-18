import { optimizeCJKText } from '@/lib/layout-engine/cjk-optimizer';

interface ZenWriterProps {
    text: string;
    className?: string;
}

/**
 * Zen Writer Template
 * For long text (>50 characters)
 * Clean, readable typography with generous spacing
 */
export function ZenWriter({ text, className = '' }: ZenWriterProps) {
    // Split into paragraphs
    const paragraphs = text
        .split('\n')
        .filter(p => p.trim())
        .map(p => optimizeCJKText(p.trim()));

    return (
        <div
            className={`p-12 min-h-[500px] ${className}`}
            style={{
                background: 'linear-gradient(to bottom, #fafaf9 0%, #f5f5f4 100%)',
            }}
        >
            <div className="max-w-3xl mx-auto">
                <article className="prose prose-lg max-w-none">
                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-xl leading-loose text-gray-800 mb-8 last:mb-0
                         animate-fade-in"
                            style={{
                                fontFamily: 'var(--font-noto-serif-sc), serif',
                                animationDelay: `${index * 150}ms`,
                                textIndent: index > 0 ? '2em' : '0', // Chinese text indentation
                            }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </article>
            </div>
        </div>
    );
}
