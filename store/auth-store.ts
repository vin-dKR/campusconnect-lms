import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'teacher' | 'admin' | 'superadmin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    className?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginAsGuest: (role: UserRole) => void;
    logout: () => void;
}

const mockUsers: Record<UserRole, User> = {
    student: {
        id: '1',
        email: 'student@edulms.com',
        name: 'Alex Johnson',
        role: 'student',
        className: 'Grade 10A',
    },
    teacher: {
        id: '2',
        email: 'teacher@edulms.com',
        name: 'Sarah Wilson',
        role: 'teacher',
    },
    admin: {
        id: '3',
        email: 'admin@edulms.com',
        name: 'Michael Brown',
        role: 'admin',
    },
    superadmin: {
        id: '4',
        email: 'superadmin@edulms.com',
        name: 'Admin System',
        role: 'superadmin',
    },
};

export const useAuthStore = create<AuthState>()(
    // WIP: atleat chek the input fields are empty or not
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // For demo, any password works with demo emails
                const user = Object.values(mockUsers).find(u => u.email === email);
                if (user) {
                    set({ user, isAuthenticated: true });
                } else {
                    throw new Error('Invalid credentials');
                }
            },
            loginAsGuest: (role: UserRole) => {
                set({ user: mockUsers[role], isAuthenticated: true });
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
