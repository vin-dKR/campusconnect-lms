'use client';

import { useAuthStore } from '@/store/auth-store';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LogOut, User, Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface DashboardHeaderProps {
    onMenuClick: () => void;
    sidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}

export function DashboardHeader({ onMenuClick, sidebarCollapsed, onToggleSidebar }: DashboardHeaderProps) {
    const { user, logout } = useAuthStore();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'superadmin': return 'text-red-600 dark:text-red-400';
            case 'admin': return 'text-blue-600 dark:text-blue-400';
            case 'teacher': return 'text-green-600 dark:text-green-400';
            case 'student': return 'text-purple-600 dark:text-purple-400';
            default: return 'text-slate-600 dark:text-slate-400';
        }
    };

    return (
        <header className="bg-transparent sticky top-0 z-30">
            <div className="flex items-center justify-between p-6">
                {/* Left side - Menu button and breadcrumb */}
                <div className="flex items-center space-x-4">
                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group cursor-pointer"
                    >
                        <Menu className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
                    </Button>

                    {/* Desktop sidebar toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleSidebar}
                        className="hidden lg:flex h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group cursor-pointer"
                    >
                        <Menu className="w-4 h-4 text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
                    </Button>

                    <div className="hidden sm:block">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            Welcome back, <span className="font-medium text-slate-900 dark:text-white">{user?.name}</span>
                        </div>
                    </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center space-x-3">
                    {/* Search */}
                    <div className="hidden md:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="w-64 pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group cursor-pointer"
                    >
                        <Bell className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:scale-110 transition-transform duration-200" />
                    </Button>

                    <ThemeToggle />

                    {/* User menu */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors group cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="hidden lg:block text-left">
                                <div className="text-sm font-medium text-slate-900 dark:text-white">
                                    {user?.name}
                                </div>
                                <div className={`text-xs ${getRoleColor(user?.role || '')}`}>
                                    {user?.role}
                                </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                        </button>

                        <AnimatePresence>
                            {showUserMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-40"
                                >
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <LogOut className="w-4 h-4 text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300 transition-colors" />
                                        <span>Sign out</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
