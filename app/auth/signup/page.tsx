'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthLayout, } from '@/components/auth/AuthLayout';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { FormInput } from '@/components/auth/FormInput';
import { RoleSelector } from '@/components/auth/RoleSelector';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { guestRoles, signupVisual } from '@/constants/auth-data/sign';


export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>('student');
    const { signup, isLoading } = useAuthStore();
    const router = useRouter();

    const roles = guestRoles.filter(role => role.role !== "superadmin")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !name) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            await signup(email, password, name, selectedRole);
            toast.success('Account created successfully!');
            router.push('/onboarding');
        } catch (error) {
            toast.error('Failed to create account. Please try again.');
        }
    };

    return (
        <AuthLayout visual={signupVisual}>
            {/* Header */}
            <AuthHeader
                title="Create your account"
                subtitle="Join thousands of institutions using EduLMS"
            />

            {/* Signup Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <FormInput
                    id="name"
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Enter your full name"
                />

                <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    autoComplete="email"
                />

                <RoleSelector
                    roles={roles}
                    selectedRole={selectedRole}
                    onRoleChange={setSelectedRole}
                    label="I am a"
                    layout="grid"
                />

                <PasswordInput
                    id="password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    showStrength={true}
                />

                <PasswordInput
                    id="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                />

                <AuthButton
                    isLoading={isLoading}
                    label="Create Account"
                    loadingLabel="Creating account..."
                    icon={UserPlus}
                />
            </motion.form>

            {/* Login Link */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
            >
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>

        </AuthLayout>
    );
}
