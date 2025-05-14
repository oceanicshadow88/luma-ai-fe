import request from '@/services/request';

// Define only the fields required by backend
export type SignupPayload = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

// POST /auth/send-code
export const sendVerificationCode = async (email: string): Promise<boolean> => {
  try {
    await request.post('/auth/send-code', { email });
    return true;
  } catch (error) {
    console.error('Send code failed', error);
    return false;
  }
};

// POST /auth/signup
export const signup = async (data: SignupPayload): Promise<{ orgNotFound?: boolean }> => {
  try {
    const response = await request.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    throw error;
  }
};