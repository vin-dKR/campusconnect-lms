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
    phone?: string;
    joinDate: string;
    isOnboarded: boolean;
    profile?: {
        grade?: string;
        subjects?: string[];
        address?: string;
        emergencyContact?: string;
    };
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
    loginAsGuest: (role: UserRole) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    completeOnboarding: (onboardingData: any) => void;
}

const mockUsers: Record<UserRole, User> = {
    student: {
        id: '1',
        email: 'student@edulms.com',
        name: 'Alex Johnson',
        role: 'student',
        className: 'Grade 10A',
        phone: '+91 98765 43210',
        joinDate: '2024-01-15',
        isOnboarded: true,
        profile: {
            grade: '10A',
            subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
            address: '123 Main St, City, State',
            emergencyContact: '+91 98765 43211'
        }
    },
    teacher: {
        id: '2',
        email: 'teacher@edulms.com',
        name: 'Sarah Wilson',
        role: 'teacher',
        phone: '+91 98765 43212',
        joinDate: '2023-06-01',
        isOnboarded: true,
        profile: {
            subjects: ['Physics', 'Mathematics'],
            address: '456 Oak St, City, State'
        }
    },
    admin: {
        id: '3',
        email: 'admin@edulms.com',
        name: 'Michael Brown',
        role: 'admin',
        phone: '+91 98765 43213',
        joinDate: '2022-03-15',
        isOnboarded: true
    },
    superadmin: {
        id: '4',
        email: 'superadmin@edulms.com',
        name: 'Admin System',
        role: 'superadmin',
        phone: '+91 98765 43214',
        joinDate: '2021-01-10',
        isOnboarded: true
    },
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true })

                await new Promise((resolve) => setTimeout(resolve, 1000))

                const user = Object.values(mockUsers).find(u => u.email === email)
                if (user && password === "password") {
                    set({ user, isAuthenticated: true, isLoading: false })
                } else {
                    set({ isLoading: false })
                    throw new Error("Invalid credentials")
                }
            },

            signup: async (email: string, password: string, name: string, role: UserRole) => {
                set({ isLoading: true })

                await new Promise((resolve) => setTimeout(resolve, 1000))

                const createNewUser: User = {
                    id: Date.now().toString(),
                    email,
                    name,
                    role,
                    joinDate: new Date().toISOString().split('T')[0],
                    isOnboarded: false
                }

                set({ user: createNewUser, isAuthenticated: true, isLoading: false })
            },

            loginAsGuest: (role: UserRole) => {
                set({ user: mockUsers[role], isAuthenticated: true, isLoading: false })
            },

            logout: () => {
                set({ user: null, isAuthenticated: false })
            },

            updateUser: (userData: Partial<User>) => {
                set({ isLoading: true })

                const { user } = get()
                if (user) {
                    set({ user: { ...user, ...userData } })
                }
            },

            completeOnboarding: (onboardingData: any) => {
                const { user } = get()
                if (user) {
                    set({
                        user: {
                            ...user,
                            ...onboardingData,
                            isOnboarded: true,
                            profile: {
                                ...user.profile,
                                ...onboardingData.profile
                            }
                        },
                    })
                }
            }

        }),
        {
            name: 'auth-storage',
        },
    )
);
