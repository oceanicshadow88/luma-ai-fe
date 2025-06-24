export interface ResetPasswordFormData {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationCodeResponse {
  success: true;
  message: string;
  code?: string;
  expiresAt: string;
}

export interface VerificationCodeRateLimitError {
  success: false;
  message: string;
  cooldownSeconds: number;
}

export interface ResetPasswordResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface InstitutionFormData {
  companyName: string;
  logo?: File | null;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  verifyValue: string;
  termsAccepted: boolean;
}

export enum UserType {
  LEARNER = 'learner',
  ENTERPRISE = 'enterprise',
}

export enum UserRole {
  LEARNER = 'learner',
  ADMIN = 'admin',
  INSTRUCTOR = 'instructor',
}
