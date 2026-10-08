"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isEmailVerified } from "@/lib/auth-utils";

function AuthFinishInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("Finishing sign in...");

    useEffect(() => {
        const finish = async () => {
            const supabase = createClient();
            const next = searchParams.get("next") || "/dashboard";
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user && isEmailVerified(user)) {
                await fetch("/api/auth/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.user_metadata?.full_name || user.user_metadata?.name,
                        provider: user.app_metadata?.provider || "email",
                    }),
                }).catch(() => undefined);
                router.replace(next.startsWith("/") ? next : "/dashboard");
                router.refresh();
                return;
            }

            if (user) {
                await supabase.auth.signOut();
                setMessage("Please verify your email before logging in.");
                window.setTimeout(() => router.replace("/?error=email-unverified"), 1200);
                return;
            }

            setMessage("We couldn't complete sign in. Please try again.");
            window.setTimeout(() => router.replace("/?error=auth-callback"), 1200);
        };

        void finish();
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-6 text-center">
            <p className="text-[16px] text-[#243038]">{message}</p>
        </div>
    );
}

export default function AuthFinishPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-6 text-center">
                    <p className="text-[16px] text-[#243038]">Finishing sign in...</p>
                </div>
            }
        >
            <AuthFinishInner />
        </Suspense>
    );
}
