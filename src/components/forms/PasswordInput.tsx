import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface PasswordInputProps {
  label?: string;
  error?: string;
  id?: string;
  fieldClassName?: string;       
  labelClassName?: string;       
  inputClassName?: string;       
  errorClassName?: string;      
  toggleButtonClassName?: string; 
  iconClassName?: string;      
  placeholder?: string;
  autoComplete?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      id,
      fieldClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      toggleButtonClassName = '',
      iconClassName = '',
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      onBlur,
      disabled
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    
    return (
      <div className={`w-full ${fieldClassName}`}>
        {label && (
          <label 
            htmlFor={id} 
            className={`block text-sm text-gray-700 mb-1 ${labelClassName}`}
          >
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
            } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 ${inputClassName}`}
          />
          <button
            type="button"
            className={`absolute top-0 right-0 p-2 text-gray-500 ${toggleButtonClassName}`}
            onClick={() => setShow((s) => !s)}
          >
            {show ? 
              <EyeOffIcon className={`h-5 w-5 ${iconClassName}`} /> : 
              <EyeIcon className={`h-5 w-5 ${iconClassName}`} />
            }
          </button>
        </div>
        {error && (
          <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);