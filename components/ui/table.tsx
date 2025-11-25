import { cn } from '@/lib/utils';

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("overflow-x-auto", className)}>
            <table className="w-full">
                {children}
            </table>
        </div>
    );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
    return (
        <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
                {children}
            </tr>
        </thead>
    );
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return (
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {children}
        </tbody>
    );
}

export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <tr className={cn("hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", className)}>
            {children}
        </tr>
    );
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <td className={cn("p-4 text-sm", className)}>
            {children}
        </td>
    );
}

export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <th className={cn("text-left p-4 text-sm font-medium text-slate-600 dark:text-slate-400", className)}>
            {children}
        </th>
    );
}
