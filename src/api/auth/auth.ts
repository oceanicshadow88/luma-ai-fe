import { apiClient } from '@services/api/apiClient';

class AuthService {
  async authToken(token: string): Promise<void> {
    await apiClient.post('/auth/token', {
      token,
    });
  }
}

export const authService = new AuthService();
