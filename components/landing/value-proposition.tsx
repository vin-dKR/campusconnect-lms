'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, BarChart3, FileText, Users } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '10k+',
    label: 'Classes Managed'
  },
  {
    icon: Users,
    value: '50k+',
    label: 'Active Users'
  },
  {
    icon: FileText,
    value: '1M+',
    label: 'Documents Shared'
  },
  {
    icon: BarChart3,
    value: '99.9%',
    label: 'Uptime'
  }
];

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 mx-auto">
        <stat.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
      </div>
      <div className="text-2xl font-light text-slate-900 dark:text-white mb-2">
        {stat.value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function ValueProposition() {
  return (
    <section id="solutions" className="py-32 px-6 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 dark:text-white mb-4">
            Trusted by educational institutions worldwide
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of schools and colleges modernizing their operations with our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
