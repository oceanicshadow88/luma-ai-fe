import { useState } from 'react';
import { loginService } from '@api/auth/login';
import { LoginFormData, UserType } from '@features/auth/types';
import { handleApiError } from '@utils/errorHandler';
import { LOGIN_ERROR_MESSAGE_MAP} from '@custom-types/ApiError';
import { UseFormSetError, FieldValues } from 'react-hook-form';

interface LoginOptions<TValues extends FieldValues = FieldValues> {
  setError?: UseFormSetError<TValues>;
  useToast?: boolean;
}

interface LoginResult {
  success: boolean;
  error?: unknown;
}

export function useLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const login = async <TValues extends FieldValues = FieldValues>(
    data: LoginFormData, 
    userType: UserType = UserType.LEARNER,
    options?: LoginOptions<TValues>
  ): Promise<LoginResult> => {
    setIsLoggingIn(true);
    
    try {
      await loginService.login(data, userType);
      return { success: true };
    } catch (error) {
      if (options?.setError) {
        handleApiError(
          error,
          options.setError,
          LOGIN_ERROR_MESSAGE_MAP,
        );
      } 
      return { success: false, error };
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const loginAsLearner = async <TValues extends FieldValues = FieldValues>(
    data: LoginFormData,
    options?: LoginOptions<TValues>
  ): Promise<LoginResult> => {
    return login(data, UserType.LEARNER, options);
  };
  
  const loginAsEnterprise = async <TValues extends FieldValues = FieldValues>(
    data: LoginFormData,
    options?: LoginOptions<TValues>
  ): Promise<LoginResult> => {
    return login(data, UserType.ENTERPRISE, options);
  };
  
  return {
    login,
    loginAsLearner,
    loginAsEnterprise,
    isLoggingIn
  };
}