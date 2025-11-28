'use client';

import { motion } from 'framer-motion';

interface DividerProps {
    text: string;
    delay?: number;
}

export function Divider({ text, delay = 0.2 }: DividerProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay }}
            className="relative"
        >
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-950 text-slate-500">{text}</span>
            </div>
        </motion.div>
    );
}
