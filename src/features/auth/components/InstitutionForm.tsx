import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInstitution } from '@features/auth/hooks/useInstitution';
import { InstitutionPayload } from '@features/auth/types';
import { INSTITUTION_ERROR_MAP, UNKNOWN_ERROR, ApiError } from '@/types/ApiError';
import { toast } from 'react-toastify';

const InstitutionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email: string = location.state?.email || '';

    const { createInstitution, isSubmitting } = useInstitution();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof InstitutionPayload | 'root', string>>>({});

    // 自动生成 slug
    useEffect(() => {
        if (name.trim()) {
            const base = name.trim().toLowerCase().replace(/\s+/g, '-');
            setSlug(base);
        }
    }, [name]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setLogo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const emailDomain = email.split('@')[1];
        const payload: InstitutionPayload = {
            name,
            slug,
            emailDomain,
            logo: logo || undefined,
        };

        if (name.trim().length < 2) {
            setErrors({ name: 'Organisation name must be at least 2 characters' });
            return;
        }

        try {
            await createInstitution(payload);
            toast.success('Successfully signed up!');
            navigate('/admin/dashboard');
        } catch (error) {
            if (error instanceof ApiError) {
                const field = INSTITUTION_ERROR_MAP[error.message] || UNKNOWN_ERROR.field;
                setErrors({ [field]: error.message });
                return;
            }

            setErrors({ root: UNKNOWN_ERROR.message });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">Register New Institution</h2>
                <p className="text-sm text-gray-500">Verified Email: {email}</p>
            </div>

            <div className="space-y-4">
                {/* Organisation Name */}
                <div>
                    <label className="block font-medium mb-1">Organisation Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ivy College"
                        className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Slug */}
                <div>
                    <label className="block font-medium mb-1">Organisation Slug</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="Auto-generated (editable)"
                        />
                        <span className="text-gray-500 whitespace-nowrap">.lumaai.com</span>
                    </div>
                </div>

                {/* Logo */}
                <div>
                    <label className="block font-medium mb-1">Upload Logo (optional)</label>
                    <input
                        type="file"
                        accept=".jpg,.png,.svg"
                        onChange={handleLogoChange}
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

                {errors.root && <p className="text-red-500 text-sm mt-2">{errors.root}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => navigate('/auth/signup')}
                >
                    Previous
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : 'Finish Sign Up'}
                </button>
            </div>
        </div>
    );
};

export default InstitutionForm;