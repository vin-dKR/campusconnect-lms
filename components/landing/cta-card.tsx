'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, type UserRole } from '@/store/auth-store';

interface CTACardProps {
    onGuestLogin: (role: UserRole) => void;
}

export function CTACard({ onGuestLogin }: CTACardProps) {
    return (
        <section className="py-32 px-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mb-4">
                        Try EduLMS free for 14 days
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Modern learning management without the complexity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Button
                            size="lg"
                            className="h-11 px-8 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg"
                            onClick={() => onGuestLogin('teacher')}
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            className="h-11 px-8 text-slate-600 dark:text-slate-400"
                            onClick={() => onGuestLogin('student')}
                        >
                            View Demo
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
