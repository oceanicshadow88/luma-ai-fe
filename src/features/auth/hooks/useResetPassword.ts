import { useState } from "react";
import { useCountdown } from "@hooks/useCountdown";
import { authService } from "@features/auth/services/resetPasswordService";
import { ResetPasswordFormData } from "@features/auth/type";

export const useResetPassword = () => {
    const [isCodeSending, setIsCodeSending] = useState(false);
    const { countdown, startCountdown } = useCountdown(60);

    const sendVerificationCode = async (email: string) => {
        setIsCodeSending(true);
        try {
            await authService.sendVerificationCode(email);
            startCountdown();
        } catch (error) {
            throw error;
        } finally {
            setIsCodeSending(false);
        }
    };

    const resetPassword = async (data: ResetPasswordFormData) => {
        try {
            await authService.resetPassword(data);
        } catch (error) {
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