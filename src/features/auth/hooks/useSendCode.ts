import { useEffect, useState } from 'react';

const COOLDOWN = 60;

const useSendCode = () => {
  const [countdown, setCountdown] = useState(0);
  const [canSend, setCanSend] = useState(true);

  const triggerSendCode = () => {
    if (!canSend) return;
    setCountdown(COOLDOWN);
    setCanSend(false);
  };

  useEffect(() => {
    if (countdown === 0) {
      setCanSend(true);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return { countdown, canSend, triggerSendCode };
};

export default useSendCode;
