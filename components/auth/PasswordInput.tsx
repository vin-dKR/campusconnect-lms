'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
    showStrength?: boolean;
}

export function PasswordInput({
    id,
    label,
    value,
    onChange,
    placeholder = "Enter your password",
    required = true,
    autoComplete = "current-password",
    showStrength = false,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, color: 'bg-slate-300' };
        if (password.length < 6) return { strength: 33, color: 'bg-red-500' };
        if (password.length < 8) return { strength: 66, color: 'bg-yellow-500' };
        return { strength: 100, color: 'bg-green-500' };
    };

    const strength = getPasswordStrength(value);

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {label} {required && '*'}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={autoComplete}
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors pr-12"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                    ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                    )}
                </button>
            </div>
            {showStrength && value.length > 0 && (
                <div className="mt-2">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                            style={{ width: `${strength.strength}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
