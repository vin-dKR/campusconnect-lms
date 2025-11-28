'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepNavigationProps {
    currentStep: string;
    totalSteps: number;
    onBack: () => void;
    onNext: () => void;
    onComplete?: () => void;
    isLastStep?: boolean;
    hideBack?: boolean;
}

export function StepNavigation({
    currentStep,
    totalSteps,
    onBack,
    onNext,
    onComplete,
    isLastStep = false,
    hideBack = false,
}: StepNavigationProps) {
    return (
        <div className="flex justify-between mt-8">
            <Button
                onClick={onBack}
                variant="outline"
                className={`border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg ${hideBack ? 'invisible' : ''
                    }`}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>

            {isLastStep ? (
                <Button
                    onClick={onComplete}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : (
                <Button
                    onClick={onNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            )}
        </div>
    );
}
