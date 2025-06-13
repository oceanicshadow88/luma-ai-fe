import { FieldValues, UseFormSetError, Path } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ApiError } from '@custom-types/ApiError';

function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function formatCooldownMessage(cooldownSeconds: number): string {
  return `Too many requests. Try again in ${cooldownSeconds} seconds.`;
}

function getErrorFieldAndMessage<TField extends string>(
  error: unknown,
  errorMap: Record<string, [TField, string]>,
  fallbackField: TField,
  fallbackMessage: string
): [TField, string] {
  if (!isApiError(error)) {
    return [fallbackField, fallbackMessage];
  }

  const errorKey = Object.keys(errorMap).find(key =>
    error.message.toLowerCase().includes(key.toLowerCase())
  );

  if (errorKey) {
    const [field, message] = errorMap[errorKey];

    if (error.meta?.cooldownSeconds) {
      return [field, formatCooldownMessage(error.meta.cooldownSeconds)];
    }

    return [field, message];
  }

  return [fallbackField, fallbackMessage];
}

export function handleApiError<TField extends string, TValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TValues>,
  errorMap: Record<string, [TField, string]>
): void {
  const [field, message] = getErrorFieldAndMessage(
    error,
    errorMap,
    'toast' as TField,
    'Something went wrong. Please try again later.'
  );

  if (field === 'toast') {
    toast.error(message);
  } else {
    setError(field as unknown as Path<TValues>, { message });
  }
}

export function handleApiErrorSimple(error: unknown): void {
  if (isApiError(error)) {
      toast.error(error.message);
  } else {
    toast.error('Something went wrong. Please try again later.');
  }
}


export function handleSilentError(error: unknown): ApiError | null {
  return isApiError(error) ? error : null;
}