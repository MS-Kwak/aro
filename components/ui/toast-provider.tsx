'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          padding: '0.75rem 1rem',
        },
        classNames: {
          success: 'border-green-200 bg-green-50 text-green-800',
          error: 'border-red-200 bg-red-50 text-red-800',
          warning: 'border-amber-200 bg-amber-50 text-amber-800',
          info: 'border-blue-200 bg-blue-50 text-blue-800',
        },
      }}
      richColors
      closeButton
    />
  );
}
