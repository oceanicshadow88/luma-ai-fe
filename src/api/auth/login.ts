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

class LoginService {
  async login(data: LoginFormData): Promise<LoginResult> {
    const response = await apiClient.post('/auth/login', data);

    if (!response.data.success) {
      const { message } = response.data;
      throw new ApiError(message);
    }

    return response.data.data;
  }
}

export const loginService = new LoginService();