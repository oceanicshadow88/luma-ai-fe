import { useState } from 'react';
import { loginService } from '@api/auth/login';
import { LoginFormData, UserType } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
import { toast } from 'react-hot-toast';
interface LoginResult {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    field?: string;
  };
}

export function useLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async (
    data: LoginFormData,
    userType: UserType = UserType.LEARNER,
  ): Promise<LoginResult> => {
    setIsLoggingIn(true);
    
    try {
      const result = await loginService.login(data, userType);
      setIsLoggingIn(false);
      
      return { 
        success: true, 
        data: result 
      };
    } catch (error) {
      setIsLoggingIn(false);
      
      const apiError = error as ApiError;
      
      if (!apiError.meta?.field) {
        toast.error(apiError.message);
        return { 
          success: false 
        };
      }
      
      return {
        success: false,
        error: {
          message: apiError.message,
          field: apiError.meta.field
        }
      };
    }
  };

  const loginAsLearner = async (data: LoginFormData): Promise<LoginResult> => {
    return login(data, UserType.LEARNER);
  };

  const loginAsEnterprise = async (data: LoginFormData): Promise<LoginResult> => {
    return login(data, UserType.ENTERPRISE);
  };

  return {
    login,
    loginAsLearner,
    loginAsEnterprise,
    isLoggingIn
  };
}