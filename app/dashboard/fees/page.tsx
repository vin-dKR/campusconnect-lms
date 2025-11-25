'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CreditCard, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/dashboard/page-header';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import toast from 'react-hot-toast';

interface FeeTransaction {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    paymentDate?: string;
    receiptUrl?: string;
}

export default function FeesPage() {
    const [transactions, setTransactions] = useState<FeeTransaction[]>([
        {
            id: '1',
            description: 'Tuition Fee - Semester 1',
            amount: 15000,
            dueDate: '2024-02-15',
            status: 'paid',
            paymentDate: '2024-02-10',
            receiptUrl: '#'
        },
        {
            id: '2',
            description: 'Library Fee',
            amount: 2000,
            dueDate: '2024-02-20',
            status: 'pending',
        },
        {
            id: '3',
            description: 'Laboratory Fee',
            amount: 5000,
            dueDate: '2024-01-31',
            status: 'overdue',
        },
        {
            id: '4',
            description: 'Sports Fee',
            amount: 3000,
            dueDate: '2024-03-15',
            status: 'pending',
        },
        {
            id: '5',
            description: 'Transportation Fee',
            amount: 8000,
            dueDate: '2024-02-28',
            status: 'paid',
            paymentDate: '2024-02-25',
            receiptUrl: '#'
        },
    ]);

    const handleGenerateReceipt = async (transactionId: string) => {
        const transaction = transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        // Simulate receipt generation
        toast.loading('Generating receipt...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.dismiss();
        toast.success(`Receipt generated for ${transaction.description}`);

        // In real app, this would download the PDF
        console.log('Downloading receipt for:', transaction.description);
    };

    const getStatusBadge = (status: FeeTransaction['status']) => {
        switch (status) {
            case 'paid':
                return <Badge variant="success" className="flex items-center space-x-1"><CheckCircle className="w-3 h-3" /><span>Paid</span></Badge>;
            case 'pending':
                return <Badge variant="warning" className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Pending</span></Badge>;
            case 'overdue':
                return <Badge variant="error" className="flex items-center space-x-1"><XCircle className="w-3 h-3" /><span>Overdue</span></Badge>;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const totalPaid = transactions
        .filter(t => t.status === 'paid')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalPending = transactions
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalOverdue = transactions
        .filter(t => t.status === 'overdue')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalFees = totalPaid + totalPending + totalOverdue;

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <PageHeader
                title="Fees Management"
                description="View and manage your fee payments and receipts"
                action={
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Fees
                    </Button>
                }
            />

            {/* Fee Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-slate-900 dark:text-white">
                                    {formatCurrency(totalFees)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Total Fees</div>
                            </div>
                            <CreditCard className="w-8 h-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-green-600 dark:text-green-400">
                                    {formatCurrency(totalPaid)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Paid</div>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-yellow-600 dark:text-yellow-400">
                                    {formatCurrency(totalPending)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Pending</div>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-light text-red-600 dark:text-red-400">
                                    {formatCurrency(totalOverdue)}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Overdue</div>
                            </div>
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Fee Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            Fee Transactions
                        </h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Payment Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <motion.tr
                                        key={transaction.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <TableCell className="font-medium text-slate-900 dark:text-white">
                                            {transaction.description}
                                        </TableCell>
                                        <TableCell className="text-slate-900 dark:text-white">
                                            {formatCurrency(transaction.amount)}
                                        </TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(transaction.dueDate)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(transaction.status)}
                                        </TableCell>
                                        <TableCell className="text-slate-600 dark:text-slate-400">
                                            {transaction.paymentDate ? formatDate(transaction.paymentDate) : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {transaction.status === 'paid' && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleGenerateReceipt(transaction.id)}
                                                        className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                                                    >
                                                        <Download className="w-4 h-4 mr-1" />
                                                        Receipt
                                                    </Button>
                                                )}
                                                {transaction.status === 'pending' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                                    >
                                                        <CreditCard className="w-4 h-4 mr-1" />
                                                        Pay Now
                                                    </Button>
                                                )}
                                                {transaction.status === 'overdue' && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                                                    >
                                                        <CreditCard className="w-4 h-4 mr-1" />
                                                        Pay Now
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Payment History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Recent Payments */}
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            Recent Payments
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions
                                .filter(t => t.status === 'paid')
                                .slice(0, 3)
                                .map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {transaction.description}
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                Paid on {transaction.paymentDate && formatDate(transaction.paymentDate)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-green-600 dark:text-green-400">
                                                {formatCurrency(transaction.amount)}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleGenerateReceipt(transaction.id)}
                                                className="text-slate-600 dark:text-slate-400"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Payments */}
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-slate-900 dark:text-white">
                            Upcoming Payments
                        </h2>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions
                                .filter(t => t.status === 'pending')
                                .slice(0, 3)
                                .map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {transaction.description}
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                Due {formatDate(transaction.dueDate)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {formatCurrency(transaction.amount)}
                                            </div>
                                            <Badge variant="warning">Due Soon</Badge>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
