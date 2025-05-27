import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from './Input';

interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type'> {
  toggleButtonClassName?: string;
  iconClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
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
      inputClassName = 'border focus:outline-none rounded-3xl text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px] pr-10',
      errorClassName,
      toggleButtonClassName = '',
      iconClassName = '',
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        id={id}
        name={name}
        label={label}
        error={error}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        type={show ? 'text' : 'password'}
        fieldClassName={fieldClassName}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        ref={ref}
        addonElement={() => (
          <button
            type="button"
            className={`absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-gray-500 cursor-pointer ${toggleButtonClassName}`}
            onClick={() => setShow((s) => !s)}
          >
            {show ? (
              <EyeIcon className={`h-5 w-5 ${iconClassName}`} />
            ) : (
              <EyeOffIcon className={`h-5 w-5 ${iconClassName}`} />
            )}
          </button>
        )}
      />
    );
  }
);
