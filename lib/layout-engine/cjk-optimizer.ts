/**
 * CJK Typography Optimizer
 * Implements Chinese, Japanese, Korean text formatting best practices
 */

/**
 * Prevents punctuation marks from appearing at the start of a line (避头)
 * Inserts zero-width no-break space (U+FEFF) before CJK punctuation
 */
export function preventHangingPunctuation(text: string): string {
    const punctuation = '，。！？；：、';
    const regex = new RegExp(`([${punctuation}])`, 'g');
    return text.replace(regex, '\uFEFF$1');
}

/**
 * Inserts thin space (U+2009) between CJK and Latin characters
 * Improves readability when mixing Chinese and English text
 */
export function insertCJKSpacing(text: string): string {
    return text
        // CJK followed by Latin/digits
        .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9@#$%])/g, '$1\u2009$2')
        // Latin/digits followed by CJK
        .replace(/([a-zA-Z0-9@#$%])([\u4e00-\u9fa5])/g, '$1\u2009$2');
}

/**
 * Normalizes ellipsis and punctuation for Chinese text
 * Converts English-style "..." to Chinese-style "……"
 */
export function normalizeEllipsis(text: string): string {
    return text
        .replace(/\.{3,}/g, '……')
        .replace(/\.\.\./g, '……');
}

/**
 * Applies all CJK optimizations to text
 * This is the main function to use for processing user input
 */
export function optimizeCJKText(text: string): string {
    let optimized = text;
    optimized = normalizeEllipsis(optimized);
    optimized = insertCJKSpacing(optimized);
    optimized = preventHangingPunctuation(optimized);
    return optimized;
}

/**
 * Wraps text lines to prevent widows (single characters on last line)
 * Useful for improving Chinese text layout
 */
export function preventWidows(text: string, maxLineLength: number = 40): string {
    const lines = text.split('\n');
    return lines.map(line => {
        if (line.length <= maxLineLength) return line;
        // TODO: Implement smart line breaking for CJK
        return line;
    }).join('\n');
}
