import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserDb = create<UserDB>()(
    persist((set, get) => ({
        users: {},

        addUserToDb: (user) => set(
            (state) => ({
                users: {
                    ...state.users,
                    [user.email]: { ...user }
                }
            })
        ),

        getAllUsers: () => get().users,
        getAllStudents: () => {
            const allUsers = get().getAllUsers()

            const studentsArray: User[] = []
            for (let [key, value] of Object.entries(allUsers)) {
                if (value.role === "student") {
                    studentsArray.push(value)
                }
            }
            return studentsArray
        },
        getAllTeachers: () => get()
    }),
        { name: 'users-sotre' })
)
