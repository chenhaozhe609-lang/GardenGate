import { optimizeCJKText } from '@/lib/layout-engine/cjk-optimizer';

interface CheatSheetProps {
    text: string;
    className?: string;
}

/**
 * Cheat Sheet Template
 * For list-style text
 * Tool-like feel with emoji bullets and left alignment
 */
export function CheatSheet({ text, className = '' }: CheatSheetProps) {
    // Parse list items
    const lines = text.split('\n').filter(line => line.trim());
    const items = lines.map(line => {
        // Remove list markers (-, •, *, 1., 2., etc.)
        const cleaned = line.replace(/^[\s]*[-•*]\s|^\d+\.\s/, '');
        return optimizeCJKText(cleaned);
    });

    // Emoji rotation for visual interest
    const emojis = ['✨', '💡', '🎯', '⚡', '🔥', '🌟', '💫', '🚀'];

    return (
        <div
            className={`p-8 min-h-[400px] ${className}`}
            style={{
                background: 'linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 100%)',
            }}
        >
            <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg
                         bg-white/80 backdrop-blur-sm
                         border-l-4 border-neonGreen
                         shadow-sm hover:shadow-md transition-shadow
                         animate-fade-in"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            <span className="text-2xl flex-shrink-0 mt-0.5">
                                {emojis[index % emojis.length]}
                            </span>
                            <p
                                className="text-lg text-gray-800 leading-relaxed"
                                style={{
                                    fontFamily: 'var(--font-noto-sans-sc), sans-serif',
                                }}
                            >
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
