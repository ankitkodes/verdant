import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";
import { isEmailVerified } from "@/lib/auth-utils";
import { syncUserToDatabase } from "@/lib/sync-user";

function safeNextPath(next: string | null) {
    if (!next || !next.startsWith("/") || next.startsWith("//")) return "/dashboard";
    return next;
}

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = safeNextPath(searchParams.get("next"));
    const oauthError = searchParams.get("error");

    if (oauthError) {
        return NextResponse.redirect(`${origin}/?error=auth-callback`);
    }

    if (!code && !tokenHash) {
        return NextResponse.redirect(`${origin}/auth/finish?next=${encodeURIComponent(next)}`);
    }

    const redirect = NextResponse.redirect(`${origin}${next}`);
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        redirect.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const { error } = code
        ? await supabase.auth.exchangeCodeForSession(code)
        : await supabase.auth.verifyOtp({
            type: type ?? "signup",
            token_hash: tokenHash!,
        });

    if (error) {
        return NextResponse.redirect(`${origin}/?error=auth-callback`);
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isEmailVerified(user)) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/?error=email-unverified`);
    }

    await syncUserToDatabase(user, {
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        provider: user.app_metadata?.provider || "email",
    });

    return redirect;
}
