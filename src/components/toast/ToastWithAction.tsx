import toast from 'react-hot-toast';
import { TOAST_STYLE } from '@styles/toastStyles';

interface ShowToastWithActionOptions {
  onAction?: () => void;
  actionText?: string;
  duration?: number;
  style?: React.CSSProperties;
  buttonClassName?: string;
}

const ToastContent = ({
  message,
  onAction,
  actionText,
  toastId,
  buttonClassName,
  style
}: {
  message: string;
  onAction?: () => void;
  actionText?: string;
  toastId: string;
  buttonClassName?: string;
  style?: React.CSSProperties;
}) => {
  const handleAction = () => {
    toast.dismiss(toastId);
    onAction?.();
  };

  return (
    <div
      className="flex flex-col items-center space-y-4"
      style={{ ...TOAST_STYLE, ...style }} 
    >
      <span>{message}</span>
      {onAction && actionText && (
        <button
          onClick={handleAction}
          className={
            buttonClassName ||
            "px-2.5 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-all duration-200 border border-white/40 hover:border-white/60 backdrop-blur-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95 transform"
          }
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const showToastWithAction = (
  message: string,
  options?: ShowToastWithActionOptions
) => {
  const { onAction, actionText, duration = 3000, style, buttonClassName } = options || {};

  return toast.custom(
    (t) => (
      <ToastContent
        message={message}
        onAction={onAction}
        actionText={actionText}
        toastId={t.id}
        buttonClassName={buttonClassName}
        style={style} 
      />
    ),
    { duration }
  );
};
