'use client';

import { updateUserRole } from '@/actions/onboarding';
import { useUser } from '@/hooks/auth/useUser';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import {  useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:bg-gray-400'
    >
      {pending ? 'Submitting...' : 'Continue'}
    </button>
  );
}

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [role, setRole] = useState('student');

  const initialState = { error: null };
  const [state, formAction] = useActionState(updateUserRole, initialState);

  useEffect(() => {
    if (user && user.user_metadata.role) {
      if (user.user_metadata.role === 'teacher') {
        router.push('/teacher/attendance');
      } else {
        router.push('/student/materials');
      }
    }
  }, [user, router]);

  if (user && user.user_metadata.role) {
    return null;
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='px-6 py-4'>
          <h2 className='text-3xl font-bold text-center text-gray-700 dark:text-white'>
            Welcome to Campus Connect
          </h2>
          <p className='mt-1 text-center text-gray-500 dark:text-gray-400'>Please select your role</p>
          <form action={formAction} className='mt-6'>
            <div className='flex justify-around'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='role'
                  value='student'
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className='form-radio h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700 dark:text-gray-200'>Student</span>
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='role'
                  value='teacher'
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  className='form-radio h-5 w-5 text-blue-600'
                />
                <span className='ml-2 text-gray-700 dark:text-gray-200'>Teacher</span>
              </label>
            </div>

            {state.error && (
              <p className='mt-4 text-center text-red-500'>{state.error}</p>
            )}

            <div className='flex justify-center mt-6'>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
