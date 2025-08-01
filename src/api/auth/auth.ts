import { apiClient } from '@services/api/apiClient';
import { ApiError } from '@custom-types/ApiError';
import { apiClientNoAuth } from '@services/api/apiClientNoAuth';

interface AuthService {
  authToken(token: string): Promise<ApiError | void>;
}

class AuthServiceImpl implements AuthService {
  async authToken(token: string): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/token', {
      token,
    });

    if (response instanceof ApiError) return response;
  }
  async verifySubdomain(): Promise<boolean> {
    const response = await apiClient.get('/auth/verify-domain');
    return !(response instanceof ApiError);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async isActiveUser(token: string): Promise<ApiError | any> {
    const response = await apiClientNoAuth.get('/auth/verify-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
}

export const authService = new AuthServiceImpl();