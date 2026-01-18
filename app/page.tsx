import { Header } from "@/components/Header";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-deepNavy">
            <Header />
            <main className="pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                            Phase 1: Core UI Framework ✓
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Internationalization and Theme System Active
                        </p>
                    </div>

                    {/* Feature showcase */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                            <div className="w-12 h-12 bg-neonGreen/10 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-neonGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">中英文切换</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                支持中文和English界面切换
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                            <div className="w-12 h-12 bg-neonBlue/10 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-neonBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">暗黑模式</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                浅色/暗黑/跟随系统
                            </p>
                        </div>

                        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                            <div className="w-12 h-12 bg-neonPink/10 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-neonPink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">响应式设计</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                移动端优先，触控友好
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
