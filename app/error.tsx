'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f7f4] px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle className="h-10 w-10" />
        </div>
        
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#101c24]">
          Oops! Something went wrong
        </h2>
        
        <p className="mt-4 text-base leading-relaxed text-[#617079]">
          We apologize for the inconvenience. An unexpected error occurred while processing your request. 
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-full bg-[#08755e] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#065c4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08755e]/35"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full border border-[#dce5e0] bg-white px-6 py-3.5 text-sm font-semibold text-[#243038] transition-all hover:bg-[#f7faf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08755e]/35"
          >
            <Home className="h-4 w-4" />
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
