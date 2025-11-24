'use client';

import { useAuthStore } from '@/store/auth-store';
import {
    LayoutDashboard,
    Calendar,
    FileText,
    CreditCard,
    BarChart3,
    BookOpen,
    Users,
    ChevronLeft,
    ChevronRight,
    School,
    User
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
}

const studentItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/materials', icon: BookOpen, label: 'Study Materials' },
    { href: '/dashboard/report-card', icon: FileText, label: 'Report Card' },
    { href: '/dashboard/fees', icon: CreditCard, label: 'Fees' },
];

const teacherItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/attendance', icon: Calendar, label: 'Attendance' },
    { href: '/dashboard/materials', icon: BookOpen, label: 'Study Materials' },
];

const adminItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/users', icon: Users, label: 'User Management' },
];

const superadminItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/users', icon: Users, label: 'User Management' },
    { href: '/dashboard/system', icon: BarChart3, label: 'System Overview' },
];

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
                        className="lg:hidden fixed inset-0 bg-black/10 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className='py-2 h-screen'>
                <motion.div
                    initial={false}
                    animate={{
                        x: isCollapsed ? 10 : (isOpen ? 10 : -280),
                        width: isCollapsed ? 80 : 280
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed lg:sticky top-0 left-0 h-full bg-white dark:bg-slate-900 z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 rounded-xl"
                >
                    {/* Header */}
                    <div className={cn(
                        "p-6 transition-all duration-300",
                        isCollapsed ? "px-4" : "px-6"
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
                                            <div>
                                                <div className="text-lg font-light text-slate-900 dark:text-white whitespace-nowrap">
                                                    EduLMS
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-500 capitalize whitespace-nowrap">
                                                    {user?.role}
                                                </div>
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
                        isCollapsed ? "px-2" : "px-4"
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
                                        className={cn(
                                            "flex items-center transition-all duration-200 group relative",
                                            isCollapsed ? "justify-center px-2 py-3 rounded-xl" : "space-x-3 px-3 py-3 rounded-xl",
                                            isActive
                                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-lg transition-colors flex-shrink-0",
                                            isActive
                                                ? "bg-blue-100 dark:bg-blue-800"
                                                : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                                        )}>
                                            <item.icon className="w-4 h-4" />
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

                                        {/* Tooltip for collapsed state */}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
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
                        "p-4 transition-all duration-300",
                        isCollapsed ? "px-2" : "px-4"
                    )}>
                        <div className={cn(
                            "flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-slate-800",
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
                </motion.div>
            </div>
        </>
    );
}
