import { Input } from '@components/forms/Input';
import { Button } from '@components/buttons/Button';
import { ImageUpload } from '@components/forms/ImageUpload';
import { useInstitution } from '@features/auth/hooks/useInstitution';

export const InstitutionForm = () => {
    const {
        email,
        register,
        handleSubmit,
        errors,
        isSubmitting,
        logoError,
        isLogoInvalid,
        handleLogoChange,
        handlePrev,
    } = useInstitution();

    const onLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            handleLogoChange(null);
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            handleLogoChange(null, 'Only JPG, PNG, SVG files are allowed');
            return;
        }

        if (file.size > maxSize) {
            handleLogoChange(null, 'File must be smaller than 5MB');
            return;
        }

        handleLogoChange(file);
    };

    return (
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 text-left mb-1">Work Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="rounded-3xl border border-gray-300 h-11 px-4 w-full bg-gray-100 cursor-not-allowed text-gray-500"
                    />
                </div>

                <Input
                    id="companyName"
                    label="Organisation Name"
                    placeholder="e.g. Ivy College"
                    {...register('companyName')}
                    error={errors.companyName?.message}
                />

                <div className="flex flex-col space-y-2">
                    <ImageUpload
                        id="logo"
                        label="Upload Logo"
                        description="(Optional; Supports JPG/PNG/SVG, max 5MB.)"
                        name="logo"
                        onChange={onLogoChange}
                        onBlur={() => {}}
                        error={logoError}
                        labelClassName="text-sm text-gray-600 text-left"
                        fieldClassName="flex flex-col space-y-2"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 text-left mb-1">
                        Organisation Slug <span className="text-gray-400">(Auto-generated from email, not editable)</span>
                    </label>
                    <div className="flex items-center">
                        <input
                            {...register('slug')}
                            type="text"
                            placeholder="Auto-generated from email (not editable)"
                            className="rounded-3xl border border-gray-300 h-11 px-4 w-full bg-gray-100 cursor-not-allowed text-gray-500"
                            disabled
                        />
                        <span className="ml-2 text-gray-500 whitespace-nowrap">.lumaai.com</span>
                    </div>
                </div>

                <div className="flex gap-2 md:gap-4 mt-8">
                    <Button 
                        variant="secondary" 
                        type="button" 
                        onClick={handlePrev} 
                        className="rounded-3xl"
                        fullWidth
                    >
                        Previous
                    </Button>
                    <Button 
                        type="submit" 
                        variant="primary"
                        className="rounded-3xl"
                        fullWidth 
                        disabled={isSubmitting || isLogoInvalid} // ✅ 禁用条件
                        isLoading={isSubmitting}
                    >
                        Finish Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
};
