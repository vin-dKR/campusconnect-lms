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

        getAllTeachers: () => {
            const allUsers = get().getAllUsers()
            const teachersArray: User[] = []

            for (let [key, value] of Object.entries(allUsers)) {
                teachersArray.push(value)
            }

            return teachersArray
        },

        getStudentsByClass: (standard) => {
            const students = get().getAllStudents()

            const studentByClass = students.filter(s => s.className === standard)
            return studentByClass
        }
    }),
        { name: 'users-sotre' })
)
