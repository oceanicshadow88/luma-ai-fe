export interface ResetPasswordFormData {
  email: string;
  verifyValue: string;  
  newPassword: string;  
}
export interface ResetPasswordInput {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationCodeRateLimitError {
  success: false;
  message: string;
  cooldownSeconds: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  verificationCode?: string;
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
  verificationCode: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface InstitutionFormData {
  companyName: string;
  slug: string;
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
  token?: string; 
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
