'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, User, BookOpen, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type OnboardingStep = 'welcome' | 'profile' | 'academic' | 'complete';

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        emergencyContact: '',
        grade: '',
        subjects: [] as string[],
    });
    const { user, completeOnboarding, updateUser } = useAuthStore();
    const router = useRouter();

    const steps: { key: OnboardingStep; title: string; description: string }[] = [
        { key: 'welcome', title: 'Welcome', description: 'Get started with your account' },
        { key: 'profile', title: 'Profile', description: 'Tell us about yourself' },
        { key: 'academic', title: 'Academic', description: 'Set up your academic preferences' },
        { key: 'complete', title: 'Complete', description: 'You are all set!' },
    ];

    const availableSubjects = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology',
        'English', 'Computer Science', 'History', 'Geography'
    ];

    const handleNext = () => {
        const stepKeys = steps.map(s => s.key);
        const currentIndex = stepKeys.indexOf(currentStep);
        if (currentIndex < stepKeys.length - 1) {
            setCurrentStep(stepKeys[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const stepKeys = steps.map(s => s.key);
        const currentIndex = stepKeys.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(stepKeys[currentIndex - 1]);
        }
    };

    const handleComplete = () => {
        // Update user with onboarding data
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
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                            Welcome to EduLMS, {user?.name}!
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Let's set up your profile to personalize your learning experience.
                            This will only take a few minutes.
                        </p>
                    </motion.div>
                );

            case 'profile':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                            Personal Information
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Help us get to know you better
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Emergency Contact
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="tel"
                                        value={formData.emergencyContact}
                                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Emergency contact number"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'academic':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-2">
                            Academic Information
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Set up your academic preferences
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Grade/Class
                                </label>
                                <input
                                    type="text"
                                    value={formData.grade}
                                    onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 10A, Grade 11"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Subjects
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableSubjects.map((subject) => (
                                        <button
                                            key={subject}
                                            type="button"
                                            onClick={() => toggleSubject(subject)}
                                            className={`p-3 text-center border rounded-lg transition-all duration-200 ${formData.subjects.includes(subject)
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                                                }`}
                                        >
                                            <BookOpen className="w-4 h-4 mx-auto mb-1" />
                                            <div className="text-sm font-medium">{subject}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );

            case 'complete':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                            Setup Complete!
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your profile has been set up successfully. You're now ready to start your educational journey with EduLMS.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-left">
                            <h4 className="font-medium text-slate-900 dark:text-white mb-2">What's next?</h4>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <li>• Explore your personalized dashboard</li>
                                <li>• Access study materials</li>
                                <li>• Track your academic progress</li>
                                <li>• Connect with teachers and peers</li>
                            </ul>
                        </div>
                    </motion.div>
                );
        }
    };

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
                    <AnimatePresence mode="wait">
                        {renderStepContent()}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <Button
                            onClick={handleBack}
                            variant="outline"
                            className={`border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg ${currentStep === 'welcome' ? 'invisible' : ''
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>

                        {currentStep === 'complete' ? (
                            <Button
                                onClick={handleComplete}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
