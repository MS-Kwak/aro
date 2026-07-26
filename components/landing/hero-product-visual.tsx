'use client';

import Image from 'next/image';
import {
  QrCode,
  MessageSquareHeart,
  Users,
  TrendingUp,
  Stamp,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Float } from '@/components/landing/scroll-reveal';

export function HeroProductVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Float amplitude={prefersReducedMotion ? 0 : 10} duration={5}>
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        {/* Soft atmosphere behind product — not glow stickers */}
        <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(129,146,193,0.28)_0%,transparent_65%)]" />

        <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#2a2f42]/95 text-white shadow-[0_24px_48px_-20px_rgba(42,47,66,0.55)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <Image
              src="/logo-aro-white.svg"
              alt=""
              width={20}
              height={16}
              className="h-4 w-auto opacity-90"
            />
            <p className="text-caption text-white/50">
              아로 대시보드
            </p>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-white/50">
                  오늘의 가게
                </p>
                <p className="mt-0.5 text-heading-3 text-white">
                  아로의 카페
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <QrCode
                  className="h-5 w-5 text-[#afb9dd]"
                  strokeWidth={1.75}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '오늘 방문', value: '12', icon: TrendingUp },
                { label: '총 단골', value: '86', icon: Users },
                {
                  label: '미답변',
                  value: '3',
                  icon: MessageSquareHeart,
                },
              ].map(({ label, value, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="rounded-xl bg-white/8 px-2.5 py-3"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.35 + i * 0.12,
                    duration: 0.5,
                  }}
                >
                  <Icon
                    className="h-3.5 w-3.5 text-[#8192c1]"
                    strokeWidth={2}
                  />
                  <p className="mt-2 font-brand text-xl tracking-tight text-white">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-white/45">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="rounded-xl bg-white/8 p-3.5"
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stamp
                    className="h-4 w-4 text-[#afb9dd]"
                    strokeWidth={2}
                  />
                  <p className="text-label text-white/80">
                    스탬프 진행
                  </p>
                </div>
                <p className="text-caption text-white/50">7 / 10</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[#8192c1]"
                  initial={
                    prefersReducedMotion
                      ? { width: '70%' }
                      : { width: 0 }
                  }
                  animate={{ width: '70%' }}
                  transition={{
                    delay: 1,
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
              <p className="mt-2 text-caption text-white/40">
                아메리카노 무료까지 3회 남았어요
              </p>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 rounded-xl border border-[#c97a1a]/35 bg-[#c97a1a]/15 px-3.5 py-3"
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: 16 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.15, duration: 0.55 }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c97a1a]/30">
                <Users
                  className="h-4 w-4 text-[#f0c48a]"
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-label text-[#f0c48a]">
                  이탈 위험 단골 8명
                </p>
                <p className="mt-0.5 truncate text-caption text-white/45">
                  21일 이상 미방문 · 쿠폰으로 불러오기
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Float>
  );
}
