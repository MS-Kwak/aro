'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/landing/scroll-reveal';

const TRUST = [
  { icon: Zap, text: '가입 후 5분이면 QR 생성' },
  { icon: ShieldCheck, text: '기본 기능 평생 무료' },
  { icon: Clock3, text: '하드웨어·앱 설치 불필요' },
] as const;

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <Image
            src="/logo-aro-full-white.svg"
            alt="아로(ARO)"
            width={140}
            height={48}
            className="mx-auto h-10 w-auto sm:h-12"
          />
          <h2 className="mt-7 font-brand text-3xl tracking-tight text-white sm:text-4xl">
            지금 QR 하나로
            <br />
            단골 관리를 시작하세요
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-lg text-body-lg text-white/70">
            광고를 보고 들어온 사장님이, 아무와도 통화하지 않고 5분
            안에 카운터에 QR을 붙일 수 있도록 만들었습니다.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ScrollStaggerItem className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/20 bg-white text-primary hover:bg-white/90 sm:w-auto"
              asChild
            >
              <Link href="/signup">
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollStaggerItem>
          <ScrollStaggerItem className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-white hover:bg-white/10 sm:w-auto"
              asChild
            >
              <Link href="/login">이미 계정이 있어요</Link>
            </Button>
          </ScrollStaggerItem>
        </ScrollStagger>

        <ScrollStagger className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {TRUST.map(({ icon: Icon, text }) => (
            <ScrollStaggerItem key={text}>
              <div className="flex items-center gap-2 text-caption text-white/60">
                <Icon
                  className="h-4 w-4 text-[#afb9dd]"
                  strokeWidth={1.75}
                />
                <span>{text}</span>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
