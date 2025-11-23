'use client';

import { motion } from 'framer-motion';
import { BookOpen, LogIn, Users, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '../ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuthStore, type UserRole } from '@/store/auth-store';

interface LandingHeroProps {
    onGuestLogin: (role: UserRole) => void;
}

export function LandingHero({ onGuestLogin }: LandingHeroProps) {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
                        Transform Your
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Learning Experience
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Modern Learning Management System that replaces manual processes with digital automation.
                        Beautiful, intuitive, and powerful.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => onGuestLogin('student')}
                        >
                            <LogIn className="w-5 h-5 mr-2" />
                            Get Started Free
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 text-lg rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
                        >
                            <BookOpen className="w-5 h-5 mr-2" />
                            Learn More
                        </Button>
                    </div>
                </motion.div>

                {/* Quick Role Access */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 max-w-4xl mx-auto"
                >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Quick Demo Access
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {(['student', 'teacher', 'admin', 'superadmin'] as UserRole[]).map((role) => (
                            <Button
                                key={role}
                                variant="ghost"
                                className="capitalize hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-200"
                                onClick={() => onGuestLogin(role)}
                            >
                                {role === 'student' && <Users className="w-4 h-4 mr-2" />}
                                {role === 'teacher' && <BookOpen className="w-4 h-4 mr-2" />}
                                {role === 'admin' && <BarChart3 className="w-4 h-4 mr-2" />}
                                {role === 'superadmin' && <BarChart3 className="w-4 h-4 mr-2" />}
                                {role}
                            </Button>
                        ))}
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
