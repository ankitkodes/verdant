import type { User } from "@supabase/supabase-js";

export function isEmailVerified(user: User | null | undefined): boolean {
    if (!user?.email) return false;
    if (user.email_confirmed_at) return true;

    const metadataVerified = user.user_metadata?.email_verified;
    if (metadataVerified === true || metadataVerified === "true") return true;

    return (user.identities ?? []).some((identity) => {
        const verified = identity.identity_data?.email_verified;
        return verified === true || verified === "true";
    });
}

export function getAuthRedirectUrl(path = "/auth/callback", next = "/dashboard") {
    const origin = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL(path, origin);
    url.searchParams.set("next", next);
    return url.toString();
}

export function mapAuthError(error: unknown, fallback = "Something went wrong. Please try again.") {
    const message = (error as { message?: string } | null)?.message?.toLowerCase() ?? "";
    const code = (error as { code?: string } | null)?.code ?? "";

    if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
        return "Please verify your email to continue.";
    }
    if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
        return "We couldn't log you in. Check your details and try again.";
    }
    if (code === "user_already_exists" || message.includes("already registered") || message.includes("already been registered")) {
        return "An account with this email already exists. Log in or verify your email.";
    }
    if (code === "over_email_send_rate_limit" || message.includes("rate limit") || message.includes("for security purposes")) {
        return "Too many emails were sent. Please wait a minute and try again.";
    }
    if (message.includes("provider is not enabled") || message.includes("unsupported provider")) {
        return "That sign-in method isn't enabled yet. Please use email, Google, or GitHub.";
    }
    if (message.includes("unable to connect") || message.includes("failed to fetch") || message.includes("network")) {
        return "We couldn't reach the sign-in service. Check your connection and try again.";
    }
    if (message.includes("error sending confirmation email") || message.includes("error sending")) {
        return "We couldn't send the verification email. Please try again in a moment.";
    }
    return fallback;
}

export function isUnconfirmedEmailError(error: unknown) {
    const message = (error as { message?: string } | null)?.message?.toLowerCase() ?? "";
    const code = (error as { code?: string } | null)?.code ?? "";
    return code === "email_not_confirmed" || message.includes("email not confirmed");
}

export class UnverifiedEmailError extends Error {
    constructor(public email: string) {
        super("Email not confirmed");
        this.name = "UnverifiedEmailError";
    }
}
