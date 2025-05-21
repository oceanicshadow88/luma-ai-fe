import { forwardRef } from 'react';
import { Button } from '@components/buttons/Button';

interface VerificationCodeInputProps {
  label?: string;
  error?: string;
  id?: string;
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  fieldClassName?: string;       
  labelClassName?: string;       
  inputClassName?: string;     
  buttonClassName?: string;     
  errorClassName?: string;       
  containerClassName?: string; 
  placeholder?: string;
  autoComplete?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const VerificationCodeInput = forwardRef<
  HTMLInputElement,
  VerificationCodeInputProps
>(
  (
    {
      label,
      error,
      id,
      buttonText,
      onButtonClick,
      isButtonDisabled = false,
      fieldClassName = '',
      labelClassName = '',
      inputClassName = '',
      buttonClassName = '',
      errorClassName = '',
      containerClassName = '',
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
    <div className={`w-full ${fieldClassName}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm text-gray-700 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className={`flex gap-2 ${containerClassName}`}>
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
          } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 ${inputClassName}`}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={onButtonClick} 
          disabled={isButtonDisabled}
          className={buttonClassName}
        >
          {buttonText}
        </Button>
      </div>
      {error && (
        <p className={`mt-1 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
);