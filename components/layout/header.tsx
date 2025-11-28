'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import Link from 'next/link';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-xl font-light tracking-tight text-slate-900 dark:text-white">
                        EduLMS
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Features
                        </a>
                        <a href="#solutions" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Solutions
                        </a>
                        <a href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            Pricing
                        </a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <Link
                            href="/auth/signin"
                            className="hidden sm:flex px-4 py-1 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
