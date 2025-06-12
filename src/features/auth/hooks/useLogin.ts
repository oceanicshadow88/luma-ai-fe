import { useState } from 'react';
import { loginService } from '@api/auth/login';
import { LoginFormData, UserType } from '@features/auth/types'; 
import { ApiError } from '@custom-types/ApiError';

export function useLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    
    const login = async (data: LoginFormData, userType: UserType = UserType.LEARNER): Promise<void> => {
        setIsLoggingIn(true);
        try {
            await loginService.login(data, userType);
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
        return login(data, UserType.LEARNER);
    };
    
    const loginAsEnterprise = async (data: LoginFormData): Promise<void> => {
        return login(data, UserType.ENTERPRISE);
    };
    
    return {
        login,
        loginAsLearner,
        loginAsEnterprise,
        isLoggingIn
    };
}