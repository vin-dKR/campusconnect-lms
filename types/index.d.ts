export { }
declare global {
    //auth 
    interface AuthRole {
        role: UserRole;
        icon: React.ComponentType<any>;
        title: string;
        description: string;
        color?: string;
    }

    // ---------------------------- app-store -----------------------
    interface StudyMaterial {
        id: string;
        title: string;
        type: 'pdf' | 'doc' | 'video' | 'image';
        subject: string;
        uploadedBy: string;
        uploadDate: string;
        size: string;
        downloadUrl: string;
    }

    interface FeeTransaction {
        id: string;
        description: string;
        amount: number;
        dueDate: string;
        status: 'paid' | 'pending' | 'overdue';
        paymentDate?: string;
        receiptUrl?: string;
    }

    interface AttendanceRecord {
        id: string;
        studentId: string;
        date: string;
        status: 'present' | 'absent' | 'late';
        class: string;
    }

    interface Grade {
        subject: string;
        exam: string;
        marks: number;
        totalMarks: number;
        grade: string;
    }

    interface AppState {
        studyMaterials: StudyMaterial[]
        feeTransactions: FeeTransaction[];
        attendanceRecords: AttendanceRecord[];
        grades: Record<string, Grade[]>;
        users: User[];

        setStudyMaterial: (materials: StudyMaterial[]) => void
        addStudyMaterial: (material: StudyMaterial) => void
        setFeeTransactions: (transactions: FeeTransaction[]) => void
        updateFeeTransaction: (transcationId: string, transactionData: Partial<FeeTransaction>) => void
        setAttendanceRecords: (records: AttendanceRecord[]) => void
        updateAttendenceRecord: (recordId: string, status: AttendanceRecord['status']) => void
        setGrades: (userId: string, grades: Grade[]) => void
        setUsers: (users: User[]) => void
        addUser: (user: User) => void
        updateUser: (userId: string, updateUser: Partial<User>) => void
    }


    // --------------------------------- auth-store --------------------------
    type UserRole = 'student' | 'teacher' | 'admin' | 'superadmin';

    interface User {
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
        completeOnboarding: (onboardingData: {
            phone?: string;
            profile?: {
                grade?: string;
                subjects?: string[];
                address?: string;
                emergencyContact?: string;
            };
        }) => void;
    }

    // -------------------------- uesrs all ---------------------------------
    interface UserDB {
        users: Record<string, User>
        addUserToDb: (user: User) => void
        getAllUsers: () => Record<string, User>
        getAllStudents: () => void
        getAllTeachers: () => void
    }

    // ------------------------ onboarding --------------------------------
    type OnboardingStep = 'welcome' | 'profile' | 'academic' | 'complete';

    interface OnboardingFormData {
        phone: string;
        address: string;
        emergencyContact: string;
        grade: string;
        subjects: string[];
    }

    interface OnboardingStepConfig {
        key: OnboardingStep;
        title: string;
        description: string;
    }
}
