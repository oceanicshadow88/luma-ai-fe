import { forwardRef, InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    inputClassName?: string; 
}

export const PasswordInput = forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ label, error, id, ...rest }, ref) => {
    const [show, setShow] = useState(false);
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    ref={ref}
                    type={show ? "text" : "password"}
                    className={`w-full px-3 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                    {...rest}
                />
                <button
                    type="button"
                    className="absolute top-0 right-0 p-2 text-gray-500"
                    onClick={() => setShow((s) => !s)}
                >
                    {show ? (
                        <EyeOffIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});
PasswordInput.displayName = "PasswordInput";
