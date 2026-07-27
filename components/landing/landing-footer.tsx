import Link from 'next/link';
import { Mail } from 'lucide-react';
import { AroLogo } from '@/components/brand/aro-logo';

const FOOTER_LINKS = [
  { href: '#how-it-works', label: '이용 방법' },
  { href: '#features', label: '기능' },
  { href: '#pricing', label: '요금' },
  { href: '/login', label: '로그인' },
] as const;

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-100/50 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <AroLogo href="/" size="md" />
          <p className="mt-4 text-body leading-relaxed text-gray-500">
            소상공인 AI 마케팅 비서.
            <br />
            사장님의 마음에, 손님의 마음에 아로새기다.
          </p>
          <a
            href="mailto:hello@aro.example"
            className="mt-4 inline-flex items-center gap-2 text-caption text-gray-500 transition-colors hover:text-primary"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            문의하기
          </a>
        </div>

        <div>
          <p className="text-label font-semibold text-gray-900">
            바로가기
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body text-gray-500 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-gray-200/80 pt-6">
        <p className="text-caption text-gray-400">
          © 2026 ARO. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
