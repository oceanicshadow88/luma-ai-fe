import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...rest }, ref) => (
    <div className="w-full text-base">
      {label && (
        <label htmlFor={id} className="w-full text-base block text-sm text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`w-full text-base px-3 py-3 border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

