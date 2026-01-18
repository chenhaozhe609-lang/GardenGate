import { toPng } from 'html-to-image';

export interface ExportOptions {
    scale?: number; // 1x, 2x, or 3x
    quality?: number;
    backgroundColor?: string;
}

/**
 * Export element as PNG image
 * F07: High-resolution PNG generation
 */
export async function exportAsPNG(
    elementId: string,
    filename: string = 'garden-gate-export',
    options: ExportOptions = {}
): Promise<Blob> {
    const {
        scale = 2,
        quality = 1,
        backgroundColor = '#ffffff',
    } = options;

    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
    }

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: scale,
            quality,
            backgroundColor,
        });

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        return blob;
    } catch (error) {
        console.error('Error exporting image:', error);
        throw error;
    }
}

/**
 * Download blob as file
 */
export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Export and download image
 */
export async function exportAndDownload(
    elementId: string,
    filename: string = 'garden-gate-export.png',
    options: ExportOptions = {}
): Promise<void> {
    try {
        const blob = await exportAsPNG(elementId, filename, options);
        downloadBlob(blob, filename);
    } catch (error) {
        console.error('Export failed:', error);
        throw error;
    }
}
