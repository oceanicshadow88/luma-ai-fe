import { useState } from 'react';
import { useCountdown } from '@hooks/useCountdown';
import { resetPasswordService } from '@api/auth/resetPassword';
import { ResetPasswordFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

export const useResetPassword = () => {
  const [isCodeSending, setIsCodeSending] = useState(false);
  const { countdown, startCountdown } = useCountdown(60);

  const sendVerificationCode = async (email: string): Promise<void> => {
    setIsCodeSending(true);
    try {
      await resetPasswordService.sendVerificationCode(email);
      startCountdown();
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Error Message:', error.message);
        if (error.meta?.cooldownSeconds) {
          console.warn(`Please wait for ${error.meta.cooldownSeconds} seconds to try again`);
        }
      }
      throw error;
    } finally {
      setIsCodeSending(false);
    }
  };

  const resetPassword = async (data: ResetPasswordFormData): Promise<void> => {
    try {
      await resetPasswordService.resetPassword(data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('Reset password error:', error.message);
      }
      throw error;
    }
  };

  return {
    resetPassword,
    sendVerificationCode,
    isCodeSending,
    countdown,
  };
};
