interface Props {
  params: Promise<{ storeId: string }>;
}

export default async function ScanLandingPage({ params }: Props) {
  const { storeId } = await params;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-emerald-50 to-white px-4 py-8">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-900">방문 적립</h1>
        <p className="mt-2 text-sm text-gray-500">
          스탬프를 모으고 리워드를 받으세요!
        </p>
        {/* TODO: Screen 16 구현 - 가게 정보, 리워드 안내, 적립하기 CTA */}
        <p className="mt-4 text-xs text-gray-400">Store: {storeId}</p>
      </div>
    </div>
  );
}
