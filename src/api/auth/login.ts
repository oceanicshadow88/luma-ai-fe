import { apiClient } from "@services/api/apiClient";
import { LoginFormData } from "@features/auth/types";
import { ApiError } from "@custom-types/ApiError";

interface LoginResult {
  refreshToken?: string;
  accessToken?: string;
  membership?: {
    company: string; 
    role: string;
  }[];
}

interface LoginService {
  login(data: LoginFormData, type?: 'learner' | 'enterprise'): Promise<LoginResult>;
  loginAsLearner(data: LoginFormData): Promise<LoginResult>;
  loginAsEnterprise(data: LoginFormData): Promise<LoginResult>;
}

class LoginServiceImpl implements LoginService {
  async login(data: LoginFormData, type: 'learner' | 'enterprise' = 'learner'): Promise<LoginResult> {
    const endpoint = `/auth/login/${type}`;
    const response = await apiClient.post(endpoint, data);

    if (!response.data.success) {
      const { message } = response.data;
      throw new ApiError(message);
    }

    return response.data.data;
  }

  async loginAsLearner(data: LoginFormData): Promise<LoginResult> {
    return this.login(data, 'learner');
  }

  async loginAsEnterprise(data: LoginFormData): Promise<LoginResult> {
    return this.login(data, 'enterprise');
  }
}

export const loginService = new LoginServiceImpl();