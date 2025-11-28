'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, GraduationCap, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

const roles = [
    {
        role: 'student' as UserRole,
        icon: User,
        title: 'Student',
        description: 'Access materials and track progress'
    },
    {
        role: 'teacher' as UserRole,
        icon: GraduationCap,
        title: 'Teacher',
        description: 'Manage classes and resources'
    },
    {
        role: 'admin' as UserRole,
        icon: Settings,
        title: 'Administrator',
        description: 'Oversee institution operations'
    },
    {
        role: 'superadmin' as UserRole,
        icon: BarChart3,
        title: 'Super Admin',
        description: 'System-wide analytics and management'
    }
];

export function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { loginAsGuest } = useAuthStore();

    const handleRoleSelect = (role: UserRole) => {
        loginAsGuest(role);
        setIsOpen(false);
    };

    return (
        <>
            {/* Fixed demo trigger */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-12 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-full shadow-lg"
                >
                    Try Demo
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-light text-slate-900 dark:text-white">
                                    Choose Demo Role
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {roles.map((role) => (
                                    <button
                                        key={role.role}
                                        onClick={() => handleRoleSelect(role.role)}
                                        className="w-full p-4 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200 group"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <role.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">
                                                    {role.title}
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {role.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
