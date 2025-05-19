import request from '@/services/request';
import { InstitutionPayload } from '../types';



export type SignupPayload = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};


export const sendVerificationCode = async (email: string): Promise<boolean> => {
  try {
    await request.post('/auth/send-code', { email });
    return true;
  } catch (error) {
    console.error('Send code failed', error);
    return false;
  }
};


export const signup = async (data: SignupPayload): Promise<{ orgNotFound?: boolean }> => {
  try {
    const response = await request.post('/v1/auth/signup', data);
    return response.data;
  } catch (error) {
    console.error('Signup failed', error);
    throw error;
  }
};




export const createInstitution = async (data: InstitutionPayload): Promise<any> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('slug', data.slug);
  formData.append('emailDomain', data.emailDomain);
  if (data.logo) {
    formData.append('logo', data.logo);
  }

  try {
    const response = await request.post('/api/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Institution creation failed', error);
    throw error;
  }
};