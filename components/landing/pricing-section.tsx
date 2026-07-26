'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  Sparkles,
  QrCode,
  MessageSquareText,
  Users,
  Send,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverLift,
  MotionIcon,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/landing/scroll-reveal';

const FREE_ITEMS = [
  { icon: QrCode, text: 'QR 스탬프 · 쿠폰 발급' },
  { icon: Users, text: '단골 대시보드 · 이탈 목록 조회' },
  { icon: MessageSquareText, text: 'AI 리뷰 답변 초안 · 수동 등록' },
] as const;

const PREMIUM_ITEMS = [
  { icon: Send, text: '이탈 단골 알림톡 자동 발송' },
  { icon: BarChart3, text: '발송·재방문 리포트' },
  { icon: Sparkles, text: 'AI 이탈 분석 고도화' },
] as const;

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-label font-medium tracking-wide text-accent">
            PRICING
          </p>
          <h2 className="mt-3 font-brand text-3xl tracking-tight text-gray-900 sm:text-4xl">
            무료로 쌓고,
            <br />
            가치가 보이면 유료로
          </h2>
          <p className="mt-4 text-body-lg text-gray-500">
            무료 스탬프는 미끼가 아니라 데이터 축적 장치입니다.
            &lsquo;3주째 안 온 단골&rsquo;이 숫자로 보이는 순간이 전환
            포인트예요.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid gap-6 lg:grid-cols-2">
          <ScrollStaggerItem scale>
            <HoverLift className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-100/40 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label font-semibold text-success">
                      FREE
                    </p>
                    <h3 className="mt-1 font-brand text-2xl text-gray-900">
                      무료
                    </h3>
                  </div>
                  <MotionIcon>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary">
                      <QrCode
                        className="h-5 w-5"
                        strokeWidth={1.75}
                      />
                    </div>
                  </MotionIcon>
                </div>
                <p className="mt-2 font-brand text-4xl tracking-tight text-gray-900">
                  ₩0
                  <span className="ml-1 text-base font-sans font-normal text-gray-500">
                    /월
                  </span>
                </p>
                <p className="mt-3 text-body text-gray-500">
                  QR을 붙이고 단골·리뷰를 쌓는 기본 기능 전부.
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {FREE_ITEMS.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
                        <Icon
                          className="h-4 w-4"
                          strokeWidth={1.75}
                        />
                      </div>
                      <span className="text-body text-gray-700">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-8 w-full bg-white"
                  asChild
                >
                  <Link href="/signup">무료로 시작하기</Link>
                </Button>
              </div>
            </HoverLift>
          </ScrollStaggerItem>

          <ScrollStaggerItem scale>
            <HoverLift className="h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-primary p-7 text-white sm:p-8">
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-label font-semibold text-[#afb9dd]">
                      PREMIUM
                    </p>
                    <h3 className="mt-1 font-brand text-2xl">
                      프리미엄
                    </h3>
                  </div>
                  <MotionIcon>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Image
                        src="/logo-aro-white.svg"
                        alt=""
                        width={24}
                        height={20}
                        className="h-5 w-auto"
                      />
                    </div>
                  </MotionIcon>
                </div>
                <p className="relative mt-2 font-brand text-4xl tracking-tight">
                  ₩40,000
                  <span className="ml-1 text-base font-sans font-normal text-white/60">
                    /월
                  </span>
                </p>
                <p className="relative mt-3 text-body text-white/70">
                  AI가 떠난 단골에게 쿠폰을 보내고, 재방문을 숫자로
                  보여줍니다.
                </p>
                <ul className="relative mt-6 flex-1 space-y-3">
                  {PREMIUM_ITEMS.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <Icon
                          className="h-4 w-4 text-[#afb9dd]"
                          strokeWidth={1.75}
                        />
                      </div>
                      <span className="text-body text-white/90">
                        {text}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 pt-1 text-white/55">
                    <Check
                      className="h-4 w-4 shrink-0"
                      strokeWidth={2.25}
                    />
                    <span className="text-caption">
                      무료 기능 전부 포함
                    </span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  size="lg"
                  className="relative mt-8 w-full border-white/20 bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link href="/signup">7일 체험으로 시작</Link>
                </Button>
              </div>
            </HoverLift>
          </ScrollStaggerItem>
        </ScrollStagger>
      </div>
    </section>
  );
}
