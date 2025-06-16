import { useState } from 'react';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { useCountdown } from '@hooks/useCountdown';
import { resetPasswordService } from '@api/auth/resetPassword';
import { ResetPasswordFormData } from '@features/auth/types';
import { RESET_PASSWORD_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { handleApiError } from '@utils/errorHandler';

interface ResetPasswordOptions<TValues extends FieldValues = FieldValues> {
  setError?: UseFormSetError<TValues>;
}

interface ResetPasswordResult {
  success: boolean;
  error?: unknown;
}

export const useResetPassword = () => {
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { countdown, startCountdown } = useCountdown(60);

  const sendVerificationCode = async <TValues extends FieldValues = FieldValues>(
    email: string,
    options?: ResetPasswordOptions<TValues>
  ): Promise<ResetPasswordResult> => {
    setIsCodeSending(true);
    try {
      await resetPasswordService.sendVerificationCode(email);
      startCountdown();
      return { success: true };
    } catch (error) {
      if (options?.setError) {
        handleApiError(error, options.setError, RESET_PASSWORD_ERROR_MESSAGE_MAP);
      }
      return { success: false, error };
    } finally {
      setIsCodeSending(false);
    }
  };

  const resetPassword = async <TValues extends FieldValues = FieldValues>(
    data: ResetPasswordFormData,
    options?: ResetPasswordOptions<TValues>
  ): Promise<ResetPasswordResult> => {
    setIsResetting(true);
    try {
      await resetPasswordService.resetPassword(data);
      return { success: true };
    } catch (error) {
      if (options?.setError) {
        handleApiError(error, options.setError, RESET_PASSWORD_ERROR_MESSAGE_MAP);
      }
      return { success: false, error };
    } finally {
      setIsResetting(false);
    }
  };

  return {
    resetPassword,
    sendVerificationCode,
    isCodeSending,
    isResetting,
    countdown,
  };
};