import { ResetPasswordFormData } from "@features/auth/type";

export type ResetPasswordField = keyof ResetPasswordFormData | "root";

export class ApiError extends Error {
    code: string;
    meta?: Record<string, any>;
  
    constructor(message: string, code?: string, meta?: Record<string, any>) {
      super(message);
      this.code = code ?? "UNKNOWN_ERROR"; //Default error code 
      this.name = "ApiError";
      this.meta = meta;
    }
  }

//Error mapping for display error messages on frontend
export const ERROR_CODE_MAP: Record<string, { field: ResetPasswordField; message: string }> = {
  AUTH_EMAIL_REQUIRED: {
    field: "email",
    message: "Please enter your email address",
  },
  AUTH_EMAIL_INVALID: {
    field: "email",
    message: "Sorry, please type a valid email",
  },
  AUTH_RATE_LIMIT: {
    field: "verificationCode",
    message: "Too many requests. Please try again later.",
  },
  AUTH_CODE_REQUIRED: {
    field: "verificationCode",
    message: "Please enter the verification code",
  },
  AUTH_CODE_INVALID: {
    field: "verificationCode",
    message: "Invalid or expired code. Please request a new one.",
  },
  AUTH_MAX_ATTEMPTS: {
    field: "verificationCode",
    message: "Too many incorrect attempts. Please request a new verification code.",
  },
  AUTH_PASSWORD_REQUIRED: {
    field: "password",
    message: "Please enter your new password",
  },
  AUTH_PASSWORD_INVALID: {
    field: "password",
    message:
      "Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character",
  },
  PASSWORD_MISMATCH: {
    field: "confirmPassword",
    message: "Passwords do not match",
  },
  UNKNOWN_ERROR: {
    field: "root",
    message: "Unexpected error occurred. Please try again.",
  },
};
  
  
  