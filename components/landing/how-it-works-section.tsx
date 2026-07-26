'use client';

import {
  Store,
  QrCode,
  Smartphone,
  LayoutDashboard,
  ChevronRight,
} from 'lucide-react';
import {
  MotionIcon,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/landing/scroll-reveal';

const STEPS = [
  {
    icon: Store,
    step: '01',
    title: '가게 정보 입력',
    description:
      '상호명·업종·주소만 넣으면 끝. 복잡한 설정 없이 5분 안에 온보딩을 마칩니다.',
  },
  {
    icon: QrCode,
    step: '02',
    title: 'QR 출력·부착',
    description:
      '가게 전용 QR을 A4 PDF로 받아 카운터에 붙이세요. 하드웨어 설치는 필요 없습니다.',
  },
  {
    icon: Smartphone,
    step: '03',
    title: '손님이 스캔·적립',
    description:
      '손님은 앱 설치 없이 카메라로 스캔하고 전화번호만 입력하면 스탬프가 쌓입니다.',
  },
  {
    icon: LayoutDashboard,
    step: '04',
    title: '대시보드에서 확인',
    description:
      '방문·단골·이탈 위험·미답변 리뷰가 한곳에 모입니다. AI가 다음 행동을 제안합니다.',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-label font-medium tracking-wide text-accent">
            HOW IT WORKS
          </p>
          <h2 className="mt-3 font-brand text-3xl tracking-tight text-gray-900 sm:text-4xl">
            가입부터 QR 부착까지,
            <br />
            배울 것 없이 바로
          </h2>
          <p className="mt-4 text-body-lg text-gray-500">
            오프라인 영업 없이, 사장님이 스스로 끝내는 셀프서브
            온보딩. 목표는 단 하나 — 카운터에 QR이 붙는 순간입니다.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {STEPS.map(
            ({ icon: Icon, step, title, description }, index) => (
              <ScrollStaggerItem key={step} scale>
                <div className="relative h-full">
                  {index < STEPS.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-10 z-10 hidden h-5 w-5 text-primary/25 lg:block" />
                  )}
                  <div className="h-full border-t-2 border-primary/15 pt-6">
                    <MotionIcon delay={index * 0.08}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                        />
                      </div>
                    </MotionIcon>
                    <p className="mt-5 font-brand text-sm tracking-widest text-primary/40">
                      {step}
                    </p>
                    <h3 className="mt-2 text-heading-3 text-gray-900">
                      {title}
                    </h3>
                    <p className="mt-2 text-body leading-relaxed text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ),
          )}
        </ScrollStagger>
      </div>
    </section>
  );
}
