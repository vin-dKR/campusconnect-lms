const initialStudyMaterials: StudyMaterial[] = [
    {
        id: '1',
        title: 'Mathematics Chapter 1 Notes',
        type: 'pdf',
        subject: 'Mathematics',
        uploadedBy: 'Dr. Smith',
        uploadDate: '2024-01-15',
        size: '2.4 MB',
        downloadUrl: '#'
    }
]

const initialFeeTransactions: FeeTransaction[] = [
    {
        id: '1',
        description: 'Tuition Fee - Semester 1',
        amount: 15000,
        dueDate: '2024-02-15',
        status: 'paid',
        paymentDate: '2024-02-10',
        receiptUrl: '#'
    },
];

export {
    initialFeeTransactions,
    initialStudyMaterials,
}
