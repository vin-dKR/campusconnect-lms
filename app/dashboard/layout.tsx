'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated } = useAuthStore();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    console.log("sidebarOpen-----", sidebarOpen, "------sidebarCollapsed", sidebarCollapsed)

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        console.log("--width", width)

        if (width >= 1024 && !sidebarOpen) {
            setSidebarOpen(true);
        } else if (width <= 363 && sidebarCollapsed) {
            setSidebarCollapsed(false)
        }
    }, [sidebarOpen, sidebarCollapsed]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        console.log("--useeffect")

        handleResize();

        let timeout: ReturnType<typeof setTimeout>
        const listener = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleResize, 150);
        };

        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [handleResize]);

    if (!isAuthenticated || !user) {
        redirect('/auth/signin');
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
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex">
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

