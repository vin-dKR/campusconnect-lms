'use client';

import { useAuthStore } from '@/store/auth-store';
import { motion } from 'framer-motion';
import { Calendar, FileText, Users, TrendingUp, BookOpen, Download, Send, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const { user } = useAuthStore();

    const getStats = () => {
        switch (user?.role) {
            case 'student':
                return [
                    { icon: Calendar, label: 'Classes Today', value: '3', change: '+1' },
                    { icon: BookOpen, label: 'Assignments Due', value: '2', change: '-1' },
                    { icon: FileText, label: 'Study Materials', value: '15', change: '+3' },
                    { icon: TrendingUp, label: 'Overall Grade', value: 'A-', change: '+2%' },
                ];
            case 'teacher':
                return [
                    { icon: Calendar, label: 'Classes Today', value: '4', change: '+0' },
                    { icon: Users, label: 'Students', value: '32', change: '+2' },
                    { icon: FileText, label: 'Materials Shared', value: '8', change: '+1' },
                    { icon: TrendingUp, label: 'Attendance Rate', value: '94%', change: '+2%' },
                ];
            default:
                return [
                    { icon: Users, label: 'Total Users', value: '1,234', change: '+12' },
                    { icon: Calendar, label: 'Active Classes', value: '45', change: '+3' },
                    { icon: FileText, label: 'Documents', value: '2.1k', change: '+45' },
                    { icon: TrendingUp, label: 'System Usage', value: '87%', change: '+5%' },
                ];
        }
    };

    const stats = getStats();

    // Mock data for recent contacts/students
    const recentContacts = [
        { name: 'Karl Rasn', id: '#4214893', role: 'Student' },
        { name: 'FocalPoint', id: '#4214245', role: 'Class' },
        { name: 'Nataly C', id: '#2224244', role: 'Student' },
        { name: 'Lucy Jon', id: '#5554812', role: 'Teacher' },
        { name: 'Alec Daw', id: '#2124853', role: 'Student' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Welcome Section - Payflow Style */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                            Welcome back, {user?.name}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            {user?.role === 'student'
                                ? 'Ready to continue your learning journey?'
                                : user?.role === 'teacher'
                                    ? 'Manage your classes and students efficiently'
                                    : 'Monitor your institution\'s performance'
                            }
                        </p>
                    </div>
                </div>

                {/* Quick Actions - Payflow Style */}
                <div className="flex items-center space-x-4">
                    <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl">
                        <UserPlus className="w-4 h-4" />
                        <span>Add New</span>
                    </Button>
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <span className="text-sm font-medium text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                    >
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { action: 'Mathematics assignment submitted', time: '2 hours ago', type: 'assignment' },
                                { action: 'Physics class attendance marked', time: '4 hours ago', type: 'attendance' },
                                { action: 'New study material uploaded', time: '1 day ago', type: 'material' },
                                { action: 'Monthly report generated', time: '2 days ago', type: 'report' },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm text-slate-900 dark:text-white truncate">
                                            {activity.action}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Recent Contacts */}
                <div className="space-y-6">
                    {/* Recent Contacts - Payflow Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                                Recent Contacts
                            </h2>
                            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                                Manage
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {recentContacts.map((contact, index) => (
                                <div key={contact.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                            {contact.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                            {contact.name}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">
                                            {contact.role} • {contact.id}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full mt-4 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add new
                        </Button>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                    >
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: BookOpen, label: 'Materials', href: '/dashboard/materials' },
                                { icon: Calendar, label: 'Attendance', href: '/dashboard/attendance' },
                                { icon: FileText, label: 'Reports', href: '/dashboard/report-card' },
                                { icon: Download, label: 'Downloads', href: '#' },
                            ].map((action, index) => (
                                <button
                                    key={action.label}
                                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
                                >
                                    <action.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                                        {action.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
