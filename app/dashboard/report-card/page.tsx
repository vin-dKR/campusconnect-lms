'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, User, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SubjectGrade {
    subject: string;
    exam: string;
    marks: number;
    totalMarks: number;
    grade: string;
}

interface PerformanceData {
    subject: string;
    score: number;
    fullMark: number;
}

export default function ReportCardPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const subjects: SubjectGrade[] = [
        { subject: 'Mathematics', exam: 'Mid-Term', marks: 85, totalMarks: 100, grade: 'A' },
        { subject: 'Physics', exam: 'Mid-Term', marks: 78, totalMarks: 100, grade: 'B+' },
        { subject: 'Chemistry', exam: 'Mid-Term', marks: 92, totalMarks: 100, grade: 'A+' },
        { subject: 'Biology', exam: 'Mid-Term', marks: 88, totalMarks: 100, grade: 'A' },
        { subject: 'English', exam: 'Mid-Term', marks: 82, totalMarks: 100, grade: 'B+' },
        { subject: 'Computer Science', exam: 'Mid-Term', marks: 95, totalMarks: 100, grade: 'A+' },
    ];

    const performanceData: PerformanceData[] = [
        { subject: 'Math', score: 85, fullMark: 100 },
        { subject: 'Physics', score: 78, fullMark: 100 },
        { subject: 'Chemistry', score: 92, fullMark: 100 },
        { subject: 'Biology', score: 88, fullMark: 100 },
        { subject: 'English', score: 82, fullMark: 100 },
        { subject: 'CS', score: 95, fullMark: 100 },
    ];

    const trendData = [
        { month: 'Jan', marks: 75 },
        { month: 'Feb', marks: 78 },
        { month: 'Mar', marks: 82 },
        { month: 'Apr', marks: 85 },
        { month: 'May', marks: 88 },
        { month: 'Jun', marks: 92 },
    ];

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        // Simulate PDF generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsGenerating(false);
        // In real app, this would trigger PDF download
        alert('PDF report card generated!');
    };

    const calculateAverage = () => {
        const total = subjects.reduce((sum, subject) => sum + subject.marks, 0);
        return (total / subjects.length).toFixed(1);
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
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-light text-slate-900 dark:text-white mb-1">
                                Alex Johnson
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Grade 10A • Roll No: 012
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                        {isGenerating ? (
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Generating...
                            </div>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-slate-900 dark:text-white">
                                {calculateAverage()}%
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Average</div>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-slate-900 dark:text-white">
                                A
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Overall Grade</div>
                        </div>
                        <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-slate-900 dark:text-white">
                                6
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Subjects</div>
                        </div>
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-light text-slate-900 dark:text-white">
                                94%
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Attendance</div>
                        </div>
                        <User className="w-8 h-8 text-purple-600" />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Marks Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            Subject-wise Marks
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Subject</th>
                                    <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Exam</th>
                                    <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Marks</th>
                                    <th className="text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {subjects.map((subject, index) => (
                                    <tr key={subject.subject} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="p-4 text-sm text-slate-900 dark:text-white">{subject.subject}</td>
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{subject.exam}</td>
                                        <td className="p-4 text-sm text-slate-900 dark:text-white">
                                            {subject.marks}/{subject.totalMarks}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subject.grade === 'A+' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                subject.grade === 'A' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                }`}>
                                                {subject.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Performance Charts */}
                <div className="space-y-6">
                    {/* Marks Trend */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                    >
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Performance Trend
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="marks" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Subject-wise Performance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
                    >
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                            Subject Analysis
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={performanceData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Performance" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
