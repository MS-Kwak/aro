import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="text-label text-gray-700">
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            'flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-500',
            error
              ? 'border-error focus:ring-1 focus:ring-error'
              : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-caption text-error">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
