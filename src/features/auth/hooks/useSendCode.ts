import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { ApiError } from '@custom-types/ApiError';

export function useSendCode() {
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canSend, setCanSend] = useState(true);

  const sendCode = async (email: string): Promise<void | ApiError> => {
    if (!canSend) return new ApiError('Please wait before sending another code', {});

    setIsSendingCode(true);

    const result = await signupService.sendCode(email);

    if (result instanceof ApiError) {
      setIsSendingCode(false);
      return result; 
    }

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

    setIsSendingCode(false);
    return; 
  };

  return {
    sendCode,
    countdown,
    canSend,
    isSendingCode,
  };
}