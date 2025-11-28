import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '@/constants/mock-data/auth-store';
import { useUserDb } from './users-store';
import { userAppStore } from './app-store';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: async (email: string, password: string) => {
                set({ isLoading: true })

                await new Promise((resolve) => setTimeout(resolve, 1000))

                const currentUsersState = useUserDb.getState();
                const usersFromDb = Object.values(currentUsersState.users);

                const user = usersFromDb.find(user => user.email === email)

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

                useUserDb.getState().addUserToDb(createNewUser);

                set({ user: createNewUser, isAuthenticated: true, isLoading: false })
            },

            loginAsGuest: (role) => {
                set({ user: mockUsers[role], isAuthenticated: true, isLoading: false })
            },

            logout: () => {
                set({ user: null, isAuthenticated: false })
            },

            updateUser: (userData) => {
                set({ isLoading: true })

                const { user } = get()
                if (!user) return;

                const updatedUser: User = {
                    ...user,
                    ...userData,
                    profile: {
                        ...user.profile,
                        ...userData.profile,
                    },
                };

                set({ user: updatedUser });

                const userDb = useUserDb.getState()
                userDb.addUserToDb(updatedUser)
            },

            completeOnboarding: (onboardingData) => {
                const { user } = get()

                if (!user) return;

                const updatedUser: User = {
                    ...user,
                    isOnboarded: true,
                    phone: onboardingData.phone || user.phone,
                    profile: {
                        ...user.profile,
                        ...onboardingData.profile,
                    },
                };

                set({
                    user: updatedUser,
                });

                const userDb = useUserDb.getState()
                userDb.addUserToDb(updatedUser)

                const appStore = userAppStore.getState();
                if (appStore.updateUser) {
                    appStore.updateUser(user.id, {
                        isOnboarded: true,
                        phone: onboardingData.phone,
                        profile: onboardingData.profile,
                    });
                }
            }

        }),
        {
            name: 'auth-storage',
        },
    )
);
