'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  QrCode,
  MessageSquare,
  Megaphone,
  CreditCard,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/customers', label: '단골 목록', icon: Users },
  { href: '/qr', label: 'QR · 쿠폰', icon: QrCode },
  { href: '/reviews', label: '리뷰 관리', icon: MessageSquare },
  { href: '/marketing', label: '마케팅', icon: Megaphone },
  { href: '/subscription', label: '구독', icon: CreditCard },
  { href: '/settings', label: '설정', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard">
          <Image
            src="/logo-aro-full.svg"
            alt="ARO"
            width={100}
            height={32}
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
