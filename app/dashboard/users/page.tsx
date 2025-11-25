'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Filter, Mail, Phone, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/dashboard/page-header';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: 'student' | 'teacher' | 'admin';
    className?: string;
    status: 'active' | 'inactive';
    joinDate: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@school.edu',
            phone: '+91 98765 43210',
            role: 'student',
            className: '10A',
            status: 'active',
            joinDate: '2023-08-15'
        },
        {
            id: '2',
            name: 'Dr. Sarah Wilson',
            email: 'sarah.wilson@school.edu',
            phone: '+91 98765 43211',
            role: 'teacher',
            status: 'active',
            joinDate: '2022-06-01'
        },
        {
            id: '3',
            name: 'Emma Johnson',
            email: 'emma.johnson@school.edu',
            phone: '+91 98765 43212',
            role: 'student',
            className: '11B',
            status: 'active',
            joinDate: '2023-08-15'
        },
        {
            id: '4',
            name: 'Prof. Michael Brown',
            email: 'michael.brown@school.edu',
            phone: '+91 98765 43213',
            role: 'teacher',
            status: 'active',
            joinDate: '2021-03-15'
        },
        {
            id: '5',
            name: 'Admin User',
            email: 'admin@school.edu',
            phone: '+91 98765 43214',
            role: 'admin',
            status: 'active',
            joinDate: '2020-01-10'
        },
        {
            id: '6',
            name: 'Lisa Garcia',
            email: 'lisa.garcia@school.edu',
            phone: '+91 98765 43215',
            role: 'student',
            className: '12A',
            status: 'inactive',
            joinDate: '2023-08-15'
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const roles = ['all', 'student', 'teacher', 'admin'];
    const statuses = ['all', 'active', 'inactive'];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRole === 'all' || user.role === selectedRole) &&
        (selectedStatus === 'all' || user.status === selectedStatus)
    );

    const getRoleBadge = (role: User['role']) => {
        switch (role) {
            case 'student':
                return <Badge variant="secondary">Student</Badge>;
            case 'teacher':
                return <Badge variant="success">Teacher</Badge>;
            case 'admin':
                return <Badge variant="error">Admin</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    const getStatusBadge = (status: User['status']) => {
        return status === 'active'
            ? <Badge variant="success">Active</Badge>
            : <Badge variant="error">Inactive</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const userStats = {
        total: users.length,
        students: users.filter(u => u.role === 'student').length,
        teachers: users.filter(u => u.role === 'teacher').length,
        admins: users.filter(u => u.role === 'admin').length,
        active: users.filter(u => u.status === 'active').length,
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <PageHeader
                title="User Management"
                description="Manage all users including students, teachers, and administrators"
                action={
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                }
            />

            {/* User Statistics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {userStats.total}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Total Users</div>
                            </div>
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {userStats.students}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Students</div>
                            </div>
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {userStats.teachers}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Teachers</div>
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
                                    {userStats.admins}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Admins</div>
                            </div>
                            <Users className="w-8 h-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {userStats.active}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Active</div>
                            </div>
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users by name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Role Filter */}
                            <div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>
                                                {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>
                                                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            All Users ({filteredUsers.length})
                        </h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableHead>User</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-500">
                                                        ID: {user.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Mail className="w-4 h-4" />
                                                    <span>{user.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getRoleBadge(user.role)}
                                        </TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400">
                                            {user.className || '-'}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(user.status)}
                                        </TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400">
                                            {formatDate(user.joinDate)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-slate-300 dark:border-slate-700 text-red-600 dark:text-red-400 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <Users className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                        No users found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Try adjusting your search or filter criteria
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New User
                    </Button>
                </motion.div>
            )}
        </div>
    );
}
