import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionPayload } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { ApiError, INSTITUTION_ERROR_MAP, UNKNOWN_ERROR } from '@custom-types/ApiError';
import { Input } from '@components/forms/Input';
import { Button } from '@components/buttons/Button';
import { FormError } from '@components/forms/FormError';
import arrowIcon from '@assets/arrow.svg';
import rightLogo from '@assets/decorative_graphic.png';
import logo from '@assets/logo.svg';
import { filterSignupForm } from '@utils/filterSignupForm';

function getSlugFromEmail(email: string): string {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  if (!domain) return '';
  const parts = domain.split('.');
  return parts.length > 0 ? parts[0] : '';
}

const InstitutionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = location.state?.signupForm?.email || '';
  const emailDomain = email.split('@')[1];
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InstitutionPayload>({
    resolver: zodResolver(institutionSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      slug: '',
      logo: undefined,
      emailDomain,
    },
  });

  const handlePrev = () => {
    navigate('/auth/signup', {
      state: { signupForm: filterSignupForm(location.state?.signupForm || {}) },
    });
  };

  useEffect(() => {
    if (email) {
      const slugFromEmail = getSlugFromEmail(email);
      setValue('slug', slugFromEmail);
    }
  }, [email, setValue]);

  const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        return setError('logo', {
          type: 'manual',
          message: 'Only JPG, PNG, or SVG files are allowed',
        });
      }
      if (file.size > 5 * 1024 * 1024) {
        return setError('logo', { type: 'manual', message: 'File must be smaller than 5MB' });
      }
      setValue('logo', file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: InstitutionPayload) => {
    await institutionService.create(data);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <div className="w-full max-w-md md:max-w-lg px-6 py-8 md:px-12 flex flex-col justify-center">
        <img src={logo} alt="Luma AI Logo" className="w-36 h-auto mb-5 mx-auto md:mx-0" />
        <h2 className="text-2xl font-bold mb-2 text-center md:text-left">
          Register New Institution
        </h2>
        <p className="text-sm text-gray-500 mb-8 text-center md:text-left">Email: {email}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <Input
            id="name"
            label="Organisation Name"
            placeholder="e.g. Ivy College"
            {...register('name')}
            error={errors.name?.message}
          />

          {/* Upload Logo */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">
              Upload Logo
              <span className="text-gray-400">(Optional; Supports JPG/PNG/SVG, max 5MB.)</span>
            </label>
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
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-24 h-24 object-contain border rounded mt-2"
              />
            )}
            <FormError message={errors.logo?.message} />
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">
              Organisation Slug
              <span className="text-gray-400">(Auto-generated from email, not editable)</span>
            </label>
            <div className="flex items-center mt-1">
              <input
                {...register('slug')}
                type="text"
                placeholder="Auto-generated from email (not editable)"
                className="rounded-3xl border border-gray-300 h-11 px-4 w-full bg-gray-100 cursor-not-allowed"
                disabled
              />
              <span className="ml-2 text-gray-500">.lumaai.com</span>
            </div>
          </div>

          <FormError message={errors.root?.message} />

          <div className="flex gap-2 md:gap-4 mt-2">
            <Button variant="secondary" type="button" onClick={handlePrev} fullWidth>
              Previous
            </Button>
            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Finish Sign Up
            </Button>
          </div>
        </form>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src={rightLogo}
          alt="Luma AI Logo"
          className="max-w-xs md:max-w-md lg:max-w-xl h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default InstitutionForm;
