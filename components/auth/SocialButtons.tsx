"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

const socialProviders = [
    { id: "google", label: "Google", icon: <><path d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.32 2.98-7.35Z" fill="#4285F4" /><path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z" fill="#34A853" /><path d="M6.41 13.91A6 6 0 0 1 6.1 12c0-.66.11-1.3.31-1.91V7.5H3.06A10 10 0 0 0 2 12c0 1.62.39 3.15 1.06 4.5l3.35-2.59Z" fill="#FBBC05" /><path d="M12 5.97c1.47 0 2.78.5 3.82 1.52l2.87-2.87C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.94 5.5l3.35 2.59C7.2 7.73 9.4 5.97 12 5.97Z" fill="#EA4335" /></> },
    { id: "github", label: "GitHub", icon: <><path fill="currentColor" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.4 3.02 1.7.1-.73.4-1.23.72-1.52-2.5-.28-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.16 3.08-1.16.61 1.55.23 2.7.12 2.99.72.79 1.15 1.8 1.15 3.03 0 4.34-2.63 5.3-5.14 5.57.41.36.77 1.04.77 2.1v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" /></> },
    { id: "linkedin_oidc", label: "LinkedIn", icon: <><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" /></> },
];

interface SocialButtonsProps {
    mode: "login" | "signup";
    onError: (message: string) => void;
}

export function SocialButtons({ mode, onError }: SocialButtonsProps) {
    const { toast } = useToast();
    const [pendingProvider, setPendingProvider] = useState<string | null>(null);

    const handleSignIn = async (provider: string) => {
        setPendingProvider(provider);
        onError("");
        toast({ message: `Redirecting to ${socialProviders.find(p => p.id === provider)?.label || provider}...`, type: "info" });
        const supabase = createClient();
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider as "google" | "github" | "linkedin_oidc",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch {
            onError("We couldn't connect to that provider. Please try again.");
            toast({ message: "We couldn't connect to that provider.", type: "error" });
            setPendingProvider(null);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            {socialProviders.map((provider) => {
                const pending = pendingProvider === provider.id;
                return (
                    <button
                        key={provider.id}
                        type="button"
                        aria-label={`${mode === "login" ? "Continue with" : "Sign up with"} ${provider.label}`}
                        disabled={Boolean(pendingProvider)}
                        onClick={() => handleSignIn(provider.id)}
                        className="flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-[12px] border border-[#dce5e0] bg-white px-1.5 text-[12px] font-medium text-[#243038] transition duration-200 hover:border-[#c8e4d8] hover:bg-[#f7faf8] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#08755e]/15 disabled:cursor-wait disabled:opacity-60 sm:h-12 sm:gap-2 sm:px-2 sm:text-[13px]"
                    >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                            {pending ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#dce5e0] border-t-[#08755e]" />
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5">
                                    {provider.icon}
                                </svg>
                            )}
                        </span>
                        <span className="truncate">{provider.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
