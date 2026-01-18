export interface UserSettings {
    handle: string;
    brandType: 'qrcode' | 'domain';
    customDomain: string;
    exportScale: number; // 1x, 2x, or 3x
}

export const DEFAULT_SETTINGS: UserSettings = {
    handle: '@GardenGate',
    brandType: 'domain',
    customDomain: 'gardengate.app',
    exportScale: 2,
};
