interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) => {
  const baseClasses = 'h-11 rounded-3xl px-4 py-3 text-sm font-medium text-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-400',
    secondary: 'bg-gray-900 text-white hover:bg-gray-700',
    outline: 'text-blue-600 hover:text-blue-400',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <svg
          className="animate-spin mr-2 h-4 w-4 text-white inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};