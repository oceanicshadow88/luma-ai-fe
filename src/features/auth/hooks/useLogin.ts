import { useState } from 'react';
import { loginService } from '@api/auth/login';
import { LoginFormData } from '../types';
import { ApiError } from '@custom-types/ApiError';

export function useLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const login = async (data: LoginFormData, loginType: 'learner' | 'enterprise' = 'learner'): Promise<void> => {
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
        return login(data, 'learner');
    };

    const loginAsEnterprise = async (data: LoginFormData): Promise<void> => {
        return login(data, 'enterprise');
    };

    return { 
        login, 
        loginAsLearner, 
        loginAsEnterprise, 
        isLoggingIn 
    };
}
