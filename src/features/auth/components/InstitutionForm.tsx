import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { InstitutionFormData } from '@features/auth/types';
import { institutionSchema } from '@features/auth/schemas';
import { institutionService } from '@api/auth/institution';
import { Input } from '@components/forms/Input';
import { Button } from '@components/buttons/Button';
import { FormError } from '@components/forms/FormError';
import arrowIcon from '@assets/arrow.svg';
import logo from '@assets/logo.svg';
import { filterSignupForm } from '@utils/filterSignupForm';

const InstitutionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = location.state?.signupForm?.email || '';
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InstitutionFormData>({
    resolver: zodResolver(institutionSchema),
    mode: 'onTouched',
    defaultValues: {
      companyName: '',
      logo: undefined,
    },
  });

  const handlePrev = () => {
    navigate('/auth/signup', {
      state: { signupForm: filterSignupForm(location.state?.signupForm || {}) },
    });
  };

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

  const onSubmit = async (data: InstitutionFormData) => {
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
            {...register('companyName')}
            error={errors.companyName?.message}
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
    </div>
  );
};

export default InstitutionForm;
