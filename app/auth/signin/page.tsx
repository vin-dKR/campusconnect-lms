'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormInput } from '@/components/auth/FormInput';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { Divider } from '@/components/auth/Divider';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { guestRoles } from '@/constants/auth-data/sign';
import Link from 'next/link';

const loginVisual = {
    icon: LogIn,
    title: 'Modern Learning Management',
    description: 'Experience the future of educational administration with our intuitive platform designed for institutions of all sizes.',
    features: ['Attendance', 'Materials', 'Reports', 'Analytics']
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, login, loginAsGuest } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard")
        }
    }, [user])

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

    return (
        <AuthLayout visual={loginVisual}>
            {/* Header */}
            <AuthHeader
                title="Welcome back"
                subtitle="Sign in to your account"
            />

            {/* Login Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <FormInput
                    id="email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    autoComplete="email"
                />

                <PasswordInput
                    id="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />

                <AuthButton
                    isLoading={isLoading}
                    label="Sign in"
                    loadingLabel="Signing in..."
                    icon={LogIn}
                />
            </motion.form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
            >
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    New here ?{' '}
                    <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        Sign up
                    </Link>
                </p>
            </motion.div>
            <Divider text="Or continue as" />

            {/* Guest Access */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <RoleSelector
                    roles={guestRoles}
                    selectedRole="student"
                    onRoleChange={handleGuestLogin}
                    label=""
                    layout="cards"
                />
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

        </AuthLayout>
    );
}
