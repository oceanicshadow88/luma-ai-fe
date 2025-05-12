import axios from "axios";
import { ResetPasswordFormData } from '@features/auth/type';
import { ApiError } from '@custom-types/ApiError'

class AuthService {
  private apiUrl = import.meta.env.VITE_API_URL || "http://api.example.com";

  async sendVerificationCode(email: string): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/auth/send-verification-code`, { email });
    } catch (error: any) {
      if (error.response) {
        throw new ApiError(
          error.response.data.message || "Failed to send verification code",
          error.response.data.code || "unknown_error"
        );
      }
      throw new ApiError("Network error", "network_error");
    }
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/auth/reset-password`, {
        email: data.email,
        verificationCode: data.verificationCode,
        password: data.password,
      });
    } catch (error: any) {
      if (error.response) {
        throw new ApiError(
          error.response.data.message || "Failed to reset password",
          error.response.data.code || "unknown_error"
        );
      }
      throw new ApiError("Network error", "network_error");
    }
  }
}

export const authService = new AuthService();