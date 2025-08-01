import { ResetPasswordFormData } from '@features/auth/types';
import { SignUpInput } from '@features/auth/types';
import { InstitutionFormData } from '@features/auth/types';
import { LoginFormData } from '@features/auth/types';

export type ResetPasswordField = keyof ResetPasswordFormData | 'toast';
export type SignupField = keyof SignUpInput | 'toast';
export type LoginField = keyof LoginFormData | 'toast';
export type InstitutionField = keyof InstitutionFormData | 'toast';

export interface ApiErrorMeta {
  field?: string;
}

export class ApiError extends Error {
  meta?: ApiErrorMeta;
  
  constructor(message: string, meta?: ApiErrorMeta) {
    super(message);
    this.name = 'ApiError';
    this.meta = meta;
  }
}

export const UNKNOWN_ERROR = {
  field: 'toast' as const,
  message: 'Unexpected error occurred. Please try again.',
};