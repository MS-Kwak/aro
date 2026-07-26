'use client';

import {
  QrCode,
  MessageSquareText,
  UserSearch,
  LayoutDashboard,
  Gift,
  BellRing,
  Check,
  X,
} from 'lucide-react';
import {
  HoverLift,
  MotionIcon,
  ScrollReveal,
  ScrollStagger,
  ScrollStaggerItem,
} from '@/components/landing/scroll-reveal';

const FEATURES = [
  {
    icon: QrCode,
    title: 'QR 스탬프 단골 관리',
    badge: '무료',
    description:
      '손님이 QR만 찍으면 전화번호로 스탬프가 적립됩니다. 종이 쿠폰 관리, 앱 설치 유도 없이 단골 데이터가 자동으로 쌓여요.',
    points: [
      '가게별 고유 QR · A4 PDF 즉시 출력',
      '앱 설치 없는 손님용 웹 적립',
      'N회 적립 시 쿠폰 자동 발급',
    ],
    tone: 'primary' as const,
  },
  {
    icon: MessageSquareText,
    title: 'AI 리뷰 자동 답변',
    badge: '무료',
    description:
      '네이버·카카오맵·구글 리뷰를 모아 AI가 감정 분석하고 답변 초안을 만듭니다. 사장님은 확인하고 원클릭으로 등록하면 됩니다.',
    points: [
      '긍정·부정·중립 자동 분류',
      '가게 톤에 맞춘 답변 초안',
      '월 10회 다시 생성 · 인라인 편집',
    ],
    tone: 'accent' as const,
  },
  {
    icon: UserSearch,
    title: '이탈 단골 감지 & 쿠폰',
    badge: '프리미엄',
    description:
      '마지막 방문 후 21일이 지나면 AI가 이탈 위험으로 표시합니다. 유료에서는 알림톡 쿠폰이 자동 발송되어 재방문을 만듭니다.',
    points: [
      '이탈 목록 조회는 무료로 확인',
      '알림톡 자동 발송은 프리미엄',
      '발송·오픈·재방문 리포트 제공',
    ],
    tone: 'warning' as const,
  },
] as const;

const DASHBOARD_ITEMS = [
  {
    icon: LayoutDashboard,
    title: '한눈에 보는 홈',
    text: '오늘 방문 · 총 단골 · 미답변 리뷰 · 이탈 위험',
  },
  {
    icon: Gift,
    title: '쿠폰·리워드 설정',
    text: '스탬프 기준, 리워드 내용, 유효기간을 직접 조정',
  },
  {
    icon: BellRing,
    title: '유료 전환이 자연스러운 UX',
    text: '이탈 인원은 보여주되, 자동 발송만 잠가 가치를 증명',
  },
] as const;

const COMPARE = [
  {
    label: '리뷰 관리',
    before: '매일 직접 확인, 손으로 답변',
    after: 'AI 초안 → 원클릭 등록',
  },
  {
    label: '단골 관리',
    before: '종이 쿠폰 · 감에 의존',
    after: 'QR 스탬프 · 대시보드',
  },
  {
    label: '이탈 고객',
    before: '누가 안 왔는지조차 모름',
    after: 'AI 감지 → 쿠폰 발송',
  },
  {
    label: '시작 비용',
    before: '태블릿·POS 하드웨어',
    after: 'QR 프린트 한 장',
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f4f6_0%,#ffffff_28%,#ffffff_100%)] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <p className="text-label font-medium tracking-wide text-accent">
            FEATURES
          </p>
          <h2 className="mt-3 font-brand text-3xl tracking-tight text-gray-900 sm:text-4xl">
            파편화된 도구 대신,
            <br />
            AI 하나가 전부 처리
          </h2>
          <p className="mt-4 text-body-lg text-gray-500">
            단골 관리만, 리뷰 답변만, 알림톡만 — 따로 가입할 필요
            없습니다. 아로는 세 가지를 하나의 흐름으로 묶습니다.
          </p>
        </ScrollReveal>

        <div className="mt-14 space-y-8">
          {FEATURES.map(
            (
              { icon: Icon, title, badge, description, points, tone },
              index,
            ) => {
              const iconBg =
                tone === 'primary'
                  ? 'bg-primary text-white'
                  : tone === 'accent'
                    ? 'bg-accent text-white'
                    : 'bg-[#c97a1a] text-white';
              const badgeClass =
                badge === '무료'
                  ? 'bg-success/10 text-success'
                  : 'bg-[#c97a1a]/10 text-[#c97a1a]';

              return (
                <ScrollReveal
                  key={title}
                  delay={index * 0.05}
                  direction={index % 2 === 0 ? 'right' : 'left'}
                >
                  <HoverLift>
                    <div className="grid items-center gap-6 rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
                      <div>
                        <div className="flex items-center gap-3">
                          <MotionIcon delay={0.05}>
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                            >
                              <Icon
                                className="h-5 w-5"
                                strokeWidth={1.75}
                              />
                            </div>
                          </MotionIcon>
                          <span
                            className={`rounded-md px-2.5 py-1 text-caption font-semibold ${badgeClass}`}
                          >
                            {badge}
                          </span>
                        </div>
                        <h3 className="mt-5 text-heading-2 text-gray-900">
                          {title}
                        </h3>
                        <p className="mt-3 text-body-lg leading-relaxed text-gray-500">
                          {description}
                        </p>
                      </div>
                      <ul className="space-y-3">
                        {points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 rounded-xl bg-gray-100/80 px-4 py-3"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                              strokeWidth={2.5}
                            />
                            <span className="text-body text-gray-700">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </HoverLift>
                </ScrollReveal>
              );
            },
          )}
        </div>

        {/* Dashboard highlights */}
        <ScrollStagger className="mt-16 grid gap-4 sm:grid-cols-3">
          {DASHBOARD_ITEMS.map(({ icon: Icon, title, text }) => (
            <ScrollStaggerItem key={title} scale>
              <div className="h-full rounded-2xl border border-primary/10 bg-primary-light/50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-heading-3 text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-body text-gray-500">{text}</p>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Comparison */}
        <ScrollReveal className="mt-20" scale>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
              <p className="text-label font-medium tracking-wide text-accent">
                COMPARE
              </p>
              <h3 className="mt-2 font-brand text-2xl tracking-tight text-gray-900 sm:text-3xl">
                기존 방식 vs 아로
              </h3>
              <p className="mt-2 text-body text-gray-500">
                사장님이 원하는 건 도구가 아니라, 알아서 돌아가는
                직원입니다.
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {COMPARE.map(({ label, before, after }, i) => (
                <ScrollReveal key={label} delay={0.05 * i}>
                  <div className="grid gap-4 px-6 py-5 sm:grid-cols-[140px_1fr_1fr] sm:items-center sm:gap-6 sm:px-8">
                    <p className="text-label font-semibold text-primary">
                      {label}
                    </p>
                    <div className="flex items-start gap-2.5 text-body text-gray-500">
                      <X
                        className="mt-0.5 h-4 w-4 shrink-0 text-error/70"
                        strokeWidth={2.25}
                      />
                      <span>{before}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-body font-medium text-gray-800">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-success"
                        strokeWidth={2.5}
                      />
                      <span>{after}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
