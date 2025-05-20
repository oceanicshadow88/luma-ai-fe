import { apiClient } from '@services/api/apiClient';
import { SignupFormData } from '@features/auth/types';

class SignupService {
  async signup(data: SignupFormData): Promise<{ orgNotFound?: boolean }> {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  }

  async sendCode(email: string): Promise<void> {
    await apiClient.post('/auth/send-code', { email });
  }
}

export const signupService = new SignupService();