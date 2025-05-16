import { forwardRef, InputHTMLAttributes } from 'react';
import { Button } from '@components/Button';

interface VerificationCodeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  className?: string;
  fieldClassName?: string; // Updated from inputClassName to fieldClassName
}

export const VerificationCodeInput = forwardRef<
  HTMLInputElement,
  VerificationCodeInputProps // Removed ...rest from props to prevent security issues
>(
  (
    {
      label,
      error,
      id,
      buttonText,
      onButtonClick,
      isButtonDisabled = false,
      className,
      fieldClassName,
      placeholder,
      autoComplete,
      name,
      value,
      onChange,
      onBlur,
      disabled,
    },
    ref
  ) => (
    //Apply user-provided className to the outer div to allow custom styling of the component container
    <div className={`w-full ${className ?? ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex gap-2">
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
          className={`w-full px-3 py-2 border rounded-md ${
            error ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 ${
            fieldClassName ?? ''
          }`}
        />
        <Button type="button" variant="outline" onClick={onButtonClick} disabled={isButtonDisabled}>
          {buttonText}
        </Button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);
VerificationCodeInput.displayName = 'VerificationCodeInput';
