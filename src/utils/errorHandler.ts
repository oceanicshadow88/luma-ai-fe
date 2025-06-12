import { FieldValues, UseFormSetError, Path } from 'react-hook-form';
import { toast } from 'react-hot-toast';

function isApiError(error: unknown): error is { 
  message: string; 
  meta?: { cooldownSeconds?: number; [key: string]: unknown } 
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function getErrorFieldAndMessage<TField extends string>(
  error: unknown,
  errorMap: Record<string, [TField, string]>,
  fallbackField: TField,
  fallbackMessage: string
): [TField, string] {
  if (isApiError(error)) {
    const errorKey = Object.keys(errorMap).find(key => 
      error.message.toLowerCase().includes(key.toLowerCase())
    );
    
    if (errorKey) {
      const [field, message] = errorMap[errorKey];
      
      if (field === 'toast' && error.meta?.cooldownSeconds) {
        const cooldownMessage = `Too many requests. Try again in ${error.meta.cooldownSeconds} seconds.`;
        return [field, cooldownMessage];
      }
      
      return [field, message];
    }
  }
  return [fallbackField, fallbackMessage];
}

export function handleAdvancedFormError<TField extends string, TValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TValues>,
  errorMap: Record<string, [TField, string]>,
  fallbackField: TField,
  fallbackMessage: string
): boolean {
  const [field, message] = getErrorFieldAndMessage(
    error, 
    errorMap, 
    fallbackField, 
    fallbackMessage
  );

  if (field === 'toast') {
    toast.error(message);
    return true; 
  } else {
    setError(field as unknown as Path<TValues>, { message });
    return false; 
  }
}

export function handleToastError(
  error: unknown,
  errorMap: Record<string, [string, string]>,
  fallbackMessage: string = 'Something went wrong. Please try again.'
): void {
  const [, message] = getErrorFieldAndMessage(
    error,
    errorMap,
    'toast',
    fallbackMessage
  );
  
  if (isApiError(error) && error.meta?.cooldownSeconds) {
    toast.error(`Too many requests. Try again in ${error.meta.cooldownSeconds} seconds.`);
    return;
  }
  
  toast.error(message);
}

export function handleSilentError(error: unknown): { 
  message: string; 
  meta?: { cooldownSeconds?: number; [key: string]: unknown } 
} | null {
  return isApiError(error) ? error : null;
}