import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData, UserRole } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
import { handleApiError } from '@utils/errorHandler';
import { SIGNUP_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { UseFormSetError, FieldValues } from 'react-hook-form';

interface SignupOptions<TValues extends FieldValues = FieldValues> {
  setError?: UseFormSetError<TValues>;
  useToast?: boolean;
}

interface SignupResult {
  success: boolean;
  redirect?: string;
  error?: unknown;
}

export function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const signup = async <TValues extends FieldValues = FieldValues>(
    data: SignupFormData, 
    userRole: UserRole = UserRole.LEARNER,
    options?: SignupOptions<TValues>
  ): Promise<SignupResult> => {
    setIsSigningUp(true);
    
    try {
      const response = await signupService.signupRaw(data, userRole);
      const status = response.status;
      const resData = response.data;
      
      if (status >= 200 && status < 300) {
        if (userRole === UserRole.ADMIN) {
          const { refreshToken, accessToken } = resData;
          
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
          
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }
        } else {
          const refreshToken = resData?.data?.refreshToken;
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
            
            const accessToken = resData?.data?.accessToken;
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
            } else {
              throw new ApiError('Failed to retrieve access token');
            }
          }
        }
        
        return { success: true };
      } else {
        if (resData?.message === 'The company does not exist' && userRole === UserRole.ADMIN) {
          return { success: true, redirect: '/auth/signup/institution' };
        }
        
        throw new ApiError(resData?.message || 'Unexpected error occurred');
      }
      
    } catch (error) {
      if (options?.setError) {
        handleApiError(error, options.setError, SIGNUP_ERROR_MESSAGE_MAP);
      }
      
      return { success: false, error };
    } finally {
      setIsSigningUp(false);
    }
  };
  
  const signupAsLearner = async <TValues extends FieldValues = FieldValues>(
    data: SignupFormData, 
    options?: SignupOptions<TValues>
  ): Promise<SignupResult> => {
    return signup(data, UserRole.LEARNER, options);
  };
  
  const signupAsAdmin = async <TValues extends FieldValues = FieldValues>(
    data: SignupFormData, 
    options?: SignupOptions<TValues>
  ): Promise<SignupResult> => {
    return signup(data, UserRole.ADMIN, options);
  };
  
  const signupAsInstructor = async <TValues extends FieldValues = FieldValues>(
    data: SignupFormData, 
    options?: SignupOptions<TValues>
  ): Promise<SignupResult> => {
    return signup(data, UserRole.INSTRUCTOR, options);
  };
  
  return {
    signup,
    signupAsLearner,
    signupAsAdmin,
    signupAsInstructor,
    isSigningUp,
  };
}