import { forwardRef } from 'react';
import { Button } from '@components/Button';
import { Input } from './Input';

interface VerificationCodeInputProps extends Omit<React.ComponentProps<typeof Input>, 'renderRightElement'> {
  buttonText: string;
  onButtonClick: () => void;
  isButtonDisabled?: boolean;
  buttonClassName?: string;
}

export const VerificationCodeInput = forwardRef<HTMLInputElement, VerificationCodeInputProps>(
  (
    {
      inputClassName = 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-24',
      buttonClassName = '',
      buttonText,
      onButtonClick,
      isButtonDisabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <Input
        {...props}
        ref={ref}
        inputClassName={inputClassName}
        renderRightElement={() => (
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