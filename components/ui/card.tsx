import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function Card({ children, className, animate = true }: CardProps) {
    const Component = animate ? motion.div : 'div';

    return (
        <Component
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            className={cn(
                "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800",
                className
            )}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("p-6 border-b border-slate-200 dark:border-slate-800", className)}>
            {children}
        </div>
    );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("p-6", className)}>
            {children}
        </div>
    );
}
