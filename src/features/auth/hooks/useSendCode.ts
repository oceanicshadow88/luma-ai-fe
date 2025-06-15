import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { handleApiError } from '@utils/errorHandler';
import { SIGNUP_ERROR_MESSAGE_MAP } from '@custom-types/ApiError';
import { UseFormSetError, FieldValues } from 'react-hook-form';

interface SendCodeOptions<TValues extends FieldValues = FieldValues> {
  setError?: UseFormSetError<TValues>;
  useToast?: boolean;
}

interface SendCodeResult {
  success: boolean;
  error?: unknown;
}

export function useSendCode() {
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canSend, setCanSend] = useState(true);

  const sendCode = async <TValues extends FieldValues = FieldValues>(
    email: string,
    options?: SendCodeOptions<TValues>
  ): Promise<SendCodeResult> => {
    if (!canSend) return { success: false };

    setIsSendingCode(true);

    try {
      await signupService.sendCode(email);
      
      setCanSend(false);
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return { success: true };
    } catch (error) {
      if (options?.setError) {
        handleApiError(
          error,
          options.setError,
          SIGNUP_ERROR_MESSAGE_MAP
        );
      }
      return { success: false, error };
    } finally {
      setIsSendingCode(false);
    }
  };

  return {
    sendCode,
    countdown,
    canSend,
    isSendingCode,
  };
}