import { createClient } from "./supabase/client";

export async function loginWithCredentials(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    if (data.session) {
        await fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
    }
    return { ok: true };
}

export async function registerWithCredentials({ name, email, password }: { name: string; email: string; password: string }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    });
    if (error) throw error;
    return { ok: true };
}

export async function verifyEmailCode(email: string, code: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "signup",
    });
    if (error) throw error;
    if (data.session) {
        await fetch("/api/auth/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
    }
    return { ok: true };
}

export async function resendVerificationCode(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    });
    if (error) throw error;
    return { ok: true };
}

export async function requestPasswordReset(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { ok: true };
}

export async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { ok: true };
}

