import { AxiosError } from 'axios';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import { ApiError } from '@/types/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setHookFormApiErrors<T extends FieldValues>(
  error: Error,
  setError: UseFormSetError<T>,
) {
  if (!(error instanceof AxiosError)) {
    return;
  }
  const { status, response } = error;
  if (status === 422 && response?.data) {
    const data: ApiError = response.data;
    if (typeof data.details === 'object') {
      for (const key in data.details) {
        setError(key as any, {
          message: data.details[key][0],
          type: 'api_error',
        });
      }
    }
  }
}
