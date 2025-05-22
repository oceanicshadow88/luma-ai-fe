import { forwardRef } from 'react';
import { Button } from '@components/Button';

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
  flexContainerClassName?: string; 
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
      flexContainerClassName = '',
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
    <div className={`w-full ${fieldClassName} group`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`text-left block text-sm text-gray-700 mb-1 group-focus-within:text-blue-600 ${labelClassName} ${
            error ? 'text-red-600' : ''
          }`}
        >
          {label}
        </label>
      )}
      <div className={`flex gap-2 ${flexContainerClassName}`}>
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
          className={`rounded-3xl w-full h-11 px-4 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } text-gray-900 placeholder-gray-500 focus:placeholder-transparent focus:outline-none focus:border-blue-600 ${inputClassName}`}
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
        <p className={`text-left mt-1 text-sm text-red-600 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  )
);