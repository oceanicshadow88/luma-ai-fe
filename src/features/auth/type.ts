
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

export interface LoginFormData  {
  email: string;
  password: string;
};
