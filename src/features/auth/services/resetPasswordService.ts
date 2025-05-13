import axios from "axios";
import { ResetPasswordFormData, VerificationCodeResponse } from '@features/auth/type';
import { ApiError } from '@custom-types/ApiError';

class ResetPasswordService {
  private apiUrl = import.meta.env.VITE_API_URL || "http://api.example.com";

  async sendVerificationCode(email: string): Promise<VerificationCodeResponse> {
    try {
      const res = await axios.post<VerificationCodeResponse>(`${this.apiUrl}/v1/auth/request-reset-code`, { email });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        const { message, code, cooldownSeconds } = error.response.data;

        if (error.response.status === 429 && cooldownSeconds !== undefined) {
          throw new ApiError(
            message || "Too many requests. Please try again later.",
            code || "AUTH_RATE_LIMIT",
            { cooldownSeconds }
          );
        }

        throw new ApiError(
          message || "Failed to send verification code",
          code || "unknown_error"
        );
      }

      throw new ApiError("Network error", "network_error");
    }
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/v1/auth/verify-reset-code`, {
        email: data.email,
        code: data.verificationCode,
        newPassword: data.password,
        confirmPassword: data.confirmPassword
      });
    } catch (error: any) {
      if (error.response) {
        const { message, code } = error.response.data;

        throw new ApiError(
          message || "Failed to reset password",
          code || "unknown_error"
        );
      }

      throw new ApiError("Network error", "network_error");
    }
  }
}

export const resetPasswordService = new ResetPasswordService();
