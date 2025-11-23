'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, User, GraduationCap, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuthStore, type UserRole } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, loginAsGuest } = useAuthStore();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
            toast.success('Login successful!');
            router.push('/dashboard');
        } catch (error) {
            toast.error('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestLogin = (role: UserRole) => {
        loginAsGuest(role);
        toast.success(`Logged in as ${role}`);
        router.push('/dashboard');
    };

    const guestRoles = [
        {
            role: 'student' as UserRole,
            icon: User,
            title: 'Student',
            description: 'Access study materials and track progress',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            role: 'teacher' as UserRole,
            icon: GraduationCap,
            title: 'Teacher',
            description: 'Manage classes and student attendance',
            color: 'from-purple-500 to-pink-500'
        },
        {
            role: 'admin' as UserRole,
            icon: Settings,
            title: 'Administrator',
            description: 'Oversee institution operations',
            color: 'from-green-500 to-emerald-500'
        },
        {
            role: 'superadmin' as UserRole,
            icon: BarChart3,
            title: 'Super Admin',
            description: 'System-wide analytics and management',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex justify-center mb-2">
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    EduLMS
                                </div>
                            </div>
                            <h1 className="text-3xl font-light text-slate-900 dark:text-white mb-2">
                                Welcome back
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Sign in to your account
                            </p>
                        </motion.div>
                    </div>

                    {/* Login Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-slate-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-slate-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg font-medium transition-all duration-200"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign in
                                </>
                            )}
                        </Button>
                    </motion.form>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-950 text-slate-500">Or continue as</span>
                        </div>
                    </motion.div>

                    {/* Guest Access */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {guestRoles.map((guest, index) => (
                            <button
                                key={guest.role}
                                onClick={() => handleGuestLogin(guest.role)}
                                className="p-4 text-left border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 group"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${guest.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                    <guest.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                    {guest.title}
                                </div>
                                <div className="text-xs text-slate-600 dark:text-slate-400">
                                    {guest.description}
                                </div>
                            </button>
                        ))}
                    </motion.div>

                    {/* Demo Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <p className="text-sm text-slate-500 dark:text-slate-500">
                            Demo access • No password required
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right side - Visual */}
            <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
                {/* Grid background */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(currentColor 0.5px, transparent 0.5px),
              linear-gradient(90deg, currentColor 0.5px, transparent 0.5px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                ></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center max-w-md"
                >
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center mx-auto mb-8">
                            <LogIn className="w-8 h-8 text-white dark:text-slate-900" />
                        </div>

                        <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                            Modern Learning Management
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Experience the future of educational administration with our intuitive platform designed for institutions of all sizes.
                        </p>

                        <div className="flex justify-center space-x-8 pt-8">
                            {['Attendance', 'Materials', 'Reports', 'Analytics'].map((feature) => (
                                <div key={feature} className="text-center">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full mx-auto mb-2"></div>
                                    <span className="text-xs text-slate-500 dark:text-slate-500">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Theme Toggle */}
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>
        </div>
    );
}
