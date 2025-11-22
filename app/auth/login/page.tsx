'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (!error) {
      setShowOtpInput(true);
    }
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push('/');
    } else if (error.message.includes('Email not confirmed')) {
      setShowOtpInput(true);
    }
  };

  const handleVerifyOtp = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (!error) {
      router.push('/');
    }
  };

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <div className='px-6 py-4'>
          <h2 className='text-3xl font-bold text-center text-gray-700 dark:text-white'>Campus Connect</h2>
          <p className='mt-1 text-center text-gray-500 dark:text-gray-400'>
            {showOtpInput ? 'Verify your email' : 'Login or create account'}
          </p>
          <div className='mt-4'>
            {!showOtpInput ? (
              <>
                <div className='w-full mt-4'>
                  <input
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                    type='email'
                    placeholder='Email Address'
                    aria-label='Email Address'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className='w-full mt-4'>
                  <input
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                    type='password'
                    placeholder='Password'
                    aria-label='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className='flex items-center justify-between mt-4'>
                  <button
                    className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='w-full mt-4'>
                  <input
                    className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                    type='text'
                    placeholder='Enter OTP'
                    aria-label='Enter OTP'
                    onChange={(e) => setToken(e.target.value)}
                    value={token}
                  />
                </div>
                <div className='flex items-center justify-center mt-4'>
                  <button
                    className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
