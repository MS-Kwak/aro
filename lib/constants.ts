export const STAMP_GOAL_DEFAULT = 10;
export const COUPON_EXPIRY_DAYS_DEFAULT = 30;
export const CHURN_THRESHOLD_DAYS = 21;

export const BUSINESS_TYPES = [
  '카페',
  '음식점',
  '베이커리',
  '미용실',
  '네일샵',
  '의류매장',
  '편의점',
  '주점',
  '기타',
] as const;

export const PLAN_FREE = 'free' as const;
export const PLAN_PREMIUM = 'premium' as const;

export const FREE_AI_REPLIES_PER_MONTH = 10;

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  onboarding: '/onboarding',
  dashboard: '/dashboard',
  customers: '/customers',
  qr: '/qr',
  reviews: '/reviews',
  marketing: '/marketing',
  settings: '/settings',
  subscription: '/subscription',
} as const;
