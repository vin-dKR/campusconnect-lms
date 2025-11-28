'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ThemeToggle } from '../ui/theme-toggle';

interface AuthLayoutProps {
    children: ReactNode;
    visual: {
        icon: React.ComponentType<any>;
        title: string;
        description: string;
        features: string[];
    };
}

export function AuthLayout({ children, visual }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="max-w-md w-full space-y-8">
                    {children}
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(currentColor 0.5px, transparent 0.5px),
              linear-gradient(90deg, currentColor 0.5px, transparent 0.5px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center max-w-md"
                >
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center mx-auto mb-8">
                            <visual.icon className="w-8 h-8 text-white dark:text-slate-900" />
                        </div>

                        <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                            {visual.title}
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {visual.description}
                        </p>

                        <div className="flex justify-center space-x-8 pt-8">
                            {visual.features.map((feature) => (
                                <div key={feature} className="text-center">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full mx-auto mb-2" />
                                    <span className="text-xs text-slate-500 dark:text-slate-500">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Theme Toggle */}
                <div className="absolute top-6 right-6">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
