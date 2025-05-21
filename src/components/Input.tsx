import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = 'text',
      placeholder,
      label,
      error,
      fieldClassName = 'mb-6',
      labelClassName = 'text-left block text-gray-600 mb-1',
      inputClassName = 'border focus:outline-none focus:placeholder-transparent rounded-3xl text-left border-gray-300 focus:border-blue-700 focus:ring-0 px-4 h-12 leading-normal pl-[20px]',
      errorClassName = '',
      ...rest
    },
    ref
  ) => (
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

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={`w-full ${inputClassName} ${error ? 'border-red-600' : ''}`}
        {...rest}
      />

      {error && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
);
