import { apiClient } from "@services/api/apiClient";
import { ResetPasswordInput, ResetPasswordFormData, UserType } from "@features/auth/types";
import { ApiError } from "@custom-types/ApiError";

interface ResetPasswordService {
  resetPassword(data: ResetPasswordInput, userType?: UserType): Promise<ApiError | void>;
  resetPasswordAsEnterprise(data: ResetPasswordInput): Promise<ApiError | void>;
}

class ResetPasswordServiceImpl implements ResetPasswordService {
  async resetPassword(data: ResetPasswordInput): Promise<ApiError | void> {
    const endpoint = `/auth/reset-password`;
    
    const payload: ResetPasswordFormData = {
      email: data.email,
      verifyValue: data.verificationCode,
      newPassword: data.password,
    };
    
    const response = await apiClient.post(endpoint, payload);
    
    if (response instanceof ApiError) {
      return response;
    }
  }
  
  async resetPasswordAsEnterprise(data: ResetPasswordInput): Promise<ApiError | void> {
    return this.resetPassword(data);
  }
}

export const resetPasswordService = new ResetPasswordServiceImpl();