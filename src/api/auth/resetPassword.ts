import { apiClient } from "@services/api/apiClient";
import { ResetPasswordFormData, UserType } from "@features/auth/types";
import { ApiError } from "@custom-types/ApiError";

interface ResetPasswordService {
  resetPassword(data: ResetPasswordFormData, userType?: UserType): Promise<ApiError | void>;
  resetPasswordAsLearner(data: ResetPasswordFormData): Promise<ApiError | void>;
  resetPasswordAsEnterprise(data: ResetPasswordFormData): Promise<ApiError | void>;
}

class ResetPasswordServiceImpl implements ResetPasswordService {
  async resetPassword(data: ResetPasswordFormData, userType: UserType = UserType.LEARNER): Promise<ApiError | void> {
    const endpoint = `/auth/reset-password/${userType}`;
    const response = await apiClient.post(endpoint, data);

    if (response instanceof ApiError) {
      return response;
    }
  }

  async resetPasswordAsLearner(data: ResetPasswordFormData): Promise<ApiError | void> {
    return this.resetPassword(data, UserType.LEARNER);
  }

  async resetPasswordAsEnterprise(data: ResetPasswordFormData): Promise<ApiError | void> {
    return this.resetPassword(data, UserType.ENTERPRISE);
  }
}

export const resetPasswordService = new ResetPasswordServiceImpl();