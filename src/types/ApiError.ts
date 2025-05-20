import { SignUpInput } from '@features/auth/types';
import { InstitutionPayload } from '@features/auth/types';

export type SignupField = keyof SignUpInput | 'root';

export interface ApiErrorMeta {
  cooldownSeconds?: number;
  [key: string]: unknown;
}

export class ApiError extends Error {
  meta?: ApiErrorMeta;

  constructor(message: string, meta?: ApiErrorMeta) {
    super(message);
    this.name = 'ApiError';
    this.meta = meta;
  }
}

export const SIGNUP_ERROR_MESSAGE_MAP: Record<string, SignupField> = {
  'Please enter your first name': 'firstName',
  'Please enter your last name': 'lastName',
  'Please enter your username': 'username',
  'Please enter your email address': 'email',
  'Sorry, please type a valid email': 'email',
  'Please enter the 6-digit verification code': 'code',
  'Please enter your password': 'password',
  'Passwords do not match': 'confirmPassword',
  'You must agree to the terms to continue.': 'agreeTerms',

 
  'Email already registered. Please log in': 'email',
  'Username already in use. Try a different one': 'username',
  'Invalid or expired code': 'code',
};

export const UNKNOWN_SIGNUP_ERROR = {
  field: 'root' as SignupField,
  message: 'Unexpected signup error. Please try again.',
};

export const INSTITUTION_ERROR_MAP: Record<string, keyof InstitutionPayload | 'root'> = {
  'Organisation name must be at least 2 characters': 'name',
};

export const UNKNOWN_ERROR = {
  field: 'root' as keyof any,
  message: 'Unexpected error occurred. Please try again.',
};