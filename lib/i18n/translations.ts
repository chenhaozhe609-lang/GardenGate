export type Locale = 'zh' | 'en';

export const translations = {
    zh: {
        // Header & Navigation
        title: 'Garden Gate',
        tagline: '内容发射台',

        // Input
        inputPlaceholder: '粘贴或输入你的文字...',
        charCount: '字数',

        // Templates
        boldInsight: '精辟观点',
        cheatSheet: '速查清单',
        zenWriter: '优雅长文',

        // Aspect Ratio
        aspectRatio: '比例',
        redNoteMode: '小红书模式',
        douyinMode: '抖音模式',

        // Actions
        generate: '生成图片',
        download: '下载',
        copy: '复制链接',
        share: '分享',
        regenerate: '重新生成',

        // Settings
        settings: '设置',
        theme: '主题',
        language: '语言',
        darkMode: '暗黑模式',
        lightMode: '浅色模式',
        systemMode: '跟随系统',

        // Brand
        brandHandle: '品牌标识',
        handlePlaceholder: '@你的用户名',
        brandType: '品牌类型',
        qrCode: '二维码',
        domain: '域名',

        // Messages
        generating: '正在生成...',
        success: '生成成功！',
        error: '生成失败，请重试',
        copied: '已复制到剪贴板',
        longPressSave: '长按保存图片',

        // Footer
        cta: '获取此模版',
        subscribe: '订阅我的邮件列表',
    },
    en: {
        // Header & Navigation
        title: 'Garden Gate',
        tagline: 'Content Launch Platform',

        // Input
        inputPlaceholder: 'Paste or type your text...',
        charCount: 'Characters',

        // Templates
        boldInsight: 'Bold Insight',
        cheatSheet: 'Cheat Sheet',
        zenWriter: 'Zen Writer',

        // Aspect Ratio
        aspectRatio: 'Aspect Ratio',
        redNoteMode: 'RedNote Mode',
        douyinMode: 'Douyin Mode',

        // Actions
        generate: 'Generate',
        download: 'Download',
        copy: 'Copy Link',
        share: 'Share',
        regenerate: 'Regenerate',

        // Settings
        settings: 'Settings',
        theme: 'Theme',
        language: 'Language',
        darkMode: 'Dark',
        lightMode: 'Light',
        systemMode: 'System',

        // Brand
        brandHandle: 'Brand Handle',
        handlePlaceholder: '@yourhandle',
        brandType: 'Brand Type',
        qrCode: 'QR Code',
        domain: 'Domain',

        // Messages
        generating: 'Generating...',
        success: 'Generated successfully!',
        error: 'Failed to generate, please try again',
        copied: 'Copied to clipboard',
        longPressSave: 'Long press to save image',

        // Footer
        cta: 'Get This Template',
        subscribe: 'Subscribe to Newsletter',
    },
} as const;

export type TranslationKey = keyof typeof translations.zh;
