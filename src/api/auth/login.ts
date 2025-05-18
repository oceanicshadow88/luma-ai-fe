import { apiClient } from "@services/api/apiClient";
import { LoginFormData } from "@features/auth/type";

interface SuccessResponse {
  success: true;
  data: {
    refreshToken: string;
  };
}

class LoginService {
  async login(data: LoginFormData): Promise<{ refreshToken: string }> {
    const response = await apiClient.post<SuccessResponse>('/auth/login', {
      email: data.email,
      password: data.password,
    });
    
    return response.data.data;
  }
}

export const loginService = new LoginService();