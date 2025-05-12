export interface ResetPasswordFormData {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationCodeResponse {
  success: boolean;
  expiresAt: number;
}

export interface ResetPasswordResponse {
  success: boolean;
}