import { forwardRef, useState } from 'react';
import arrowIcon from '@assets/arrow.svg';

interface ImageUploadProps {
  id: string;
  label?: string;
  description?: string;
  error?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  accept?: string;
  disabled?: boolean;
  fieldClassName?: string;
  labelClassName?: string;
  uploadAreaClassName?: string;
  previewClassName?: string;
  errorClassName?: string;
  showPreview?: boolean;
  uploadIcon?: string;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      id,
      label,
      description,
      error,
      name,
      onChange,
      onBlur,
      accept = '.jpg,.png,.svg',
      disabled = false,
      fieldClassName = 'flex flex-col space-y-2',
      labelClassName = 'text-sm text-gray-600',
      uploadAreaClassName = 'relative w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-transparent',
      previewClassName = 'w-full h-full object-contain rounded-lg',
      errorClassName = '',
      showPreview = true,
      uploadIcon = arrowIcon,
    },
    ref
  ) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        if (showPreview) {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
          setPreview(URL.createObjectURL(file));
        }
      } else {
        if (preview) {
          URL.revokeObjectURL(preview);
          setPreview(null);
        }
      }

      onChange(e);
    };

    const handleClearPreview = () => {
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }

      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
      }

      const event = {
        target: { files: null },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    };

    return (
      <div className={`w-full ${fieldClassName}`}>
        {label && (
          <label className={labelClassName}>
            {label}
            {description && <span className="text-gray-400"> {description}</span>}
          </label>
        )}

        <div
          className={`${uploadAreaClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${error ? 'border-red-500' : ''}`}
        >
          <input
            id={id}
            name={name}
            type="file"
            ref={ref}
            accept={accept}
            onChange={handleFileChange}
            onBlur={onBlur}
            disabled={disabled}
            className="absolute inset-0 opacity-0 cursor-pointer"
            onClick={(e) => {
              // Clear value before opening dialog to allow same file selection
              e.currentTarget.value = '';
            }}
          />
          {showPreview && preview ? (
            <div className="relative w-full h-full">
              <img src={preview} alt="Preview" className={previewClassName} />
              <button
                type="button"
                onClick={handleClearPreview}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ) : (
            <img src={uploadIcon} alt="Upload Icon" className="w-6 h-6" />
          )}
        </div>

        {error && (
          <p className={`text-left mt-1 text-sm text-red-600 ${errorClassName}`}>{error}</p>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
