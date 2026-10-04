import type { ReactNode } from "react";
import Link from "next/link";

function LogoMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 223 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Left arm — light mint */}
      <path
        d="M 26.3,29.2 Q 22.0,18.0 34.0,18.2 L 66.0,18.8 Q 78.0,19.0 82.8,30.0 L 137.2,154.0 Q 142.0,165.0 130.0,164.4 L 90.0,162.6 Q 78.0,162.0 73.7,150.8 Z"
        fill="#83DDC5"
      />
      {/* Right arm — dark teal */}
      <path
        d="M 144.2,29.6 Q 150.0,19.0 162.0,19.6 L 198.0,21.4 Q 210.0,22.0 205.2,33.0 L 160.8,134.0 Q 156.0,145.0 150.2,134.5 L 124.8,88.5 Q 119.0,78.0 124.6,67.4 Z"
        fill="#0B705F"
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
