export type LayoutMode = 'bold-insight' | 'cheat-sheet' | 'zen-writer';

/**
 * Detects the appropriate layout mode based on text characteristics
 * @param text - The input text to analyze
 * @returns The detected layout mode
 */
export function detectLayoutMode(text: string): LayoutMode {
    const trimmed = text.trim();
    const charCount = trimmed.length;

    // Priority 1: List detection (highest priority)
    // Matches lines starting with -, •, *, or numbered lists like "1."
    const listPattern = /^[\s]*[-•*]\s|^\d+\.\s/m;
    if (listPattern.test(trimmed)) {
        return 'cheat-sheet';
    }

    // Priority 2: Short text detection
    if (charCount < 50) {
        return 'bold-insight';
    }

    // Default: Long text mode
    return 'zen-writer';
}

/**
 * Analyzes text and returns layout recommendations
 */
export function analyzeText(text: string) {
    const mode = detectLayoutMode(text);
    const charCount = text.trim().length;
    const lineCount = text.split('\n').filter(line => line.trim()).length;

    return {
        mode,
        charCount,
        lineCount,
        isList: mode === 'cheat-sheet',
        isShort: mode === 'bold-insight',
        isLong: mode === 'zen-writer',
    };
}
