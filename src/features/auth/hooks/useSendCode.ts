import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { ApiError } from '@custom-types/ApiError';

export function useSendCode() {
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canSend, setCanSend] = useState(true);

  const sendCode = async (email: string): Promise<void> => {
    if (!canSend) return;

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
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to send verification code');
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