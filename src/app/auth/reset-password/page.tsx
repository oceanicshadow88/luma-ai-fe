import React from 'react';
import { Link } from "react-router-dom";
import { ResetPasswordForm } from '@features/auth/components/ResetPasswordForm';

const ResetPasswordFormPage: React.FC = () => {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className="w-full max-w-md space-y-8">

                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reset Password</h1>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <ResetPasswordForm />
                </div>

                <div className="text-center text-sm">
                    <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordFormPage;