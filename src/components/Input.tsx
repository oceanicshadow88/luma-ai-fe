import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;                // Input field label
  error?: string;                // Error message text
  fieldClassName?: string;       // Styles for outer container (wraps all elements)
  labelClassName?: string;       // Styles for label element
  inputClassName?: string;       // Styles for input element
  errorClassName?: string;       // Styles for error message
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    id,
    fieldClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    ...props
  }, ref) => (
    <div className={`w-full ${fieldClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3 py-3 border rounded-md
          ${error ? 'border-red-500' : 'border-gray-300'}
          text-gray-900 placeholder-gray-500
          focus:outline-none focus:border-blue-500
          ${inputClassName}`}  
      />

      {error && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
);