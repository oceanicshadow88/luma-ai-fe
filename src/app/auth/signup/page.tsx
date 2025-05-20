import React from 'react';
import SignUpForm from '@/features/auth/components/SignUpForm';

const SignUpPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center px-4">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Sign up for Luma AI Enterprise Version
            </h1>
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;