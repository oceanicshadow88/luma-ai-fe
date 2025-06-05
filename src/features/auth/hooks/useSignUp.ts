import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
import { apiClient } from '@services/api/apiClient';

export function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    setIsSigningUp(true);

    try {
      const response = await signupService.signupRaw(data);
      const status = response.status;
      const resData = response.data;


      if (resData?.message === 'The company does not exist') {
        return { redirect: '/auth/signup/institution' };
      }

      if (resData?.message?.toLowerCase().includes('user already exist')) {
        return { redirect: '/auth/login' };
      }


      if (status >= 400 || status === 302) {
        throw new ApiError(resData?.message || 'Unexpected error occurred');
      }


      const refreshToken = resData?.data?.refreshToken;
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);

        const tokenRes = await apiClient.post('/auth/refresh-token', {
          refreshToken,
        });

        const accessToken = tokenRes.data?.data?.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        } else {
          throw new ApiError('Failed to retrieve access token');
        }
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