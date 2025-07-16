import { apiClient } from '@services/api/apiClient';
import { InstitutionFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';

interface InstitutionCreateResponse {
  message: string;
  data: {
    user: string;
    company: string;
    membership: string;
  };
}

export class InstitutionService {
  async create(data: InstitutionFormData): Promise<InstitutionCreateResponse | ApiError> {
    const formData = new FormData();
    
    formData.append('companyName', data.companyName);
    
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    
    const response = await apiClient.post<InstitutionCreateResponse>(
      'auth/signup/institution',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response instanceof ApiError ? response : response.data;
  }
}

export const institutionService = new InstitutionService();