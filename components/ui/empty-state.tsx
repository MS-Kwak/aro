import { type LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mt-4 text-heading-3 text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-body text-gray-500">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="accent" className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
