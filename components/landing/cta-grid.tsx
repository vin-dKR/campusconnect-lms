'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAGridProps {
    onGuestLogin: (role: UserRole) => void;
}

export function CTAGrid({ onGuestLogin }: CTAGridProps) {
    return (
        <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Main card */}
                    <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center overflow-hidden">

                        {/* Enhanced grid with stronger fade */}
                        <div className="absolute inset-0">
                            {/* Grid container with radial fade */}
                            <div
                                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                                style={{
                                    backgroundImage: `
                    linear-gradient(currentColor 1px, transparent 1px),
                    linear-gradient(90deg, currentColor 1px, transparent 1px)
                  `,
                                    backgroundSize: '50px 50px',
                                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                                }}
                            ></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mb-4">
                                Ready to begin?
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                                Experience modern learning management with our 14-day free trial.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    className="h-12 px-8 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg font-medium"
                                    onClick={() => onGuestLogin('teacher')}
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-12 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                                    onClick={() => onGuestLogin('student')}
                                >
                                    View Demo
                                </Button>
                            </div>

                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
                                No credit card required
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
