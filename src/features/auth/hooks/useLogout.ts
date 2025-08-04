import { useNavigate } from 'react-router-dom';
import { apiClient } from '@services/api/apiClient';
import { ApiError } from '../../../types/ApiError';

export const useLogout = () => {
    const navigate = useNavigate();

    return async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            const response = await apiClient.post('/auth/logout', { refreshToken });

            if (response instanceof ApiError) return response;
        }

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/login');
    };
};
