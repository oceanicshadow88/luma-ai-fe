import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionFormData } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { filterSignupForm } from '@utils/filterSignupForm';
import { showToastWithAction } from '@components/toast/ToastWithAction';
import { ApiError } from '@custom-types/ApiError';

function generateSlugFromCompanyName(companyName: string): string {
   return companyName
       .toLowerCase()
       .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
       .replace(/\s+/g, '-') // Replace spaces with hyphens
       .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
       .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export const useInstitution = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const email: string = location.state?.signupForm?.email || '';
   const emailDomain = email.split('@')[1];

   const [logoFile, setLogoFile] = useState<File | null>(null);
   const [logoError, setLogoError] = useState<string>('');
   const [isCreating, setIsCreating] = useState(false);

   type FormData = {
       companyName: string;
       slug: string;
       emailDomain: string;
   };

   const {
       register,
       handleSubmit,
       setError,
       watch,
       setValue,
       formState: { errors, isSubmitting }
   } = useForm<FormData>({
       resolver: zodResolver(institutionSchema.omit({ logo: true })),
       mode: 'onBlur',
       defaultValues: {
           companyName: '',
           emailDomain: emailDomain || '',
       },
   });

   const handlePrev = () => {
       navigate('/auth/signup/admin', { 
           state: { signupForm: filterSignupForm(location.state?.signupForm || {}) } 
       });
   };

   const validateLogo = (file: File): string | null => {
       const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
       const maxSize = 5 * 1024 * 1024;

       if (!allowedTypes.includes(file.type)) {
           return 'Only JPG, PNG, SVG files are allowed';
       }

       if (file.size > maxSize) {
           return 'File must be smaller than 5MB';
       }

       return null;
   };

   const handleLogoChange = (file: File | null, error?: string) => {
       setLogoFile(file);
       setLogoError(error || '');
   };

   const onSubmit = async (data: FormData) => {
       if (logoFile) {
           const logoValidationError = validateLogo(logoFile);
           if (logoValidationError) {
               setLogoError(logoValidationError);
               return;
           }
       }

       setIsCreating(true);

       const formData: InstitutionFormData = {
           ...data,
           logo: logoFile,
       };

       const result = await institutionService.create(formData);
       
       if (result instanceof ApiError) {
           setIsCreating(false);
           return;
       }

       const timeoutId = setTimeout(() => {
           navigate('/dashboard');
       }, 3000);

       showToastWithAction('Successfully signed up! Redirecting...', {
           actionText: 'Go Now',
           onAction: () => {
               clearTimeout(timeoutId);
               navigate('/dashboard');
           },
           duration: 2000,
       });

       setIsCreating(false);
   };

   const isLogoInvalid = !!logoError;

   return {
       email,
       register,
       handleSubmit: handleSubmit(onSubmit),
       setError,
       watch,
       setValue,
       errors,
       isSubmitting,
       isCreating,
       logoFile,
       logoError,
       isLogoInvalid,
       handleLogoChange,
       handlePrev,
       generateSlugFromCompanyName,
   };
};