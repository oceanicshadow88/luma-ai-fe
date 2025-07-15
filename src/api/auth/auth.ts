import { apiClient } from '@services/api/apiClient';
import { ApiError } from '@custom-types/ApiError';

interface AuthService {
  authToken(token: string): Promise<ApiError | void>;
}

class AuthServiceImpl implements AuthService {
  async authToken(token: string): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/token', {
      token,
    });

    if (response instanceof ApiError) {
      return response;
    }
    
    return;
  }
}

export const authService = new AuthServiceImpl();