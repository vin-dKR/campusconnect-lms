'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, FileText, Download, CreditCard, BarChart3, Users } from 'lucide-react';

const features = [
    {
        icon: Calendar,
        title: 'Digital Attendance',
        description: 'Replace manual registers with instant digital attendance tracking and real-time analytics.'
    },
    {
        icon: FileText,
        title: 'Study Materials',
        description: 'Centralized resource sharing with organized access controls and version management.'
    },
    {
        icon: Download,
        title: 'Smart Report Cards',
        description: 'Generate comprehensive report cards with analytics and one-click PDF export capabilities.'
    },
    {
        icon: CreditCard,
        title: 'Fees Management',
        description: 'Streamline fee collection with automated receipts, payment tracking, and financial reporting.'
    },
    {
        icon: BarChart3,
        title: 'Performance Analytics',
        description: 'Gain deep insights with comprehensive dashboards and visual data representations.'
    },
    {
        icon: Users,
        title: 'Role-based Access',
        description: 'Secure platform with tailored experiences for students, teachers, and administrators.'
    }
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group p-8 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-colors duration-300"
        >
            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
}

export function FeaturesGrid() {
    return (
        <section id="features" className="py-32 px-6 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mb-4">
                        Comprehensive Features
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Everything you need to modernize your educational institution's operations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
