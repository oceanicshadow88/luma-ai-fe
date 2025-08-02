import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionFormData } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { filterSignupForm } from '@utils/filterSignupForm';
import { showToastWithAction } from '@components/toast/ToastWithAction';

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
            slug: '',
            emailDomain: emailDomain || '',
        },
    });

    const handlePrev = () => {
        navigate('/auth/signup/admin', {
            state: { signupForm: filterSignupForm(location.state?.signupForm || {}) }
        });
    };

    const handleLogoChange = (file: File | null, error?: string) => {
        setLogoFile(file);
        setLogoError(error || '');
    };

    const onSubmit = handleSubmit(async (data: FormData) => {
        if (logoFile) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(logoFile.type)) {
                setLogoError('Only JPG, PNG, SVG files are allowed');
                return;
            }

            if (logoFile.size > maxSize) {
                setLogoError('File must be smaller than 5MB');
                return;
            }
        }

        setIsCreating(true);

        const formData: InstitutionFormData = {
            ...data,
            logo: logoFile,
        };

        const result = await institutionService.create(formData);

        if (result) {
            if (result.meta?.field === 'slug') {
                setError('slug', {
                    message: result.message,
                });
            }
            setIsCreating(false);
            return;
        }

        const slug = data.slug;
        const baseHost = window.location.host;
        const redirectUrl = `http://${slug}.${baseHost}/dashboard`;

        const timeoutId = setTimeout(() => {
            window.location.href = redirectUrl;
        }, 3000);

        showToastWithAction('Successfully signed up! Redirecting...', {
            actionText: 'Go Now',
            onAction: () => {
                clearTimeout(timeoutId);
                window.location.href = redirectUrl;
            },
            duration: 2000,
        });

        setIsCreating(false);
    });

    const isLogoInvalid = !!logoError;

    return {
        email,
        register,
        handleSubmit: onSubmit,
        errors,
        isSubmitting,
        isCreating,
        logoError,
        isLogoInvalid,
        handleLogoChange,
        handlePrev,
        watch,
        setValue,
        generateSlugFromCompanyName,
    };
};