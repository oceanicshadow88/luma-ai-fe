import { apiClient } from "@services/api/apiClient";
import { ResetPasswordFormData, VerificationCodeResponse } from "@features/auth/type";
import { ApiError } from "@custom-types/ApiError";

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<VerificationCodeResponse> {
    try {
      const res = await apiClient.post<VerificationCodeResponse>("/auth/request-reset-code", { email }); // Use api client to remove the hard code path
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
          code || "UNKNOWN_ERROR"
        );
      }

      throw new ApiError("Network error", "NETWORK_ERROR");
    }
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    try {
      await apiClient.post("/auth/verify-reset-code", {
        email: data.email,
        code: data.verificationCode,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (error: any) {
      if (error.response) {
        const { message, code } = error.response.data;
        throw new ApiError(
          message || "Failed to reset password",
          code || "UNKNOWN_ERROR"
        );
      }

      throw new ApiError("Network error", "NETWORK_ERROR");
    }
  }
}

export const resetPasswordService = new ResetPasswordService();
