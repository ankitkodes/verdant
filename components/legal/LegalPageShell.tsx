import type { ReactNode } from "react";
import Link from "next/link";

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="legal_logo_light" x1="8" y1="8" x2="36" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6BC9A7" />
          <stop offset="1" stopColor="#45C9AA" />
        </linearGradient>
        <linearGradient id="legal_logo_dark" x1="36" y1="6" x2="36" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B806B" />
          <stop offset="1" stopColor="#075D4C" />
        </linearGradient>
      </defs>
      <path
        d="M8 10C8 7.8 9.8 6 12 6H22C24.5 6 26.7 7.4 27.8 9.6L40 34L32 50L10 10.5C9.2 9 8 10 8 10Z"
        fill="url(#legal_logo_light)"
      />
      <path
        d="M36 6H52C54.5 6 56 8.5 55 10.8L37 48C35.5 51 31.5 51 30 48L24 36L36 6Z"
        fill="url(#legal_logo_dark)"
      />
    </svg>
  );
}

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalPageShell({ title, lastUpdated, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f5f7f4]">
      <header className="border-b border-[#e4ebe7] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[920px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-[20px] font-bold tracking-[-0.055em] text-[#17242C]">
              Verdant
            </span>
          </Link>
          <Link
            href="/"
            className="text-[14px] font-medium text-[#617079] transition-colors hover:text-[#08755e]"
          >
            Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[920px] px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#08755e]">
          Legal
        </p>
        <h1 className="mt-3 text-[2rem] font-extrabold tracking-[-0.055em] text-[#101c24] sm:text-[2.5rem]">
          {title}
        </h1>
        <p className="mt-3 text-[14px] text-[#617079]">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.75] text-[#3d4c53] [&_h2]:text-[1.15rem] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-[#17242c] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-[#08755e] [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </article>

      <footer className="border-t border-[#e4ebe7] bg-white/60">
        <div className="mx-auto flex max-w-[920px] flex-col gap-3 px-5 py-8 text-[13px] text-[#899399] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Verdant. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-[#08755e]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#08755e]">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
