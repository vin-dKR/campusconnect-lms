'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export function CompleteStep() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
        >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                Setup Complete!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
                Your profile has been set up successfully. You're now ready to start your educational journey with EduLMS.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-left">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">What's next?</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <li>• Explore your personalized dashboard</li>
                    <li>• Access study materials</li>
                    <li>• Track your academic progress</li>
                    <li>• Connect with teachers and peers</li>
                </ul>
            </div>
        </motion.div>
    );
}
