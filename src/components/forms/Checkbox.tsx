import { forwardRef } from 'react';

interface CheckboxProps {
  id: string;
  label?: string;
  error?: string;
  fieldClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
  checked?: boolean;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      error,
      name,
      onChange,
      onBlur,
      checked,
      disabled = false,
      fieldClassName = 'mb-6',
      labelClassName = 'text-left text-gray-600 ml-2',
      checkboxClassName = 'mr-2',
      errorClassName = '',
    },
    ref
  ) => (
    <div className={`w-full ${fieldClassName} group`}>
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          checked={checked}
          disabled={disabled}
          className={`${checkboxClassName} ${error ? 'border-red-500' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
        {label && (
          <label
            htmlFor={id}
            className={`text-sm group-focus-within:text-blue-600 ${labelClassName} ${
              error ? 'text-red-600' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className={`text-left mt-1 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
);