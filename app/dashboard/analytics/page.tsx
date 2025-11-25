'use client';

import { motion } from 'framer-motion';
import { Users, CreditCard, TrendingUp, BookOpen, Calendar, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/dashboard/page-header';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function AnalyticsPage() {
    // Mock data for charts
    const feesData = [
        { month: 'Jan', collected: 450000, pending: 120000 },
        { month: 'Feb', collected: 520000, pending: 90000 },
        { month: 'Mar', collected: 480000, pending: 110000 },
        { month: 'Apr', collected: 610000, pending: 80000 },
        { month: 'May', collected: 580000, pending: 95000 },
        { month: 'Jun', collected: 720000, pending: 70000 },
    ];

    const attendanceData = [
        { class: '10A', present: 92, absent: 8 },
        { class: '10B', present: 88, absent: 12 },
        { class: '11A', present: 95, absent: 5 },
        { class: '11B', present: 90, absent: 10 },
        { class: '12A', present: 94, absent: 6 },
        { class: '12B', present: 89, absent: 11 },
    ];

    const performanceData = [
        { class: '12A', avgScore: 87 },
        { class: '11A', avgScore: 85 },
        { class: '10A', avgScore: 82 },
        { class: '12B', avgScore: 79 },
        { class: '11B', avgScore: 78 },
        { class: '10B', avgScore: 75 },
    ];

    const userDistribution = [
        { name: 'Students', value: 1200 },
        { name: 'Teachers', value: 45 },
        { name: 'Admins', value: 8 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const recentActivity = [
        { action: 'New student registered', time: '2 mins ago', type: 'user' },
        { action: 'Fee payment received', time: '15 mins ago', type: 'payment' },
        { action: 'Attendance marked', time: '1 hour ago', type: 'attendance' },
        { action: 'Study material uploaded', time: '2 hours ago', type: 'material' },
        { action: 'Report card generated', time: '3 hours ago', type: 'report' },
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'user': return <Users className="w-4 h-4 text-blue-500" />;
            case 'payment': return <CreditCard className="w-4 h-4 text-green-500" />;
            case 'attendance': return <Calendar className="w-4 h-4 text-purple-500" />;
            case 'material': return <BookOpen className="w-4 h-4 text-orange-500" />;
            case 'report': return <Activity className="w-4 h-4 text-red-500" />;
            default: return <Activity className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <PageHeader
                title="Analytics Dashboard"
                description="Comprehensive overview of institution performance and metrics"
            />

            {/* Key Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    1,253
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Total Students</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +12% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    ₹2.8M
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Total Collected</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +8% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    ₹185K
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Pending Fees</div>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-red-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            -5% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    94%
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Avg. Attendance</div>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +2% from last month
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fees Collection Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                Monthly Fees Collection
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={feesData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="collected" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                        <Area type="monotone" dataKey="pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Attendance Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                Class-wise Attendance
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={attendanceData}>
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis dataKey="class" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Performance Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                Top Performing Classes
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={performanceData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="class" type="category" />
                                        <Tooltip />
                                        <Bar dataKey="avgScore" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* User Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                User Distribution
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {userDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    {getActivityIcon(activity.type)}
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                                            {activity.action}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
