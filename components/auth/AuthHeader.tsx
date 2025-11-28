'use client';

import { motion } from 'framer-motion';

interface AuthHeaderProps {
    title: string;
    subtitle: string;
    appName?: string;
}

export function AuthHeader({ title, subtitle, appName = "EduLMS" }: AuthHeaderProps) {
    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex justify-center mb-2">
                    <div className="text-2xl font-light text-slate-900 dark:text-white">
                        {appName}
                    </div>
                </div>
                <h1 className="text-3xl font-light text-slate-900 dark:text-white mb-2">
                    {title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    {subtitle}
                </p>
            </motion.div>
        </div>
    );
}
