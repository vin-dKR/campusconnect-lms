export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="text-xl font-light text-slate-900 dark:text-white">
                            EduLMS
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                            Modern learning management infrastructure for educational institutions.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                            Product
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Solutions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Terms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Security
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        © 2024 EduLMS. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <span className="sr-only">Twitter</span>
                            {/* Add social icons here */}
                        </a>
                        <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <span className="sr-only">GitHub</span>
                            {/* Add social icons here */}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
