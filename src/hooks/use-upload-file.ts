import * as React from 'react';
import { z } from 'zod';

import { toast } from 'sonner';

import { env } from '@/config/env';
import axios from 'axios';

interface UseUploadFileProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
  headers?: Record<string, string>;
  onUploadBegin?: (fileName: string) => void;
  onUploadProgress?: (progress: { progress: number }) => void;
  skipPolling?: boolean;
}

interface UploadFileResponse {
  success: boolean;
  data: {
    key: string;
    url: string;
    name: string;
  };
}

interface UploadedFile {
  key: string;
  url: string;
  name: string;
  size: number;
  type: string;
}

export function useUploadFile(props: UseUploadFileProps) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadFile(file: File) {
    setIsUploading(true);
    props.onUploadBegin?.(file.name);
    setUploadingFile(file);

    const form = new FormData();
    form.append('file', file);

    try {
      const { data } = await axios.post<UploadFileResponse>(
        `${env.REST_API_URL}/file/upload/`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            if (!progressEvent.total) {
              return;
            }
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setProgress(progress);
            props.onUploadProgress?.({ progress });
          },
        },
      );

      const uploadedFile = {
        key: data.data.key,
        url: `${env.BACKEND_URL}${data.data.url}`,
        name: data.data.name,
        size: file.size,
        type: file.type,
      };

      setUploadedFile(uploadedFile);
      props.onUploadComplete?.(uploadedFile);

      return uploadedFile;
    } catch (error) {
      props.onUploadError?.(error);
      throw error;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadFile,
    uploadedFile,
    uploadingFile,
  };
}

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message;
    });

    return errors.join('\n');
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  return toast.error(errorMessage);
}
