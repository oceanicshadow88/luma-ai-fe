import { useState } from 'react';
import { loginService } from '@api/auth/login';
import { LoginFormData } from '../types';
import { ApiError } from '@custom-types/ApiError';

export function useLogin() {
    const [isLoggingIn, setIsLogginIn] = useState(false);

    const login = async (data: LoginFormData): Promise<void> => {
        setIsLogginIn(true);
        try{
            await loginService.login(data);
        } catch (error) {
            if (error instanceof ApiError) {
                console.error('Login error:', error.message);
            }
            throw error;
        } finally {
            setIsLogginIn(false);
        }
    };
    return{ login, isLoggingIn };
}
