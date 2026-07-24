export default function StampCompletePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-emerald-50 to-white px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-900">
          적립 완료!
        </h1>
        {/* TODO: Screen 18 구현 - 스탬프 프로그레스, 축하, 카카오 공유 */}
      </div>
    </div>
  );
}
