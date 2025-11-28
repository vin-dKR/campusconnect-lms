import { BarChart3, GraduationCap, Settings, User, UserPlus } from "lucide-react";

export const guestRoles: AuthRole[] = [
    {
        role: 'student',
        icon: User,
        title: 'Student',
        description: 'Access study materials and track progress',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        role: 'teacher',
        icon: GraduationCap,
        title: 'Teacher',
        description: 'Manage classes and student attendance',
        color: 'from-purple-500 to-pink-500'
    },
    {
        role: 'admin',
        icon: Settings,
        title: 'Administrator',
        description: 'Oversee institution operations',
        color: 'from-green-500 to-emerald-500'
    },
    {
        role: 'superadmin',
        icon: BarChart3,
        title: 'Super Admin',
        description: 'System-wide analytics and management',
        color: 'from-orange-500 to-red-500'
    }
];


export const signupVisual = {
    icon: UserPlus,
    title: 'Start Your Educational Journey',
    description: 'Join our platform to access modern learning tools, track your progress, and connect with educators worldwide.',
    features: ['Secure', 'Modern', 'Easy to Use']
};

