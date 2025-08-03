import { apiClient } from '@services/api/apiClient';
import { ApiError } from '@custom-types/ApiError';
export class DashboardService {
  async getDashboardData(): Promise<ApiError | void> {
    const response = await apiClient.get(
      'dashboard',
    );
    
    if (response instanceof ApiError) return response;
    return response.data;
  }
}

export const dashboardService = new DashboardService();