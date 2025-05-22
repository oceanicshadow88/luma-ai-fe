import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

export function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    setIsSigningUp(true);

    try {
      const response = await signupService.signupRaw(data);
      const status = response.status;
      const resData = response.data;

      if (status === 302 && resData?.redirect) {
        return { redirect: resData.redirect }; 
      }

      if (status >= 400) {
        throw new ApiError(resData?.message || 'Unexpected error occurred');
      }

      
      if (resData?.data?.refreshToken) {
        localStorage.setItem('accessToken', resData.data.refreshToken);
      }

      return {}; 
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unexpected error occurred');
    } finally {
      setIsSigningUp(false);
    }
    
  };

  return {
    signup,
    isSigningUp,
  };
}