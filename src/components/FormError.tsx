interface FormErrorProps {
    message?: string;
    className?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md"
            role="alert"
        >
            <span>{message}</span>
        </div>
    );
};