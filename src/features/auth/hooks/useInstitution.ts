import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionFormData } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { INSTITUTION_ERROR_MAP } from '@custom-types/ApiError';
import { handleApiError } from '@utils/errorHandler';
import { filterSignupForm } from '@utils/filterSignupForm';
import { showToastWithAction } from '@components/toast/ToastWithAction';

function getSlugFromEmail(email: string): string {
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (!domain) return '';
    const parts = domain.split('.');
    return parts.length > 0 ? parts[0] : '';
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
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(institutionSchema.omit({ logo: true })),
        mode: 'onBlur',
        defaultValues: {
            companyName: '',
            slug: getSlugFromEmail(email),
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

        try {
            const formData: InstitutionFormData = {
                ...data,
                logo: logoFile,
            };

            await institutionService.create(formData);

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

        } catch (error) {
            handleApiError(error, setError, INSTITUTION_ERROR_MAP);
        } finally {
            setIsCreating(false);
        }
    };

    const isLogoInvalid = !!logoError;

    return {
        email,
        register,
        handleSubmit: handleSubmit(onSubmit),
        setError,
        errors,
        isSubmitting,
        isCreating,
        logoFile,
        logoError,
        isLogoInvalid,
        handleLogoChange,
        handlePrev,
        getSlugFromEmail,
    };
};