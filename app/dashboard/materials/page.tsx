'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Upload, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudyMaterial {
    id: string;
    title: string;
    type: 'pdf' | 'doc' | 'video' | 'image';
    subject: string;
    uploadedBy: string;
    uploadDate: string;
    size: string;
    downloadUrl: string;
}

export default function StudyMaterialsPage() {
    const [materials, setMaterials] = useState<StudyMaterial[]>([
        {
            id: '1',
            title: 'Mathematics Chapter 1 Notes',
            type: 'pdf',
            subject: 'Mathematics',
            uploadedBy: 'Dr. Smith',
            uploadDate: '2024-01-15',
            size: '2.4 MB',
            downloadUrl: '#'
        },
        {
            id: '2',
            title: 'Physics Lab Manual',
            type: 'doc',
            subject: 'Physics',
            uploadedBy: 'Prof. Johnson',
            uploadDate: '2024-01-14',
            size: '1.8 MB',
            downloadUrl: '#'
        },
        {
            id: '3',
            title: 'Chemistry Formulas',
            type: 'pdf',
            subject: 'Chemistry',
            uploadedBy: 'Dr. Brown',
            uploadDate: '2024-01-13',
            size: '3.1 MB',
            downloadUrl: '#'
        },
        {
            id: '4',
            title: 'Biology Diagrams',
            type: 'image',
            subject: 'Biology',
            uploadedBy: 'Dr. Wilson',
            uploadDate: '2024-01-12',
            size: '4.2 MB',
            downloadUrl: '#'
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');

    const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

    const filteredMaterials = materials.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject === 'all' || material.subject === selectedSubject)
    );

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'pdf': return '📄';
            case 'doc': return '📝';
            case 'video': return '🎬';
            case 'image': return '🖼️';
            default: return '📎';
        }
    };

    const getFileColor = (type: string) => {
        switch (type) {
            case 'pdf': return 'bg-red-100 text-red-600';
            case 'doc': return 'bg-blue-100 text-blue-600';
            case 'video': return 'bg-purple-100 text-purple-600';
            case 'image': return 'bg-green-100 text-green-600';
            default: return 'bg-slate-100 text-slate-600';
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
                            Study Materials
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Access and manage educational resources
                        </p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Material
                    </Button>
                </div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Subject Filter */}
                    <div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>
                                        {subject === 'all' ? 'All Subjects' : subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Materials Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredMaterials.map((material, index) => (
                    <motion.div
                        key={material.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${getFileColor(material.type)} flex items-center justify-center text-xl`}>
                                {getFileIcon(material.type)}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>

                        <h3 className="font-medium text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {material.title}
                        </h3>

                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center justify-between">
                                <span>Subject</span>
                                <span className="font-medium">{material.subject}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Uploaded by</span>
                                <span>{material.uploadedBy}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Date</span>
                                <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Size</span>
                                <span>{material.size}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <Button
                                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredMaterials.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                        No materials found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                        Try adjusting your search or filter criteria
                    </p>
                </motion.div>
            )}
        </div>
    );
}
