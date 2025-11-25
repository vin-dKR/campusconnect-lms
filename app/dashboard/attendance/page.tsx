'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, X, Clock, Save, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

type AttendanceStatus = 'present' | 'absent' | 'late';

interface Student {
    id: string;
    name: string;
    rollNumber: string;
    status: AttendanceStatus;
}

export default function AttendancePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedClass, setSelectedClass] = useState('10A');
    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: 'John Smith', rollNumber: '001', status: 'present' },
        { id: '2', name: 'Emma Wilson', rollNumber: '002', status: 'present' },
        { id: '3', name: 'Michael Brown', rollNumber: '003', status: 'late' },
        { id: '4', name: 'Sarah Johnson', rollNumber: '004', status: 'absent' },
        { id: '5', name: 'David Lee', rollNumber: '005', status: 'present' },
        { id: '6', name: 'Lisa Garcia', rollNumber: '006', status: 'present' },
    ]);
    const [isSaving, setIsSaving] = useState(false);

    const classes = ['10A', '10B', '11A', '11B', '12A', '12B'];

    const updateAttendance = (studentId: string, status: AttendanceStatus) => {
        setStudents(prev => prev.map(student =>
            student.id === studentId ? { ...student, status } : student
        ));
    };

    const handleSaveAttendance = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success('Attendance saved successfully!');
    };

    const getStatusColor = (status: AttendanceStatus) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700 border-green-200';
            case 'absent': return 'bg-red-100 text-red-700 border-red-200';
            case 'late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    const getStatusIcon = (status: AttendanceStatus) => {
        switch (status) {
            case 'present': return <Check className="w-4 h-4" />;
            case 'absent': return <X className="w-4 h-4" />;
            case 'late': return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                            Attendance Management
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Mark and manage student attendance
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-slate-400" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                {students.length} students
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Class Selector */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Class
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {classes.map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Date
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-end">
                        <Button
                            onClick={handleSaveAttendance}
                            disabled={isSaving}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
                        >
                            {isSaving ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Saving...
                                </div>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Attendance
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Students List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                        Students - {selectedClass}
                    </h2>
                </div>

                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {students.map((student, index) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white">
                                        {student.name}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-500">
                                        Roll No: {student.rollNumber}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant={student.status === 'present' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => updateAttendance(student.id, 'present')}
                                    className={`rounded-lg ${student.status === 'present'
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'border-slate-300 dark:border-slate-700'
                                        }`}
                                >
                                    <Check className="w-4 h-4 mr-1" />
                                    Present
                                </Button>

                                <Button
                                    variant={student.status === 'late' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => updateAttendance(student.id, 'late')}
                                    className={`rounded-lg ${student.status === 'late'
                                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                        : 'border-slate-300 dark:border-slate-700'
                                        }`}
                                >
                                    <Clock className="w-4 h-4 mr-1" />
                                    Late
                                </Button>

                                <Button
                                    variant={student.status === 'absent' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => updateAttendance(student.id, 'absent')}
                                    className={`rounded-lg ${student.status === 'absent'
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'border-slate-300 dark:border-slate-700'
                                        }`}
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Absent
                                </Button>

                                <div className={`ml-4 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(student.status)}`}>
                                    <div className="flex items-center space-x-1">
                                        {getStatusIcon(student.status)}
                                        <span className="capitalize">{student.status}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-green-900 dark:text-green-100">
                                {students.filter(s => s.status === 'present').length}
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">Present</div>
                        </div>
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-yellow-900 dark:text-yellow-100">
                                {students.filter(s => s.status === 'late').length}
                            </div>
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">Late</div>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-red-900 dark:text-red-100">
                                {students.filter(s => s.status === 'absent').length}
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-300">Absent</div>
                        </div>
                        <X className="w-8 h-8 text-red-600" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
