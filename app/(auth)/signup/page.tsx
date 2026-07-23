'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithKakao, signUpWithEmail } from '@/lib/supabase/auth-actions';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleKakaoSignup() {
    setIsLoading(true);
    const result = await signInWithKakao();
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    const result = await signUpWithEmail(email, password);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
    setIsLoading(false);
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex justify-center mb-6">
        <Image
          src="/logo-aro-full.svg"
          alt="ARO"
          width={120}
          height={40}
          priority
        />
      </div>

      <h1 className="text-heading-2 text-center text-gray-900">회원가입</h1>
      <p className="mt-2 text-body text-center text-gray-500">
        무료로 시작하고, 단골을 만들어보세요
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-caption text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-caption text-green-600">
          {success}
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button
          onClick={handleKakaoSignup}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-4 py-3 text-sm font-semibold text-[#191919] transition hover:bg-[#FDD835] disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1C4.58 1 1 3.79 1 7.21c0 2.17 1.44 4.08 3.6 5.17l-.92 3.38c-.08.28.24.51.49.35l4.01-2.67c.27.03.54.04.82.04 4.42 0 8-2.79 8-6.27C17 3.79 13.42 1 9 1z"
              fill="#191919"
            />
          </svg>
          카카오로 시작하기
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-caption">
            <span className="bg-white px-2 text-gray-400">또는</span>
          </div>
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
          <input
            type="password"
            placeholder="비밀번호 (6자 이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
          >
            {isLoading ? '처리 중...' : '이메일로 가입하기'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-caption text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="font-medium text-[var(--color-primary)] hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
