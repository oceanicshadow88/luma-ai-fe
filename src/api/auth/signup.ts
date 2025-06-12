import { apiClient } from '@services/api/apiClient';
import { SignupFormData } from '@features/auth/types';

class SignupService {
  async signup(data: SignupFormData): Promise<{ refreshToken: string }> {
    const response = await apiClient.post('/auth/signup/admin', data);
    return response.data.data;
  }

  async sendCode(email: string): Promise<void> {
    await apiClient.post('/auth/request-reset-code', { email });
  }

  async signupRaw(data: SignupFormData) {
    return apiClient.post('/auth/signup/admin', data, {
      validateStatus: () => true,
    });
  }
}

export const signupService = new SignupService();
