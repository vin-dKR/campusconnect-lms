import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserDb = create<UserDB>()(
    persist((set) => ({
        users: {},

        addUserToDb: (user) => set(
            (state) => ({
                users: {
                    ...state.users,
                    [user.email]: { ...user }
                }
            })
        )
    }),
        { name: 'users-sotre' })
)
