'use client';

import { useAuthStore } from '@/store/auth-store';
import {
    ChevronLeft,
    School,
    User
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { adminItems, studentItems, superadminItems, teacherItems } from '@/constants/dashboard/layout';
import Image from 'next/image';
import { Badge } from '../ui/badge';

interface DashboardSidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
}


export function DashboardSidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: DashboardSidebarProps) {
    const { user } = useAuthStore();
    const pathname = usePathname();

    const getSidebarItems = () => {
        switch (user?.role) {
            case 'student': return studentItems;
            case 'teacher': return teacherItems;
            case 'admin': return adminItems;
            case 'superadmin': return superadminItems;
            default: return [];
        }
    };

    const items = getSidebarItems();

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="lg:hidden fixed inset-0 bg-black/20 z-100"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={{
                    x: isOpen ? 0 : (isCollapsed ? 0 : -280),
                    width: isCollapsed ? 80 : 280
                }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed lg:sticky top-0 left-0 h-screen z-20 flex flex-col p-2"
            >
                <div className='bg-white dark:bg-slate-900  h-full flex flex-col rounded-xl border border-slate-200 dark:border-slate-800'>
                    <div className="flex-1 flex flex-col py-2">
                        {/* Header */}
                        <div className={cn(
                            "transition-all duration-300 py-2",
                            isCollapsed ? "px-2" : "px-4"
                        )}>
                            <div className={cn(
                                "flex items-center transition-all duration-300",
                                isCollapsed ? "justify-center" : "justify-between"
                            )}>
                                <div className={cn(
                                    "flex items-center transition-all duration-300",
                                    isCollapsed ? "space-x-0" : "space-x-3"
                                )}>
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <School className="w-5 h-5 text-white" />
                                    </div>
                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.div
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className='flex space-x-3'>
                                                    <div className="text-lg font-light text-slate-900 dark:text-white whitespace-nowrap">
                                                        EduLMS
                                                    </div>
                                                    <Badge>
                                                        {user?.role}
                                                    </Badge>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Close button for mobile and collapse toggle for desktop */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={onClose}
                                        className="lg:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className={cn(
                            "flex-1 transition-all duration-300",
                            isCollapsed ? "px-1" : "px-2"
                        )}>
                            <div className="space-y-1">
                                {items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => {
                                                if (window.innerWidth < 1024) {
                                                    onClose();
                                                }
                                            }}
                                            title={isCollapsed ? item.label : undefined}
                                            className={cn(
                                                "flex items-center transition-all duration-200 group relative",
                                                isCollapsed ? "justify-center px-2 py-1 rounded-xl" : "space-x-3 px-3 py-2 rounded-xl",
                                                isActive
                                                    ? "text-slate-950 dark:text-white"
                                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                            )}
                                        >
                                            <div className={cn(
                                                "flex items-center rounded-lg transition-colors flex-shrink-0 w-full",
                                                isActive
                                                    ? "bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-950"
                                                    : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800",
                                                isCollapsed
                                                    ? "w-10 h-10 justify-center"
                                                    : "px-3 py-2 space-x-3"
                                            )}>
                                                <div className={cn(
                                                    "flex items-center justify-center",
                                                    isCollapsed ? "w-5 h-5" : "w-5 h-5"
                                                )}>
                                                    <Image
                                                        src={item.logoUrl}
                                                        alt={item.label}
                                                        width={20}
                                                        height={20}
                                                        className={cn(
                                                            "invert-0 dark:invert opacity-40",
                                                            isActive ? "opacity-100" : "",
                                                            isCollapsed ? "" : ""
                                                        )}
                                                    />
                                                </div>

                                                <AnimatePresence>
                                                    {!isCollapsed && (
                                                        <motion.span
                                                            initial={{ opacity: 0, width: 0 }}
                                                            animate={{ opacity: 1, width: "auto" }}
                                                            exit={{ opacity: 0, width: 0 }}
                                                            className="font-medium whitespace-nowrap overflow-hidden"
                                                        >
                                                            {item.label}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Tooltip for collapsed state */}
                                            {isCollapsed && (
                                                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                                                    {item.label}
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* User Info Footer */}
                        <div className={cn(
                            "transition-all duration-300",
                            isCollapsed ? "px-1" : "px-2"
                        )}>
                            <div className={cn(
                                "flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-950",
                                isCollapsed ? "justify-center p-3" : "space-x-3 p-3"
                            )}>
                                <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="flex-1 min-w-0 overflow-hidden"
                                        >
                                            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                                {user?.name}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-500 truncate">
                                                {user?.email}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
