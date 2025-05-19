import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createInstitution } from '../services/signup';
import { InstitutionPayload } from '../types';

const InstitutionForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email: string = location.state?.email || '';

    const [orgName, setOrgName] = useState('');
    const [slug, setSlug] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 自动生成 slug
    useEffect(() => {
        if (orgName.trim()) {
            const base = orgName.trim().toLowerCase().replace(/\s+/g, '-');
            setSlug(base);
        }
    }, [orgName]);

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
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (orgName.trim().length < 2) {
            toast.error('Organisation name must be at least 2 characters');
            return;
        }

        const payload: InstitutionPayload = {
            name: orgName.trim(),
            slug,
            emailDomain: email.split('@')[1],
            logo: logoFile || undefined,
        };

        setIsSubmitting(true);
        try {
            await createInstitution(payload);
            toast.success('Successfully signed up!');
            navigate('/admin/dashboard');
        } catch (err: any) {
            if (err.response?.data?.message?.includes('slug')) {
                const newSlug = `${slug}-${Math.floor(Math.random() * 1000)}`;
                setSlug(newSlug);
                toast.warn('Slug already taken. Appended a suffix.');
            } else {
                toast.error('Sign up failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow mt-10">
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-1">Register New Institution</h2>
                <p className="text-sm text-gray-500">Verified Email: {email}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Organisation Name</label>
                    <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Ivy College"
                        className="w-full border rounded-md px-3 py-2"
                        required
                    />
                </div>

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
            </div>

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