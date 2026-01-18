import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/post-storage';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { Header } from '@/components/Header';
import { CTAButton } from '@/components/CTAButton';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = getPost(params.id);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const title = post.text.slice(0, 60);
    const description = post.text.slice(0, 160);
    const imageUrl = `/api/og?id=${params.id}`;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://gardengate.app'}/p/${params.id}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: imageUrl,
                    width: post.aspectRatio === '3:4' ? 1080 : 1080,
                    height: post.aspectRatio === '3:4' ? 1440 : 1920,
                    alt: title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default function PostPage({ params }: PageProps) {
    const post = getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-deepNavy">
            <Header />
            <main className="pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Post Title */}
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                        {post.text.slice(0, 60)}
                        {post.text.length > 60 ? '...' : ''}
                    </h1>

                    {/* Preview */}
                    <div className="flex justify-center mb-8">
                        <div
                            id="post-preview"
                            className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-800"
                            style={{
                                maxWidth: '100%',
                                width: 'fit-content',
                            }}
                        >
                            <TemplateRenderer
                                text={post.text}
                                mode={post.mode}
                                aspectRatio={post.aspectRatio}
                                handle={post.handle}
                                brandType={post.brandType}
                                customDomain={post.customDomain}
                            />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center space-y-4">
                        <CTAButton
                            text="Create Your Own"
                            href="/"
                            variant="primary"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Powered by Garden Gate • Content Launch Platform
                        </p>
                    </div>

                    {/* Post Info */}
                    <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Post Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Mode:</span>
                                <div className="font-medium text-gray-900 dark:text-white mt-1">
                                    {post.mode === 'bold-insight' && '💡 Bold Insight'}
                                    {post.mode === 'cheat-sheet' && '📝 Cheat Sheet'}
                                    {post.mode === 'zen-writer' && '📄 Zen Writer'}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Aspect Ratio:</span>
                                <div className="font-medium text-gray-900 dark:text-white mt-1">
                                    {post.aspectRatio}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Created:</span>
                                <div className="font-medium text-gray-900 dark:text-white mt-1">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Characters:</span>
                                <div className="font-medium text-gray-900 dark:text-white mt-1">
                                    {post.text.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
