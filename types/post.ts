export interface Post {
    id: string;
    text: string;
    mode: 'bold-insight' | 'cheat-sheet' | 'zen-writer';
    aspectRatio: '3:4' | '9:16';
    createdAt: number;
    handle?: string;
    brandType?: 'qrcode' | 'domain';
    customDomain?: string;
}

export interface PostMetadata {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}
