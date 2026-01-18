"use client";

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface BrandFooterProps {
    handle?: string;
    brandType?: 'qrcode' | 'domain';
    customDomain?: string;
    className?: string;
}

/**
 * Brand Footer Component
 * F06: Mandatory brand insertion at bottom of generated images
 */
export function BrandFooter({
    handle = '@GardenGate',
    brandType = 'domain',
    customDomain = 'gardengate.app',
    className = '',
}: BrandFooterProps) {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if (brandType === 'qrcode') {
            const url = customDomain || 'https://gardengate.app';
            QRCode.toDataURL(url, {
                width: 80,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
            }).then(setQrCodeUrl);
        }
    }, [brandType, customDomain]);

    return (
        <div
            className={`flex items-center justify-between px-6 py-3 
                  bg-gradient-to-r from-black/50 via-black/40 to-black/50 backdrop-blur-md
                  ${className}`}
        >
            {/* Left: Handle */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-neonGreen to-neonBlue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-white font-semibold text-lg">
                    {handle}
                </span>
            </div>

            {/* Right: QR Code or Domain */}
            <div className="flex items-center gap-2">
                {brandType === 'qrcode' && qrCodeUrl ? (
                    <div className="bg-white p-1 rounded">
                        <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
                    </div>
                ) : (
                    <div className="text-white/80 text-sm font-medium">
                        {customDomain}
                    </div>
                )}
            </div>
        </div>
    );
}
