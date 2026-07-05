import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "아로(ARO) — 마음에 새기다",
  description:
    "동네 가게 단골 관리와 소모임을 연결하는 하이퍼로컬 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
