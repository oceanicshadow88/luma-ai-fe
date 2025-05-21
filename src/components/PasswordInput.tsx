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

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      id,
      fieldClassName = 'mb-6',
      labelClassName = 'text-left block text-gray-600 mb-1',
      inputClassName = 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-700 focus:ring-0 px-4 h-12 leading-normal pl-[20px] pr-10',
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
      <div className={`w-full ${fieldClassName} group`}>
        {label && (
          <label
            htmlFor={id}
            className={`block text-sm group-focus-within:text-blue-700 ${labelClassName} ${
              error ? 'text-red-600' : ''
            }`}
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
            className={`focus:placeholder-transparent w-full ${error ? 'border-red-600' : ''} ${inputClassName}`}
          />
          <button
            type="button"
            className={`absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 ${toggleButtonClassName}`}
            onClick={() => setShow((s) => !s)}
          >
            {show ? (
              <EyeIcon className={`h-5 w-5 ${iconClassName}`} />
            ) : (
              <EyeOffIcon className={`h-5 w-5 ${iconClassName}`} />
            )}
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
