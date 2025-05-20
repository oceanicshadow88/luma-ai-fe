import { apiClient } from '@services/api/apiClient';
import { InstitutionPayload } from '@features/auth/types';

export class InstitutionService {
  async create(data: InstitutionPayload): Promise<void> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('slug', data.slug);
    formData.append('emailDomain', data.emailDomain);
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    await apiClient.post('/companies', formData);
  }
}

export const institutionService = new InstitutionService();