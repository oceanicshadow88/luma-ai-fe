import { apiClient } from '@services/api/apiClient';
import { SignupFormData, UserRole } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

interface SignupResult {
  refreshToken?: string;
  accessToken?: string;
  message?: string;
}

interface SignupService {
  signup(data: SignupFormData, userRole?: UserRole): Promise<ApiError | void>;
  signupAsLearner(data: SignupFormData): Promise<ApiError | void>;
  signupAsAdmin(data: SignupFormData): Promise<ApiError | void>;
  signupAsInstructor(data: SignupFormData): Promise<ApiError | void>;
  sendCode(email: string): Promise<ApiError | void>;
  adminSignupRaw(data: SignupFormData, userRole?: UserRole): Promise<ApiError | void>;
}

class SignupServiceImpl implements SignupService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async signup(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<ApiError | void | any> {
    const endpoint = `/auth/signup/${userRole}`;
    const response = await apiClient.post(endpoint, data);

    if (response instanceof ApiError) {
      return response;
    }

    const result: SignupResult = response.data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }
  }

  async signupAsLearner(data: SignupFormData): Promise<ApiError | void> {
    return this.signup(data, UserRole.LEARNER);
  }

  async signupAsAdmin(data: SignupFormData): Promise<ApiError | void> {
    const response = await apiClient.post<SignupResult>('/auth/signup/admin', data);

    if (response instanceof ApiError) {
      return response;
    }

    const result = response.data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }
  }

  async signupAsInstructor(data: SignupFormData): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/signup/instructor', data);

    if (response instanceof ApiError) {
      return response;
    }

    const result = response.data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

  }

  async sendCode(email: string): Promise<ApiError | void> {
    const response = await apiClient.post('/auth/request-verification-code', { email });

    return response instanceof ApiError ? response : undefined;
  }

  async adminSignupRaw(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<ApiError | void> {
    const endpoint = `/auth/signup/${userRole}`;
    return apiClient.post(endpoint, data, {
      validateStatus: () => true,
    });
  }
}

export const signupService = new SignupServiceImpl();