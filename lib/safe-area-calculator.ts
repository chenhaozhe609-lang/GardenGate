export type AspectRatio = '3:4' | '9:16';

export interface SafeArea {
    contentArea: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    footerArea?: {
        y: number;
        height: number;
    };
    rightMargin?: {
        x: number;
        width: number;
    };
}

/**
 * Calculates safe area for Douyin/TikTok 9:16 format
 * Bottom 20% reserved for caption area
 * Right 15% reserved for interaction buttons
 */
export function getDouyinSafeArea(width: number, height: number): SafeArea {
    return {
        contentArea: {
            x: 0,
            y: 0,
            width: width * 0.85,  // Reserve 15% on right
            height: height * 0.80, // Reserve 20% on bottom
        },
        footerArea: {
            y: height * 0.80,
            height: height * 0.20,
        },
        rightMargin: {
            x: width * 0.85,
            width: width * 0.15,
        },
    };
}

/**
 * Calculates safe area for RedNote/Instagram 3:4 format
 * Minimal margins, full content area available
 */
export function getRedNoteSafeArea(width: number, height: number): SafeArea {
    return {
        contentArea: {
            x: 0,
            y: 0,
            width: width,
            height: height * 0.92, // Small footer reservation
        },
        footerArea: {
            y: height * 0.92,
            height: height * 0.08,
        },
    };
}

/**
 * Gets safe area based on aspect ratio
 */
export function getSafeArea(
    aspectRatio: AspectRatio,
    width: number,
    height: number
): SafeArea {
    if (aspectRatio === '9:16') {
        return getDouyinSafeArea(width, height);
    }
    return getRedNoteSafeArea(width, height);
}

/**
 * Calculates dimensions for a given aspect ratio
 */
export function getDimensionsForRatio(
    aspectRatio: AspectRatio,
    baseWidth: number = 1080
): { width: number; height: number } {
    if (aspectRatio === '3:4') {
        return {
            width: baseWidth,
            height: Math.floor(baseWidth * (4 / 3)),
        };
    }
    // 9:16
    return {
        width: baseWidth,
        height: Math.floor(baseWidth * (16 / 9)),
    };
}
