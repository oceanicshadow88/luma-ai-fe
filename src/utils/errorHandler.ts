import { FieldValues, UseFormSetError, Path } from 'react-hook-form';

function isApiError(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function getErrorField<TField extends string>(
  error: unknown,
  errorMap: Record<string, TField>,
  fallbackField: TField
): TField {
  if (isApiError(error)) {
    return errorMap[error.message] || fallbackField;
  }
  return fallbackField;
}

export function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error?.message?.includes('Unhandled Error')) {
    return 'Server Error';
  }
  if (isApiError(error)) {
    return error.message;
  }
  return fallbackMessage;
}

export function handleFormError<TField extends string, TValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TValues>,
  errorMap: Record<string, TField>,
  fallbackField: TField,
  fallbackMessage: string
): string {
  const field = getErrorField(error, errorMap, fallbackField);
  const message = getErrorMessage(error, fallbackMessage);

  setError(field as unknown as Path<TValues>, { message });
  return message;
}
