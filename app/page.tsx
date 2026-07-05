import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 px-8 py-32">
        <Image
          src="/logo-aro-full.svg"
          alt="아로(ARO) 로고"
          width={180}
          height={60}
          priority
          className="dark:hidden"
        />
        <Image
          src="/logo-aro-full-white.svg"
          alt="아로(ARO) 로고"
          width={180}
          height={60}
          priority
          className="hidden dark:block"
        />

        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          곧 찾아옵니다
        </p>
      </main>
    </div>
  );
}
