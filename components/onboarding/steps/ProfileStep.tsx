'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

interface ProfileStepProps {
    formData: {
        phone: string;
        address: string;
        emergencyContact: string;
    };
    onFormDataChange: (field: string, value: string) => void;
}

export function ProfileStep({ formData, onFormDataChange }: ProfileStepProps) {
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
                            onChange={(e) => onFormDataChange('phone', e.target.value)}
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
                            onChange={(e) => onFormDataChange('address', e.target.value)}
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
                            onChange={(e) => onFormDataChange('emergencyContact', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Emergency contact number"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
