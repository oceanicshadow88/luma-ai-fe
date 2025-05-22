import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InstitutionPayload } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { ApiError, INSTITUTION_ERROR_MAP, UNKNOWN_ERROR } from '@/types/ApiError';
import { getErrorField } from '@/utils/errorHandler';

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
                toast.error('Only JPG, PNG, or SVG files are allowed');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File must be smaller than 5MB');
                return;
            }
            setValue('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: InstitutionPayload) => {
        try {
            await institutionService.create(data);
            toast.success('Successfully signed up!');
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
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">Register New Institution</h2>
                <p className="text-sm text-gray-500">Verified Email: {email}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Organisation Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        placeholder="Ivy College"
                        className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Organisation Slug</label>
                    <div className="flex items-center space-x-2">
                        <input
                            {...register('slug')}
                            type="text"
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="Auto-generated (editable)"
                        />
                        <span className="text-gray-500 whitespace-nowrap">.lumaai.com</span>
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Upload Logo (optional)</label>
                    <input
                        type="file"
                        accept=".jpg,.png,.svg"
                        onChange={onLogoChange}
                        className="w-full"
                    />
                    {logoPreview && (
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="mt-2 w-24 h-24 object-contain border rounded"
                        />
                    )}
                </div>

                {errors.root && <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                        onClick={() => navigate('/auth/signup')}
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Finish Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InstitutionForm;