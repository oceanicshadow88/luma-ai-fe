import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData, VerificationCodeResponse } from '@features/auth/types';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<VerificationCodeResponse> {
    const response = await apiClient.post<VerificationCodeResponse>('/auth/request-verification-code', { email });
    return response.data;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void> {
    await apiClient.post('/auth/reset-password', {
      email: data.email,
      code: data.verificationCode,
      newPassword: data.password,
    });
  }
}

export const resetPasswordService = new ResetPasswordService();
