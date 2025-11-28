import { create } from "zustand";
import {
    initialFeeTransactions,
    initialStudyMaterials
} from "@/constants/mock-data/app-store";


export const userAppStore = create<AppState>((set) => ({
    studyMaterials: initialStudyMaterials,
    feeTransactions: initialFeeTransactions,
    attendanceRecords: [],
    grades: {},
    users: [],

    setStudyMaterial: (materials) => set({ studyMaterials: materials }),
    addStudyMaterial: (material) => set((state) => ({
        studyMaterials: [...state.studyMaterials, material]
    })),
    setFeeTransactions: (feeTransactions) => set({ feeTransactions: feeTransactions }),
    updateFeeTransaction: (transactionId, transactionData) => set((state) => ({
        feeTransactions: state.feeTransactions.map((item) =>
            item.id === transactionId ? { ...item, transactionData } : item
        )
    })),
    setAttendanceRecords: (records) => set({ attendanceRecords: records }),
    updateAttendenceRecord: (recordId, status) => set((state) => ({
        attendanceRecords: state.attendanceRecords.map((item) =>
            item.id === recordId ? { ...item, status } : item
        )
    })),
    setGrades: (userId, grades) => set((state) => ({
        grades: { ...state.grades, [userId]: grades }
    })),
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({
        users: [...state.users, user]
    })),
    updateUser: (userId, updateUser) => set((state) => ({
        users: state.users.map((user) => user.id === userId ? { ...user, updateUser } : user)
    }))
}))
