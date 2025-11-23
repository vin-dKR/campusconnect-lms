'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, type UserRole } from '@/store/auth-store';

interface MinimalHeroProps {
    onGuestLogin: (role: UserRole) => void;
}

export function MinimalHero({ onGuestLogin }: MinimalHeroProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-16">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 dark:text-white mb-6">
                        Learning
                        <br />
                        <span className="text-slate-400">Management</span>
                        <br />
                        Simplified
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Modern infrastructure for educational institutions.
                        Replace manual processes with elegant digital solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="h-12 px-8 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-all duration-200 rounded-lg"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => onGuestLogin('teacher')}
                        >
                            Get Started
                            <motion.div
                                animate={{ x: isHovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </motion.div>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="h-12 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            onClick={() => onGuestLogin('student')}
                        >
                            <Play className="w-4 h-4 mr-2" />
                            View Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Bottom Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-px h-16 bg-slate-300 dark:bg-slate-700"></div>
                </motion.div>
            </div>
        </div>
    );
}
