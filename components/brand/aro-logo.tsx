import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type AroLogoProps = {
  href?: string | null;
  /** color: 라이트 배경 / white: 다크·네이비 배경 */
  variant?: 'color' | 'white';
  /** 「아로」 워드마크 — 히어로 등 브랜드 시그널이 꼭 필요할 때만 true */
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  priority?: boolean;
};

const SIZE = {
  sm: { img: 'h-6', word: 'text-base', width: 28, height: 22 },
  md: { img: 'h-7', word: 'text-[1.125rem]', width: 32, height: 26 },
  lg: {
    img: 'h-9 sm:h-11',
    word: 'text-xl sm:text-2xl',
    width: 44,
    height: 36,
  },
} as const;

export function AroLogo({
  href = '/',
  variant = 'color',
  showWordmark = false,
  size = 'md',
  className,
  priority = false,
}: AroLogoProps) {
  const s = SIZE[size];
  const src =
    variant === 'white' ? '/logo-aro-white.svg' : '/logo-aro.svg';
  const wordClass =
    variant === 'white' ? 'text-white' : 'text-primary';

  const mark = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <Image
        src={src}
        alt={showWordmark ? '' : '아로(ARO)'}
        width={s.width}
        height={s.height}
        priority={priority}
        className={cn('w-auto', s.img)}
      />
      {showWordmark && (
        <span
          className={cn(
            'font-extrabold tracking-tight',
            s.word,
            wordClass,
          )}
        >
          아로
        </span>
      )}
    </span>
  );

  if (href === null) return mark;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="아로(ARO)"
    >
      {mark}
    </Link>
  );
}
