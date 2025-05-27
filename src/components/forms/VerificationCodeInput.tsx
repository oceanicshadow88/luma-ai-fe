import { forwardRef } from 'react';
import { Button } from '@components/buttons/Button';
import { Input } from './Input';

interface VerificationCodeInputProps extends Omit<React.ComponentProps<typeof Input>, 'addonElement'> {
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  buttonClassName?: string;
}

export const VerificationCodeInput = forwardRef<HTMLInputElement, VerificationCodeInputProps>(
  (
    {
      id,
      name,
      label,
      error,
      placeholder,
      onChange,
      onBlur,
      fieldClassName,
      labelClassName,
      inputClassName = 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-24',
      errorClassName,
      buttonClassName = '',
      buttonText,
      onButtonClick,
      isButtonDisabled = false,
    },
    ref
  ) => {
    return (
      <Input
        id={id}
        name={name}
        label={label}
        error={error}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        fieldClassName={fieldClassName}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        ref={ref}
        addonElement={() => (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onButtonClick} 
            disabled={isButtonDisabled}
            className={`absolute right-1 top-1/2 -translate-y-1/2 h-9 ${buttonClassName}`}
          >
            {buttonText}
          </Button>
        )}
      />
    );
  }
);