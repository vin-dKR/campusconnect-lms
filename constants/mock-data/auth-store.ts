export const mockUsers: Record<UserRole, User> = {
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
