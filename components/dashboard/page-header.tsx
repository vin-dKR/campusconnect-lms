import { motion } from 'framer-motion';

interface PageHeaderProps {
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                        {title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>
                {action}
            </div>
        </motion.div>
    );
}
