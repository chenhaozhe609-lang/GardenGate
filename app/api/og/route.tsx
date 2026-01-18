import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { getPost } from '@/lib/post-storage';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response('Missing post ID', { status: 400 });
        }

        // Get post from Firestore
        const post = await getPost(id);

        if (!post) {
            return new Response('Post not found', { status: 404 });
        }

        const width = post.aspectRatio === '3:4' ? 1080 : 1080;
        const height = post.aspectRatio === '3:4' ? 1440 : 1920;

        // Determine background gradient based on mode
        const bgGradient =
            post.mode === 'bold-insight'
                ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
                : post.mode === 'cheat-sheet'
                    ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
                    : 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)';

        // Truncate text for display
        const displayText = post.text.length > 200
            ? post.text.slice(0, 200) + '...'
            : post.text;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bgGradient,
                        padding: '80px',
                        position: 'relative',
                    }}
                >
                    {/* Main Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            width: '100%',
                        }}
                    >
                        {/* Text Content */}
                        <div
                            style={{
                                fontSize: post.mode === 'bold-insight' ? 96 : 64,
                                fontWeight: 'bold',
                                color: post.mode === 'cheat-sheet' ? '#111827' : '#FFFFFF',
                                textAlign: 'center',
                                lineHeight: 1.2,
                                maxWidth: '90%',
                                display: 'flex',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                background: post.mode === 'bold-insight'
                                    ? 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #EC4899 100%)'
                                    : 'transparent',
                                backgroundClip: post.mode === 'bold-insight' ? 'text' : undefined,
                                WebkitBackgroundClip: post.mode === 'bold-insight' ? 'text' : undefined,
                                WebkitTextFillColor: post.mode === 'bold-insight' ? 'transparent' : undefined,
                            }}
                        >
                            {displayText}
                        </div>
                    </div>

                    {/* Brand Footer */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '40px 60px',
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        {/* Left: Handle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                            <div
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 60,
                                    background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 32,
                                    fontWeight: 'bold',
                                    color: '#FFFFFF',
                                }}
                            >
                                G
                            </div>
                            <span
                                style={{
                                    fontSize: 36,
                                    fontWeight: 600,
                                    color: '#FFFFFF',
                                }}
                            >
                                {post.handle || '@GardenGate'}
                            </span>
                        </div>

                        {/* Right: Domain */}
                        <div
                            style={{
                                fontSize: 28,
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: 500,
                            }}
                        >
                            {post.customDomain || 'gardengate.app'}
                        </div>
                    </div>
                </div>
            ),
            {
                width,
                height,
            }
        );
    } catch (error) {
        console.error('Error generating OG image:', error);
        return new Response('Failed to generate image', { status: 500 });
    }
}
