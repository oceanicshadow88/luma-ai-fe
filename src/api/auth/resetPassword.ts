import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData, VerificationCodeResponse } from '@features/auth/type';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<VerificationCodeResponse> {
    const response = await apiClient.post<VerificationCodeResponse>('/auth/request-reset-code', { email });
    return response.data;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    await apiClient.post('/auth/verify-reset-code', {
      email: data.email,
      code: data.verificationCode,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    });
  }
}

export const resetPasswordService = new ResetPasswordService();
