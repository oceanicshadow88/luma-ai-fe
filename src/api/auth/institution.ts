import { apiClient } from '@services/api/apiClient';
import { InstitutionFormData } from '@features/auth/types';

interface InstitutionCreateResponse {
  message: string;
  data: {
    user: string;
    company: string;
    membership: string;
  };
}

export class InstitutionService {
  async create(data: InstitutionFormData): Promise<InstitutionCreateResponse> {
    const formData = new FormData();
    
    formData.append('companyName', data.companyName);
    
    if (data.emailDomain) {
      formData.append('emailDomain', data.emailDomain);
    }
    
    if (data.logo) {
      formData.append('logo', data.logo);
      console.log('Logo file added:', {
        name: data.logo.name,
        size: data.logo.size,
        type: data.logo.type
      });
    } else {
      console.log('No logo file provided');
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
    
    return response.data;
  }
}

export const institutionService = new InstitutionService();