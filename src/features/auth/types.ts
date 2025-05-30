export type SignUpInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

// Used in POST /api/companies
export type InstitutionPayload = {
  name: string;
  slug: string;
  emailDomain: string;
  logo?: File;
};

export type SignupFormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string; 
  verifyCode: string;
};