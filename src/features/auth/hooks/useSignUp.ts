import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

export function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (data: SignupFormData): Promise<void> => {
    setIsSigningUp(true);

    try {
      await signupService.signup(data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

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