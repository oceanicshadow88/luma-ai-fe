import { apiClient } from "@services/api/apiClient";
import { LoginFormData, UserType } from "@features/auth/types";
import { ApiError } from "@custom-types/ApiError";
import { AxiosResponse } from "axios";

interface LoginResult {
  refreshToken?: string;
  accessToken?: string;
  companySlug?: string;
  role?: string;
}

interface LoginService {
  login(data: LoginFormData, userType?: UserType): Promise<LoginResult | ApiError>; 
  loginAsLearner(data: LoginFormData): Promise<LoginResult | ApiError>;
  loginAsEnterprise(data: LoginFormData): Promise<LoginResult | ApiError>;
}

class LoginServiceImpl implements LoginService {
  async login(data: LoginFormData, userType: UserType = UserType.LEARNER): Promise<LoginResult | ApiError> {
    const endpoint = `/auth/login/${userType}`;
    const response = await apiClient.post(endpoint, data);

    if (response instanceof ApiError) {
      return response; 
    }

    const result: LoginResult = (response as AxiosResponse).data.data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result;
  }

  async loginAsLearner(data: LoginFormData): Promise<LoginResult | ApiError> {
    return this.login(data, UserType.LEARNER);
  }

  async loginAsEnterprise(data: LoginFormData): Promise<LoginResult | ApiError> {
    return this.login(data, UserType.ENTERPRISE);
  }
}

export const loginService = new LoginServiceImpl();