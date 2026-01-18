export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-deepNavy flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                    404
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Post not found
                </p>
                <a
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-neonGreen to-neonBlue text-white rounded-xl font-semibold hover:scale-105 transition-all inline-block"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
