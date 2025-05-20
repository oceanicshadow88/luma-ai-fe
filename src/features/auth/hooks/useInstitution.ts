import { useState } from 'react';
import { InstitutionPayload } from '@features/auth/types';
import { institutionService } from '@api/auth/institution';
import { ApiError } from '@custom-types/ApiError';

export function useInstitution() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createInstitution = async (data: InstitutionPayload): Promise<void> => {
    setIsSubmitting(true);
    try {
      await institutionService.create(data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createInstitution,
    isSubmitting,
  };
}