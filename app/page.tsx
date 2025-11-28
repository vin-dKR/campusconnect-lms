'use client';

import { useAuthStore } from '@/store/auth-store';
import { Header } from '@/components/layout/header';
import { MinimalHero } from '@/components/landing/minimal-hero';
import { ValueProposition } from '@/components/landing/value-proposition';
import { FeaturesGrid } from '@/components/landing/feature-grid';
import { Footer } from '@/components/layout/footer';
import { AuthModal } from '@/components/landing/auth-modal';
import { CTACard } from '@/components/landing/cta-card';

export default function LandingPage() {
    const { user, loginAsGuest } = useAuthStore();

    console.log("---p---user", user)
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <Header onGuestLogin={loginAsGuest} />
            <MinimalHero onGuestLogin={loginAsGuest} />
            <ValueProposition />
            <FeaturesGrid />
            <CTACard onGuestLogin={loginAsGuest} />
            <Footer />
            <AuthModal />
        </div>
    );
}
