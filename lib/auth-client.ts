import { createClient } from "./supabase/client";
import { getAuthRedirectUrl, isEmailVerified, UnverifiedEmailError } from "./auth-utils";

async function syncSessionUser(email?: string) {
    try {
        await fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
    } catch (error) {
        console.error("Auth sync failed:", error);
    }
}

async function requireVerifiedSession(email: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isEmailVerified(user)) {
        await supabase.auth.signOut();
        throw new UnverifiedEmailError(email);
    }
    await syncSessionUser(email);
    return { ok: true as const };
}

export async function loginWithCredentials(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user || !isEmailVerified(data.user)) {
        await supabase.auth.signOut();
        throw new UnverifiedEmailError(email);
    }
    await syncSessionUser(email);
    return { ok: true };
}

export async function registerWithCredentials({ name, email, password }: { name: string; email: string; password: string }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: getAuthRedirectUrl(),
            data: { full_name: name },
        },
    });
    if (error) throw error;

    const alreadyRegistered = Boolean(data.user) && (data.user?.identities?.length ?? 0) === 0;
    if (alreadyRegistered) {
        const duplicate = new Error("An account with this email already exists. Log in or verify your email.");
        (duplicate as { code?: string }).code = "user_already_exists";
        throw duplicate;
    }

    if (data.session && data.user && isEmailVerified(data.user)) {
        await syncSessionUser(email);
        return { ok: true, verified: true };
    }

    if (data.session) {
        await supabase.auth.signOut();
    }

    return { ok: true, verified: false };
}

export async function verifyEmailCode(email: string, code: string) {
    const supabase = createClient();
    const token = code.trim();
    let lastError: unknown;

    for (const type of ["signup", "email"] as const) {
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type });
        if (!error && data.user) {
            if (!isEmailVerified(data.user) && !data.session) {
                throw new UnverifiedEmailError(email);
            }
            await requireVerifiedSession(email);
            return { ok: true };
        }
        lastError = error;
    }

    throw lastError;
}

export async function resendVerificationCode(email: string) {
    const supabase = createClient();
    const redirectTo = getAuthRedirectUrl();
    const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: redirectTo },
    });
    if (error) throw error;
    return { ok: true };
}

export async function requestPasswordReset(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getAuthRedirectUrl("/auth/callback", "/dashboard"),
    });
    if (error) throw error;
    return { ok: true };
}

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { ok: true };
}
