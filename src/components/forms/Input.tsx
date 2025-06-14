import { forwardRef } from 'react';

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  isDisabled?: boolean;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  addonElement?: () => React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = 'text',
      placeholder,
      label,
      error,
      name,
      onChange,
      onBlur,
      fieldClassName = 'mb-6',
      labelClassName = 'text-left block text-gray-600 mb-1',
      inputClassName = 'border focus:outline-none focus:placeholder-transparent text-left border-gray-300 focus:border-blue-600 focus:ring-0 px-4 h-11 leading-normal pl-[20px]',
      errorClassName = '',
      addonElement,
      isDisabled = false,
    },
    ref
  ) => (
    <div className={`w-full ${fieldClassName} group`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm group-focus-within:text-blue-600 ${labelClassName} ${
            error ? 'text-red-600' : ''
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={(event) => {
            if (!onBlur) return;
            onBlur(event);
          }}
          disabled={isDisabled}
          className={`w-full rounded-3xl ${inputClassName} ${error ? 'border-red-600' : ''}`}
          style={{
            backgroundColor: isDisabled ? '#dbdbdb' : undefined,
          }}
        />
        {addonElement?.()}
      </div>
      {error && <p className={`text-left mt-1 text-sm text-red-600 ${errorClassName}`}>{error}</p>}
    </div>
  )
);
