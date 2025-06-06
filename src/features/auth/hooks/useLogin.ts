import { useState } from 'react';
import { loginService, LoginType } from '@api/auth/login';
import { LoginFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

export function useLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async (data: LoginFormData, loginType: LoginType = LoginType.LEARNER): Promise<void> => {
        setIsLoggingIn(true);
        try {
            await loginService.login(data, loginType);
        } catch (error) {
            if (error instanceof ApiError) {
                console.error('Login error:', error.message);
            }
            throw error;
        } finally {
            setIsLoggingIn(false);
        }
    };

    const loginAsLearner = async (data: LoginFormData): Promise<void> => {
        return login(data, LoginType.LEARNER);
    };

    const loginAsEnterprise = async (data: LoginFormData): Promise<void> => {
        return login(data, LoginType.ENTERPRISE);
    };

    return {
        login,
        loginAsLearner,
        loginAsEnterprise,
        isLoggingIn
    };
}