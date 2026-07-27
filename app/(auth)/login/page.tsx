'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AroLogo } from '@/components/brand/aro-logo';
import {
  signInWithKakao,
  signInWithEmail,
} from '@/lib/supabase/auth-actions';

const inputClassName =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  async function handleKakaoLogin() {
    setIsLoading(true);
    const result = await signInWithKakao();
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signInWithEmail(email, password);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex justify-center">
        <AroLogo href="/" size="md" priority />
      </div>

      <h1 className="text-heading-2 text-center text-gray-900">
        로그인
      </h1>
      <p className="mt-2 text-body text-center text-gray-500">
        아로(ARO)에 오신 것을 환영합니다
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-caption text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button
          onClick={handleKakaoLogin}
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

        {!showEmailForm ? (
          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            이메일로 로그인
          </button>
        ) : (
          <form
            onSubmit={handleEmailLogin}
            className="space-y-3 pt-2"
          >
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClassName}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClassName}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-caption text-gray-500">
        <Link href="/signup" className="hover:text-gray-700">
          회원가입
        </Link>
        <Link href="/login" className="hover:text-gray-700">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
