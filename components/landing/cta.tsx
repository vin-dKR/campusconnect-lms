'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, type UserRole } from '@/store/auth-store';

interface CTAProps {
    onGuestLogin: (role: UserRole) => void;
}

export function CTA({ onGuestLogin }: CTAProps) {
    return (
        <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Main card with grid background */}
                    <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center overflow-hidden">

                        {/* Grid background with fade effect */}
                        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
                            {/* Horizontal lines */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: `linear-gradient(to bottom, transparent 0%, currentColor 1px, transparent 1px)`,
                                backgroundSize: '100% 40px',
                                maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
                            }}></div>
                            {/* Vertical lines */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: `linear-gradient(to right, transparent 0%, currentColor 1px, transparent 1px)`,
                                backgroundSize: '40px 100%',
                                maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
                            }}></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mb-4">
                                Start your free trial
                            </h2>

                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                                Join thousands of institutions modernizing their operations. Full access for 14 days, no credit card required.
                            </p>

                            {/* Feature highlights */}
                            <div className="flex flex-wrap justify-center gap-6 mb-8">
                                {['Full 14-day trial', 'No setup fees', 'Cancel anytime'].map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button
                                    size="lg"
                                    className="h-12 px-8 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg font-medium transition-all duration-200"
                                    onClick={() => onGuestLogin('teacher')}
                                >
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-12 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
                                    onClick={() => onGuestLogin('student')}
                                >
                                    Schedule Demo
                                </Button>
                            </div>

                            {/* Trust indicator */}
                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-6">
                                Trusted by 1,000+ institutions
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
