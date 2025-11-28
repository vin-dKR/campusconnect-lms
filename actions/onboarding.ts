'use server';

import { createClient } from "@supabase/supabase-js";
import { redirect } from 'next/navigation';

// Define the shape of the form state
type FormState = {
    error: string | null;
};

export async function updateUserRole(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const role = formData.get('role');

    if (!role || (role !== 'student' && role !== 'teacher')) {
        return { error: 'Please select a valid role.' };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/auth/login');
    }

    const { error } = await supabase.auth.updateUser({
        data: { role: role as string },
    });

    if (error) {
        console.error('Failed to update role:', error);
        return { error: 'We could not update your role. Please try again.' };
    }

    // On success, redirect to the appropriate dashboard.
    // This will be caught by Next.js and the browser will navigate,
    // so we don't need to return a state.
    if (role === 'teacher') {
        redirect('/teacher/attendance');
    } else {
        redirect('/student/materials');
    }
}
