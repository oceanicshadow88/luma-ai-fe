import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData, VerificationCodeResponse } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<void | ApiError> {
    const response = await apiClient.post<VerificationCodeResponse>('/auth/request-verification-code', { email });
    if (response instanceof ApiError) {
      return response;
    }
    return;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<void | ApiError> {
    const response = await apiClient.post('/auth/reset-password', {
      email: data.email,
      verifyValue: data.verificationCode,
      newPassword: data.password,
    });
    
    if (response instanceof ApiError) {
      return response;
    }
    return;
  }
}

export const resetPasswordService = new ResetPasswordService();