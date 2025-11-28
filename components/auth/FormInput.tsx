'use client';

interface FormInputProps {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
}

export function FormInput({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required = true,
    autoComplete,
}: FormInputProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {label} {required && '*'}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors"
                placeholder={placeholder}
            />
        </div>
    );
}
