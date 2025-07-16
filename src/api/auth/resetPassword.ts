import { apiClient } from '@services/api/apiClient';
import { ResetPasswordFormData, VerificationCodeResponse, ResetPasswordResponse } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

class ResetPasswordService {
  async sendVerificationCode(email: string): Promise<VerificationCodeResponse | ApiError> {
    const response = await apiClient.post<VerificationCodeResponse>('/auth/request-verification-code', { email });
    return response.data ??  ApiError;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<ResetPasswordResponse | ApiError> {
    const response = await apiClient.post('/auth/reset-password', {
      email: data.email,
      verifyValue: data.verificationCode,
      newPassword: data.password,
    });
    
    return response.data ??  ApiError;
  }
}

export const resetPasswordService = new ResetPasswordService();