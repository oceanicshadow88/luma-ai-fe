import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionPayload } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { ApiError, INSTITUTION_ERROR_MAP, UNKNOWN_ERROR } from '@/types/ApiError';
import { getErrorField } from '@/utils/errorHandler';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import arrowIcon from '@/assets/arrow.svg';
import rightLogo from '@/assets/right-logo.png';
import logo from '@/assets/logo.svg';

const InstitutionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email: string = location.state?.email || '';
    const emailDomain = email.split('@')[1];
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<InstitutionPayload>({
        resolver: zodResolver(institutionSchema),
        defaultValues: {
            name: '',
            slug: '',
            logo: undefined,
            emailDomain,
        },
    });

    const watchedName = watch('name');

    useEffect(() => {
        if (watchedName.trim()) {
            const base = watchedName.trim().toLowerCase().replace(/\s+/g, '-');
            setValue('slug', base);
        }
    }, [watchedName, setValue]);

    const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
                return setError('logo', { type: 'manual', message: 'Only JPG, PNG, or SVG files are allowed' });
            }
            if (file.size > 5 * 1024 * 1024) {
                return setError('logo', { type: 'manual', message: 'File must be smaller than 5MB' });
            }
            setValue('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: InstitutionPayload) => {
        try {
            await institutionService.create(data);
            navigate('/admin/dashboard');
        } catch (error) {
            if (error instanceof ApiError) {
                const field = getErrorField(error, INSTITUTION_ERROR_MAP, UNKNOWN_ERROR.field);
                setError(field as keyof InstitutionPayload, {
                    type: 'manual',
                    message: error.message,
                });
            } else {
                setError('root', {
                    type: 'manual',
                    message: UNKNOWN_ERROR.message,
                });
            }
        }
    };

    return (
        <div className="flex w-full h-screen items-center justify-center gap-[170px]">
            {/* Left section */}
            <div className="w-[400px] flex flex-col justify-center">
                <img src={logo} alt="Luma AI Logo" className="w-[140px] h-auto mb-3" />
                <h2 className="text-2xl font-bold mb-2 text-left block">Register New Institution</h2>
                <p className="text-sm text-gray-500 mb-10 text-left block">Invited Email: {email}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 text-left block">
                    <Input
                        id="name"
                        label="Organisation Name"
                        placeholder="e.g. Ivy College"
                        {...register('name')}
                        error={errors.name?.message}
                    />

                    {/* Upload Logo */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-600">Upload Logo <span className="text-gray-400">(Optional; Supports JPG/PNG/SVG, max 5MB.)</span></label>
                        <div className="relative w-20 h-20 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-transparent">
                            <input
                                type="file"
                                accept=".jpg,.png,.svg"
                                onChange={onLogoChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <img src={arrowIcon} alt="Upload Icon" className="w-6 h-6" />
                        </div>
                        {logoPreview && (
                            <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-contain border rounded mt-2" />
                        )}
                        <FormError message={errors.logo?.message} />
                    </div>

                    {/* Slug */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">
                            Organisation Slug <span className="text-gray-400">(Optional)</span>
                        </label>
                        <div className="flex items-center mt-1">
                            <input
                                {...register('slug')}
                                type="text"
                                placeholder="Auto-generated from name (editable)"
                                className="rounded-3xl border border-gray-300 h-11 px-4 w-full focus:outline-none focus:border-blue-600"
                            />
                            <span className="ml-2 text-gray-500">.lumaai.com</span>
                        </div>
                    </div>

                    <FormError message={errors.root?.message} />

                    <div className="flex gap-4 mt-2">
                        <Button variant="secondary" type="button" onClick={() => navigate('/auth/signup')} fullWidth>
                            Previous
                        </Button>
                        <Button type="submit" fullWidth isLoading={isSubmitting}>
                            Finish Sign Up
                        </Button>
                    </div>
                </form>
            </div>

            {/* Right section */}
            <div className="w-[600px] h-[800px] flex items-center justify-center">
                <img src={rightLogo} alt="Luma AI Logo" className="w-[600px] h-[800px] object-contain" />
            </div>
        </div>
    );
};

export default InstitutionForm;
