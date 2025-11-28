'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ONBOARDING_STEPS } from '@/constants/onboarding/onboarding-data';
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { ProfileStep } from '@/components/onboarding/steps/ProfileStep';
import { AcademicStep } from '@/components/onboarding/steps/AcademicStep';
import { CompleteStep } from '@/components/onboarding/steps/CompleteStep';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { StepNavigation } from '@/components/onboarding/StepNavigation';

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
    const [formData, setFormData] = useState<OnboardingFormData>({
        phone: '',
        address: '',
        emergencyContact: '',
        grade: '',
        subjects: [],
    });

    const { user, completeOnboarding } = useAuthStore();
    const router = useRouter();

    const handleNext = () => {
        const currentIndex = ONBOARDING_STEPS.findIndex(step => step.key === currentStep);
        if (currentIndex < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(ONBOARDING_STEPS[currentIndex + 1].key);
        }
    };

    const handleBack = () => {
        const currentIndex = ONBOARDING_STEPS.findIndex(step => step.key === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(ONBOARDING_STEPS[currentIndex - 1].key);
        }
    };

    const handleComplete = () => {
        try {
            completeOnboarding({
                phone: formData.phone,
                profile: {
                    grade: formData.grade,
                    subjects: formData.subjects,
                    address: formData.address,
                    emergencyContact: formData.emergencyContact,
                }
            });

            toast.success('Profile setup completed!');
            router.push('/dashboard');
        } catch (error) {
            toast.error('Failed to complete onboarding. Please try again.');
        }
    };

    const handleFormDataChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleSubject = (subject: string) => {
        setFormData(prev => ({
            ...prev,
            subjects: prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject]
        }));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 'welcome':
                return <WelcomeStep userName={user?.name} />;

            case 'profile':
                return (
                    <ProfileStep
                        formData={formData}
                        onFormDataChange={handleFormDataChange}
                    />
                );

            case 'academic':
                return (
                    <AcademicStep
                        formData={formData}
                        onFormDataChange={handleFormDataChange}
                        onToggleSubject={toggleSubject}
                    />
                );

            case 'complete':
                return <CompleteStep />;

            default:
                return null;
        }
    };

    const isLastStep = currentStep === 'complete';
    const hideBack = currentStep === 'welcome';

    return (
        <OnboardingLayout currentStep={currentStep} steps={ONBOARDING_STEPS}>
            <AnimatePresence mode="wait">
                {renderStepContent()}
            </AnimatePresence>

            <StepNavigation
                currentStep={currentStep}
                totalSteps={ONBOARDING_STEPS.length}
                onBack={handleBack}
                onNext={handleNext}
                onComplete={handleComplete}
                isLastStep={isLastStep}
                hideBack={hideBack}
            />
        </OnboardingLayout>
    );
}
