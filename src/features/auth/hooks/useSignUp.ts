import { useState } from 'react';
import { signupService } from '@api/auth/signup';
import { SignupFormData, UserRole } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

export function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const signup = async (data: SignupFormData, userRole: UserRole = UserRole.LEARNER): Promise<{ redirect?: string }> => {
    setIsSigningUp(true);
    
    try {
      const response = await signupService.signupRaw(data, userRole);
      const status = response.status;
      const resData = response.data;
      
      if (status >= 200 && status < 300) {
        if (userRole === UserRole.ADMIN) {
          const { refreshToken, accessToken } = resData;
          
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
          
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }
        } else {
          const refreshToken = resData?.data?.refreshToken;
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
            
            const accessToken = resData?.data?.accessToken;
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
            } else {
              throw new ApiError('Failed to retrieve access token');
            }
          }
        }
        
        return {};
      } else {
        if (resData?.message === 'The company does not exist' && userRole === UserRole.ADMIN) {
          return { redirect: '/auth/signup/institution' };
        }
        
        throw new ApiError(resData?.message || 'Unexpected error occurred');
      }
      
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Unexpected error occurred');
    } finally {
      setIsSigningUp(false);
    }
  };
  
  const signupAsLearner = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    return signup(data, UserRole.LEARNER);
  };
  
  const signupAsAdmin = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    return signup(data, UserRole.ADMIN);
  };
  
  const signupAsInstructor = async (data: SignupFormData): Promise<{ redirect?: string }> => {
    return signup(data, UserRole.INSTRUCTOR);
  };
  
  return {
    signup,
    signupAsLearner,
    signupAsAdmin,
    signupAsInstructor,
    isSigningUp,
  };
}