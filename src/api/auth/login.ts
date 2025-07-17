import { apiClient } from "@services/api/apiClient";
import { LoginFormData, UserType } from "@features/auth/types";
import { ApiError } from "@custom-types/ApiError";

interface LoginResult {
  refreshToken?: string;
  accessToken?: string;
  companySlug?: string;
  role?: string;
}

interface LoginService {
  login(data: LoginFormData, userType?: UserType): Promise<ApiError | void>;
  loginAsLearner(data: LoginFormData): Promise<ApiError | void>;
  loginAsEnterprise(data: LoginFormData): Promise<ApiError | void>;
}

class LoginServiceImpl implements LoginService {
  async login(data: LoginFormData, userType: UserType = UserType.LEARNER): Promise<ApiError | void> {
    const endpoint = `/auth/login/${userType}`;
    const response = await apiClient.post(endpoint, data);

    if (response instanceof ApiError) {
      return response;
    }

    const result: LoginResult = response.data.data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }
  }

  async loginAsLearner(data: LoginFormData): Promise<ApiError | void> {
    return this.login(data, UserType.LEARNER);
  }

  async loginAsEnterprise(data: LoginFormData): Promise<ApiError | void> {
    return this.login(data, UserType.ENTERPRISE);
  }
}

export const loginService = new LoginServiceImpl();