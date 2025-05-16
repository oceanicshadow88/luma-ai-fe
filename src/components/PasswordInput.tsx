import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
}

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps // Removed ...rest from props to prevent security issues
>(
  (
    {
      label,
      error,
      id,
      className,
      inputClassName,
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      onBlur,
      disabled,
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      //Apply user-provided className to the outer div to allow custom styling of the component container
      <div className={`w-full ${className ?? ''}`}>
        {label && (
          <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            type={show ? 'text' : 'password'}
            className={`w-full px-3 py-2 border rounded-md ${
              error ? 'border-red-500' : 'border-gray-300'
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 ${inputClassName ?? ''}`}
          />
          <button
            type="button"
            className="absolute top-0 right-0 p-2 text-gray-500"
            onClick={() => setShow((s) => !s)}
          >
            {show ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
