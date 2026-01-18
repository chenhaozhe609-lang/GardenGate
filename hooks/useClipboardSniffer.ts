"use client";

import { useEffect, useState, useCallback } from 'react';

interface UseClipboardSnifferOptions {
    enabled?: boolean;
    onSuccess?: (text: string) => void;
    onError?: (error: Error) => void;
}

interface UseClipboardSnifferResult {
    clipboardText: string | null;
    isLoading: boolean;
    error: Error | null;
    hasPermission: boolean | null;
    requestPermission: () => Promise<void>;
}

/**
 * Hook for automatically reading clipboard content
 * Implements F02 - Clipboard Sniffer (P1 Priority)
 */
export function useClipboardSniffer({
    enabled = true,
    onSuccess,
    onError,
}: UseClipboardSnifferOptions = {}): UseClipboardSnifferResult {
    const [clipboardText, setClipboardText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const requestPermission = useCallback(async () => {
        if (!navigator.clipboard || !navigator.permissions) {
            const err = new Error('Clipboard API not supported');
            setError(err);
            setHasPermission(false);
            onError?.(err);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Request clipboard permission
            const permission = await navigator.permissions.query({
                name: 'clipboard-read' as PermissionName,
            });

            if (permission.state === 'granted' || permission.state === 'prompt') {
                setHasPermission(true);

                // Read clipboard content
                const text = await navigator.clipboard.readText();
                if (text) {
                    setClipboardText(text);
                    onSuccess?.(text);
                }
            } else {
                setHasPermission(false);
                const err = new Error('Clipboard permission denied');
                setError(err);
                onError?.(err);
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to read clipboard');
            setError(error);
            setHasPermission(false);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [onSuccess, onError]);

    // Auto-request permission on mount if enabled
    useEffect(() => {
        if (enabled && hasPermission === null) {
            requestPermission();
        }
    }, [enabled, hasPermission, requestPermission]);

    return {
        clipboardText,
        isLoading,
        error,
        hasPermission,
        requestPermission,
    };
}
