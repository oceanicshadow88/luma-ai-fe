import { apiClient } from "@services/api/apiClient";
import { LoginFormData } from "@features/auth/type";
import { ApiError } from "@custom-types/ApiError";
import { AxiosError } from "axios";

interface SuccessResponse {
    success: true;
    data: {
        refreshToken: string;
    };
}

interface FailureResponse {
    success: false;
    error: string;
    payload?: {
        redirectTo?: string;
    }
}

class LoginService {
    async login(data: LoginFormData): Promise<{ refreshToken: string }> {
        try {
            const response = await apiClient.post<SuccessResponse | FailureResponse>('/auth/login', {
                email: data.email,
                password: data.password,
            });

            if (!response.data.success){
                const { error, payload } = response.data as FailureResponse;
                throw new ApiError(error, { redirectTo: payload?.redirectTo});
            }

            return response.data.data;
        }catch (error) {
            if (error instanceof AxiosError && error.response){
                throw new ApiError('Failed to login');
            }
            throw new ApiError('Network error');
        }
    }
}

export const loginService = new LoginService();