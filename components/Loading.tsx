export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} animate-spin`}>
                <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="min-h-screen bg-white dark:bg-deepNavy">
            {/* Header Skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-deepNavy/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <main className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                        </div>
                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-pulse">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
        </div>
    );
}
