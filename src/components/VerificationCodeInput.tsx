import { forwardRef,InputHTMLAttributes, } from "react";
import { Button } from "@components/Button";

interface VerificationCodeInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    buttonText: string;
    onButtonClick: () => void;
    isButtonDisabled?: boolean;
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
            ...rest
        },
        ref
    ) => (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="flex gap-2">
                <input
                    id={id}
                    ref={ref}
                    className={`w-full px-3 py-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"
                        } text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                    {...rest}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={onButtonClick}
                    disabled={isButtonDisabled}
                >
                    {buttonText}
                </Button>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
);
VerificationCodeInput.displayName = "VerificationCodeInput";
