'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/landing/scroll-reveal';
import { HeroProductVisual } from '@/components/landing/hero-product-visual';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed atmosphere */}
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#e8ebf4_0%,#f7f8fc_42%,#ffffff_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(57,64,99,0.12) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-0 h-112 w-md bg-[radial-gradient(circle,rgba(129,146,193,0.22)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-88 w-88 bg-[radial-gradient(circle,rgba(74,108,247,0.12)_0%,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <ScrollReveal>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-aro-full.svg"
                alt="아로(ARO)"
                width={120}
                height={40}
                priority
                className="h-9 w-auto sm:h-11"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="mt-7 font-brand text-[2.35rem] leading-[1.12] tracking-tight text-gray-900 sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem]">
              사장님의 마음에,
              <br />
              손님의 마음에
              <br />
              <span className="text-primary">아로새기다</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="mt-5 max-w-md text-body-lg text-gray-600 sm:text-[1.0625rem] sm:leading-7">
              리뷰에 답하고, 단골을 기억하고, 떠난 손님을 다시
              불러오는 소상공인 AI 마케팅 비서.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/signup">
                  무료로 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-primary/15 bg-white/70 sm:w-auto"
                asChild
              >
                <Link href="#how-it-works">
                  <Sparkles className="h-4 w-4 text-primary" />
                  3분이면 이해되는 구조
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-caption text-gray-500">
              카카오 30초 가입 · QR 붙이면 바로 시작 · 기본 기능 무료
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={0.2}
          direction="left"
          scale
          className="lg:justify-self-end"
        >
          <HeroProductVisual />
        </ScrollReveal>
      </div>
    </section>
  );
}
