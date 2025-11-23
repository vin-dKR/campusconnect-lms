'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex">
            {/* Sidebar - Collapsible */}
            <DashboardSidebar
                isOpen={sidebarOpen}
                isCollapsed={sidebarCollapsed}
                onClose={() => setSidebarOpen(false)}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? '' : ''
                }`}>
                <DashboardHeader
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                    sidebarCollapsed={sidebarCollapsed}
                    onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
