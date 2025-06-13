import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
import { apiClient } from '@services/api/apiClient';

export function useAdminSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const adminSignup = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    setIsSigningUp(true);

    try {
      const response = await signupService.adminSignupRaw(data);
      const status = response.status;
      const resData = response.data;

      if (status === 302 && resData?.redirect) {
        return { redirect: '/auth/login' };
      }

      if (status >= 400) {
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
    adminSignup,
    isSigningUp,
  };
}
