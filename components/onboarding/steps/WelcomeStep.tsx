'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface WelcomeStepProps {
    userName?: string;
}

export function WelcomeStep({ userName }: WelcomeStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
        >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                Welcome to EduLMS, {userName}!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
                Let's set up your profile to personalize your learning experience.
                This will only take a few minutes.
            </p>
        </motion.div>
    );
}
