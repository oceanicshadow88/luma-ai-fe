import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData, ResetPasswordResponse } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<void | ApiError> {
    const response = await apiClient.post('/auth/request-verification-code', { email });
    return response instanceof ApiError ? response : undefined;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<ResetPasswordResponse | ApiError> {
    const response = await apiClient.post('/auth/reset-password', {
      email: data.email,
      verifyValue: data.verificationCode,
      newPassword: data.password,
    });

    return response instanceof ApiError ? response : response.data;
  }
}

export const resetPasswordService = new ResetPasswordService();