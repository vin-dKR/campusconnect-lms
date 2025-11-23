'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, type UserRole } from '@/store/auth-store';

interface CTAMinimalGridProps {
    onGuestLogin: (role: UserRole) => void;
}

export function CTAMinimalGrid({ onGuestLogin }: CTAMinimalGridProps) {
    return (
        <section className="py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center overflow-hidden"
                >

                    {/* Subtle grid with fade */}
                    <div
                        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
                        style={{
                            backgroundImage: `
                linear-gradient(currentColor 0.5px, transparent 0.5px),
                linear-gradient(90deg, currentColor 0.5px, transparent 0.5px)
              `,
                            backgroundSize: '60px 60px',
                            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
                        }}
                    ></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white mb-4">
                            Try EduLMS today
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            14-day free trial. No credit card required.
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
                                Demo
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
