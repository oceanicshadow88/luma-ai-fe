import { forwardRef } from 'react';

interface InputProps {
  id: string;                    
  label?: string;                
  error?: string;                
  type?: string;                
  placeholder?: string;         
  name?: string;                
  onChange?: any;                
  onBlur?: any;                  
  ref?: any;                     
  fieldClassName?: string;       
  labelClassName?: string;       
  inputClassName?: string;       
  errorClassName?: string;       
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    label,
    error,
    type = 'text',
    placeholder,
    name,
    onChange,
    onBlur,
    fieldClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
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
        id={id}
        name={name}
        ref={ref}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
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