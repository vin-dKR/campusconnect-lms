import {
    LayoutDashboard,
    Calendar,
    FileText,
    CreditCard,
    BarChart3,
    BookOpen,
    Users,
} from 'lucide-react';

export const studentItems = [
    { href: '/dashboard', icon: LayoutDashboard, logoUrl: "/svgs/dash.svg", label: 'Dashboard' },
    { href: '/dashboard/materials', icon: BookOpen, logoUrl: "/svgs/study-material.svg", label: 'Study Materials' },
    { href: '/dashboard/report-card', icon: FileText, logoUrl: "svgs/report-card.svg", label: 'Report Card' },
    { href: '/dashboard/fees', icon: CreditCard, logoUrl: "/svgs/payment.svg", label: 'Fees' },
];

export const teacherItems = [
    { href: '/dashboard', icon: LayoutDashboard, logoUrl: "/svgs/dash.svg", label: 'Dashboard' },
    { href: '/dashboard/attendance', icon: Calendar, logoUrl: "/svgs/dash.svg", label: 'Attendance' },
    { href: '/dashboard/materials', icon: BookOpen, logoUrl: "/svgs/dash.svg", label: 'Study Materials' },
];

export const adminItems = [
    { href: '/dashboard', icon: LayoutDashboard, logoUrl: "/svgs/dash.svg", label: 'Dashboard' },
    { href: '/dashboard/analytics', icon: BarChart3, logoUrl: "/svgs/dash.svg", label: 'Analytics' },
    { href: '/dashboard/users', icon: Users, logoUrl: "/svgs/dash.svg", label: 'User Management' },
];

export const superadminItems = [
    { href: '/dashboard', icon: LayoutDashboard, logoUrl: "/svgs/dash.svg", label: 'Dashboard' },
    { href: '/dashboard/analytics', icon: BarChart3, logoUrl: "/svgs/dash.svg", label: 'Analytics' },
    { href: '/dashboard/users', icon: Users, logoUrl: "/svgs/dash.svg", label: 'User Management' },
    { href: '/dashboard/system', icon: BarChart3, logoUrl: "/svgs/dash.svg", label: 'System Overview' },
];
