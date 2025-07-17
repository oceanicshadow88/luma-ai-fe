import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/request-verification-code', { email });
    if (response instanceof ApiError) return response;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/reset-password', {
      email: data.email,
      verifyValue: data.verificationCode,
      newPassword: data.password,
    });

    if (response instanceof ApiError) return response;
  }
}

export const resetPasswordService = new ResetPasswordService();