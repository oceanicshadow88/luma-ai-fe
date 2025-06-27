import { apiClient } from "@services/api/apiClient"; 
import { LoginFormData, UserType } from "@features/auth/types"; 
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
  login(data: LoginFormData, userType?: UserType): Promise<LoginResult>;
  loginAsLearner(data: LoginFormData): Promise<LoginResult>;
  loginAsEnterprise(data: LoginFormData): Promise<LoginResult>;
}

class LoginServiceImpl implements LoginService {
  async login(data: LoginFormData, userType: UserType = UserType.LEARNER): Promise<LoginResult> {
    const endpoint = `/auth/login/${userType}`;
    const response = await apiClient.post(endpoint, data);
    
    if (!response.data.success) {
      const { message } = response.data;
      throw new ApiError(message);
    }
    
    const result: LoginResult = response.data.data;
    
    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }
    
    return result;
  }
  
  async loginAsLearner(data: LoginFormData): Promise<LoginResult> {
    return this.login(data, UserType.LEARNER);
  }
  
  async loginAsEnterprise(data: LoginFormData): Promise<LoginResult> {
    return this.login(data, UserType.ENTERPRISE);
  }
}

export const loginService = new LoginServiceImpl();