'use client';

import { motion } from 'framer-motion';
import { Server, Database, Cpu, Shield, Clock, Activity, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';

export default function SystemPage() {
    const systemMetrics = {
        uptime: '99.98%',
        responseTime: '128ms',
        activeUsers: '1,234',
        storageUsed: '45%',
        memoryUsage: '62%',
        cpuUsage: '38%',
    };

    const systemHealth = [
        { service: 'Web Server', status: 'healthy', response: '45ms' },
        { service: 'Database', status: 'healthy', response: '12ms' },
        { service: 'File Storage', status: 'warning', response: '230ms' },
        { service: 'Email Service', status: 'healthy', response: '89ms' },
        { service: 'API Gateway', status: 'healthy', response: '67ms' },
    ];

    const recentEvents = [
        { event: 'System backup completed', time: '2 hours ago', type: 'info' },
        { event: 'Database optimization', time: '6 hours ago', type: 'info' },
        { event: 'Security patch applied', time: '1 day ago', type: 'success' },
        { event: 'High memory usage alert', time: '2 days ago', type: 'warning' },
        { event: 'SSL certificate renewed', time: '3 days ago', type: 'success' },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'healthy': return <Badge variant="success">Healthy</Badge>;
            case 'warning': return <Badge variant="warning">Warning</Badge>;
            case 'error': return <Badge variant="error">Error</Badge>;
            default: return <Badge>Unknown</Badge>;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'success': return 'text-green-600';
            case 'warning': return 'text-yellow-600';
            case 'error': return 'text-red-600';
            default: return 'text-blue-600';
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <PageHeader
                title="System Overview"
                description="Monitor system performance, health, and infrastructure"
            />

            {/* System Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.uptime}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
                            </div>
                            <Clock className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.responseTime}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Avg Response</div>
                            </div>
                            <Activity className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.activeUsers}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Active Users</div>
                            </div>
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.storageUsed}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Storage Used</div>
                            </div>
                            <Database className="w-8 h-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.memoryUsage}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Memory Usage</div>
                            </div>
                            <Server className="w-8 h-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {systemMetrics.cpuUsage}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">CPU Usage</div>
                            </div>
                            <Cpu className="w-8 h-8 text-cyan-600" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Health */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                System Health
                            </h3>
                            <div className="space-y-3">
                                {systemHealth.map((service, index) => (
                                    <div key={service.service} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <div className="flex items-center space-x-3">
                                            <Shield className={`w-5 h-5 ${service.status === 'healthy' ? 'text-green-600' :
                                                service.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                                }`} />
                                            <div>
                                                <div className="font-medium text-slate-900 dark:text-white">
                                                    {service.service}
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    Response: {service.response}
                                                </div>
                                            </div>
                                        </div>
                                        {getStatusBadge(service.status)}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                                Recent Events
                            </h3>
                            <div className="space-y-3">
                                {recentEvents.map((event, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <Activity className={`w-4 h-4 ${getEventColor(event.type)}`} />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                                                {event.event}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-500">
                                                {event.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
