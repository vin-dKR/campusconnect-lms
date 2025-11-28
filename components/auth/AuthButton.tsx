'use client';

import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface AuthButtonProps {
    isLoading: boolean;
    label: string;
    loadingLabel: string;
    icon: LucideIcon;
    disabled?: boolean;
}

export function AuthButton({
    isLoading,
    label,
    loadingLabel,
    icon: Icon,
    disabled = false,
}: AuthButtonProps) {
    return (
        <Button
            type="submit"
            disabled={isLoading || disabled}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 rounded-lg font-medium transition-all duration-200"
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin mr-2" />
                    {loadingLabel}
                </div>
            ) : (
                <>
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                </>
            )}
        </Button>
    );
}
