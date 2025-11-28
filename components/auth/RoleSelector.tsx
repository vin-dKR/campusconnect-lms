'use client';

interface RoleSelectorProps {
    roles: AuthRole[];
    selectedRole: UserRole;
    onRoleChange: (role: UserRole) => void;
    label: string;
    layout?: 'grid' | 'cards';
}

export function RoleSelector({
    roles,
    selectedRole,
    onRoleChange,
    label,
    layout = 'grid',
}: RoleSelectorProps) {
    if (layout === 'cards') {
        return (
            <div className="grid grid-cols-2 gap-4">
                {roles.map((role) => (
                    <button
                        key={role.role}
                        type="button"
                        onClick={() => onRoleChange(role.role)}
                        className="p-4 text-left border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:scale-105 group"
                    >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                            <role.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                            {role.title}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            {role.description}
                        </div>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {label}
            </label>
            <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => (
                    <button
                        key={role.role}
                        type="button"
                        onClick={() => onRoleChange(role.role)}
                        className={`p-3 text-center border rounded-lg transition-all duration-200 ${selectedRole === role.role
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                            }`}
                    >
                        <role.icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs font-medium">{role.title}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}
