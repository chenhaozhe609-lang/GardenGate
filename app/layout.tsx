import type { Metadata } from "next";
import { Inter, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/i18n-context";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const notoSansSC = Noto_Sans_SC({
    weight: ['400', '500', '700'],
    subsets: ["latin"],
    variable: "--font-noto-sans-sc",
    display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: "--font-noto-serif-sc",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Garden Gate - Content Launch Platform",
    description: "Transform your text into stunning visual content for social media. The mullet strategy for content creators.",
    keywords: ["content creation", "social media", "visual design", "digital garden"],
    authors: [{ name: "Garden Gate" }],
    openGraph: {
        title: "Garden Gate",
        description: "Transform your text into stunning visual content",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${notoSansSC.variable} ${notoSerifSC.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                >
                    <I18nProvider>
                        {children}
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
