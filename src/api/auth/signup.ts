import { apiClient } from '@services/api/apiClient';
import { SignupFormData, UserRole } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

interface SignupResult {
  refreshToken?: string;
  accessToken?: string;
  membership?: {
    company: string;
    role: string;
  }[];
}

interface SignupService {
  signup(data: SignupFormData, userRole?: UserRole): Promise<SignupResult>;
  signupAsLearner(data: SignupFormData): Promise<SignupResult>;
  signupAsAdmin(data: SignupFormData): Promise<SignupResult>;
  signupAsInstructor(data: SignupFormData): Promise<SignupResult>;
  sendCode(email: string): Promise<void>;
  adminSignupRaw(data: SignupFormData, userRole?: UserRole): Promise<any>;
}

class SignupServiceImpl implements SignupService {
  async signup(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<SignupResult> {
    const endpoint = `/auth/signup/${userRole}`;
    const response = await apiClient.post(endpoint, data);

    if (!response.data.success) {
      const { message } = response.data;
      throw new ApiError(message);
    }

    const result: SignupResult = response.data.data;
    
    if (result.accessToken) {
      localStorage.setItem('accessToken', result.accessToken);
    }

    return result;
  }

  async signupAsLearner(data: SignupFormData): Promise<SignupResult> {
    return this.signup(data, UserRole.LEARNER);
  }

  async signupAsAdmin(data: SignupFormData): Promise<SignupResult> {
    const response = await apiClient.post<SignupResult>('/auth/signup/admin', data);

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  }

  async signupAsInstructor(data: SignupFormData): Promise<SignupResult> {
    const response = await apiClient.post('/auth/signup/instructor', data);
    
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  }

  async sendCode(email: string): Promise<void> {
    await apiClient.post('/auth/request-verification-code', { email });
  }

  async adminSignupRaw(data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<any> {
    const endpoint = `/auth/signup/${userRole}`;
    return apiClient.post(endpoint, data, {
      validateStatus: () => true,
    });
  }
}

export const signupService = new SignupServiceImpl();