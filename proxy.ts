import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isEmailVerified } from "@/lib/auth-utils";

function applyCookies(from: NextResponse, to: NextResponse) {
    from.cookies.getAll().forEach((cookie) => {
        to.cookies.set(cookie);
    });
    return to;
}

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
    const isAuthPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";
    const verified = isEmailVerified(user);

    if (user && !verified) {
        await supabase.auth.signOut();
        if (isDashboardPage) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = "/";
            redirectUrl.searchParams.set("verify", "1");
            return applyCookies(response, NextResponse.redirect(redirectUrl));
        }
    }

    if (isDashboardPage && (!user || !verified)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        redirectUrl.searchParams.set("auth", "login");
        return applyCookies(response, NextResponse.redirect(redirectUrl));
    }

    if (isAuthPage && user && verified) {
        return applyCookies(response, NextResponse.redirect(new URL("/dashboard", request.url)));
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
