'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import {
    User,
    GraduationCap,
    Settings,
    BarChart3,
    ArrowRight
} from 'lucide-react';

const roles = [
    {
        role: 'student' as UserRole,
        icon: User,
        title: 'Students',
        description: 'Access study materials, view report cards, and track your academic progress.',
        features: ['Study Materials', 'Digital Report Cards', 'Performance Analytics', 'Fee Tracking'],
        color: 'from-blue-500 to-cyan-500'
    },
    {
        role: 'teacher' as UserRole,
        icon: GraduationCap,
        title: 'Teachers',
        description: 'Manage attendance, share resources, and monitor student performance efficiently.',
        features: ['Attendance System', 'Material Sharing', 'Grade Management', 'Class Analytics'],
        color: 'from-purple-500 to-pink-500'
    },
    {
        role: 'admin' as UserRole,
        icon: Settings,
        title: 'Administrators',
        description: 'Oversee institution operations with comprehensive management tools.',
        features: ['User Management', 'Fee Collection', 'Report Generation', 'System Configuration'],
        color: 'from-green-500 to-emerald-500'
    },
    {
        role: 'superadmin' as UserRole,
        icon: BarChart3,
        title: 'Super Admin',
        description: 'Gain institution-wide insights with advanced analytics and reporting.',
        features: ['Advanced Analytics', 'Multi-school Management', 'Performance Dashboards', 'System Monitoring'],
        color: 'from-orange-500 to-red-500'
    },
];

export function RolePreview() {
    const { loginAsGuest } = useAuthStore();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Tailored Experiences
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Each role gets a customized interface with tools and features designed specifically for their needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.role}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${role.color}`}>
                                    <role.icon className="w-6 h-6 text-white" />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={() => loginAsGuest(role.role)}
                                >
                                    Try Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                {role.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {role.description}
                            </p>

                            <ul className="space-y-2">
                                {role.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-slate-600 dark:text-slate-400">
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color} mr-3`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
