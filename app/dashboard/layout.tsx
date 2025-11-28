'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { redirect, useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;

        if (width >= 1024 && !sidebarOpen) {
            setSidebarOpen(true);
        } else if (width <= 363 && sidebarCollapsed) {
            setSidebarCollapsed(false)
        }
    }, [sidebarOpen, sidebarCollapsed]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        handleResize();

        let timeout: ReturnType<typeof setTimeout>
        const listener = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [handleResize]);

    // Check authentication status
    useEffect(() => {
        // If store is still loading, wait
        if (isLoading) {
            return;
        }

        // If not authenticated or no user, redirect
        if (!isAuthenticated || !user) {
            console.log("Redirecting to signin - User:", user, "isAuthenticated:", isAuthenticated);
            redirect('/auth/signin');
        }

        // If user is not onboarded, redirect to onboarding
        if (!user.isOnboarded) {
            console.log("Redirecting to onboarding");
            redirect('/onboarding');
        }

        setIsCheckingAuth(false);
    }, [user, isAuthenticated, isLoading, router]);

    // Show loading spinner while checking authentication
    if (isCheckingAuth || isLoading) {
        return (
            <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-slate-600 dark:text-slate-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    const onToggleCollapse = () => {
        setSidebarOpen(true);
        setSidebarCollapsed((curr) => !curr);
    };

    const onToggleClose = () => {
        setSidebarCollapsed(false);
        setSidebarOpen((curr) => !curr);
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 flex">
            <DashboardSidebar
                isOpen={sidebarOpen}
                isCollapsed={sidebarCollapsed}
                onClose={onToggleClose}
                onToggleCollapse={onToggleCollapse}
            />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <DashboardHeader
                    onMenuClick={onToggleClose}
                    sidebarCollapsed={sidebarCollapsed}
                    onToggleSidebar={onToggleCollapse}
                />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
