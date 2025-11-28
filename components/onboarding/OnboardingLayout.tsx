'use client';

import { ReactNode } from 'react';

interface OnboardingLayoutProps {
    children: ReactNode;
    currentStep: OnboardingStep;
    steps: OnboardingStepConfig[];
}

export function OnboardingLayout({ children, currentStep, steps }: OnboardingLayoutProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-6 py-12">
            <div className="max-w-2xl w-full">
                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {steps.map((step, index) => (
                        <div key={step.key} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${steps.findIndex(s => s.key === currentStep) >= index
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                {index + 1}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`w-16 h-0.5 mx-2 ${steps.findIndex(s => s.key === currentStep) > index
                                    ? 'bg-blue-600'
                                    : 'bg-slate-200 dark:bg-slate-800'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
