'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { AVAILABLE_CLASSES, AVAILABLE_SUBJECTS } from '@/constants/onboarding/onboarding-data';

interface AcademicStepProps {
    formData: {
        grade: string;
        subjects: string[];
    };
    onFormDataChange: (field: string, value: string) => void;
    onToggleSubject: (subject: string) => void;
}

export function AcademicStep({ formData, onFormDataChange, onToggleSubject }: AcademicStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                Academic Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
                Set up your academic preferences
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Class
                    </label>
                    <select
                        value={formData.grade}
                        onChange={(e) => onFormDataChange('grade', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {AVAILABLE_CLASSES.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Subjects
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {AVAILABLE_SUBJECTS.map((subject) => (
                            <button
                                key={subject}
                                type="button"
                                onClick={() => onToggleSubject(subject)}
                                className={`p-3 text-center border rounded-lg transition-all duration-200 ${formData.subjects.includes(subject)
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                                    }`}
                            >
                                <BookOpen className="w-4 h-4 mx-auto mb-1" />
                                <div className="text-sm font-medium">{subject}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
