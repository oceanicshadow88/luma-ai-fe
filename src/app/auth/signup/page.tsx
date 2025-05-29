import React from 'react';
import SignUpForm from '@features/auth/components/SignUpForm';

const SignUpPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center px-4">

            <SignUpForm />
        </div>
    );
};

export default SignUpPage;