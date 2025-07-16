import { apiClient } from '@services/api/apiClient';
import { SignupFormData, UserRole } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
import { AxiosResponse } from 'axios';

interface SignupResult {
  refreshToken?: string;
  accessToken?: string;
  message?: string;
}

interface SignupService {
  signup(data: SignupFormData, userRole?: UserRole): Promise<SignupResult | ApiError>;
  signupAsLearner(data: SignupFormData): Promise<SignupResult | ApiError>;
  signupAsAdmin(data: SignupFormData): Promise<SignupResult | ApiError>;
  signupAsInstructor(data: SignupFormData): Promise<SignupResult | ApiError>;
  sendCode(email: string): Promise<void | ApiError>;
  adminSignupRaw(data: SignupFormData, userRole?: UserRole): Promise<any>;
}

class SignupServiceImpl implements SignupService {
  async signup(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<SignupResult | ApiError> {
    const endpoint = `/auth/signup/${userRole}`;
    const response = await apiClient.post(endpoint, data);

    const result: SignupResult = (response as AxiosResponse).data;

    if (result.refreshToken) {
      localStorage.setItem('refreshToken', result.refreshToken);
    }

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result ?? ApiError;
  }

  async signupAsLearner(data: SignupFormData): Promise<SignupResult | ApiError> {
    return this.signup(data, UserRole.LEARNER);
  }

  async signupAsAdmin(data: SignupFormData): Promise<SignupResult | ApiError> {
    const response = await apiClient.post<SignupResult>('/auth/signup/admin', data);

    const result = (response as AxiosResponse<SignupResult>).data;

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result ?? ApiError;
  }

  async signupAsInstructor(data: SignupFormData): Promise<SignupResult | ApiError> {
    const response = await apiClient.post('/auth/signup/instructor', data);

    const result = (response as AxiosResponse).data;

    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result ?? ApiError;
  }

  async sendCode(email: string): Promise<void | ApiError> {
    const response = await apiClient.post('/auth/request-verification-code', { email });

    if (response instanceof ApiError) {
      return response;
    }

    return;
  }

  async adminSignupRaw(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<any> {
    const endpoint = `/auth/signup/${userRole}`;
    return apiClient.post(endpoint, data, {
      validateStatus: () => true,
    });
  }
}

export const signupService = new SignupServiceImpl();