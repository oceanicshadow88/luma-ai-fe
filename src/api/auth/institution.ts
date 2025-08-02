import { apiClient } from '@services/api/apiClient';
import { InstitutionFormData } from '@features/auth/types';
import { ApiError } from '@custom-types/ApiError';
export class InstitutionService {
  async create(data: InstitutionFormData): Promise<ApiError | void> {
    const formData = new FormData();
    
    formData.append('companyName', data.companyName);
    formData.append('slug', data.slug);
    
    if (data.logo) {
      formData.append('logo', data.logo);
    }
    
    const response = await apiClient.post(
      'auth/signup/institution',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    if (response instanceof ApiError) return response;
  }

  async checkCompanyAvailability(slug: string): Promise<boolean> {
      const response = await apiClient.get(`auth/institution/${slug}`);
      return response.data.available;
  }
}

export const institutionService = new InstitutionService();