"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginWithCredentials, requestPasswordReset } from "@/lib/auth-client";
import { validateEmailAddress } from "@/lib/email-validation";
import { EmailField } from "./EmailField";
import { SocialButtons } from "./SocialButtons";

export function LoginForm({ onSignup }: { onSignup: () => void }) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [socialError, setSocialError] = useState("");
    const [pending, setPending] = useState(false);
    const [resetMode, setResetMode] = useState(false);
    const [resetMessage, setResetMessage] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailValidation = validateEmailAddress(email);
        const nextEmailError = emailValidation.error || (emailValidation.suggestion ? "" : "");
        const nextPasswordError = password ? "" : "Enter your password.";
        setEmailError(nextEmailError);
        setPasswordError(nextPasswordError);
        setFormError("");
        if (nextEmailError || emailValidation.suggestion || nextPasswordError || !email.trim()) {
            if (!email.trim()) setEmailError("Enter a valid email address.");
            return;
        }

        setPending(true);
        try {
            await loginWithCredentials(email.trim(), password);
            router.push("/dashboard");
        } catch {
            setFormError("We couldn't log you in. Check your details and try again.");
        } finally {
            setPending(false);
        }
    };

    const requestReset = async () => {
        const result = validateEmailAddress(email);
        if (result.error || !email.trim()) {
            setEmailError(result.error || "Enter a valid email address.");
            return;
        }
        setPending(true);
        setFormError("");
        try {
            await requestPasswordReset(email.trim());
            setResetMessage("If an account exists for this email, reset instructions will be sent.");
        } catch {
            setFormError("We couldn't request a reset right now. Please try again.");
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center">
            <h2 id="auth-modal-title" className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#101c24]">
                {resetMode ? "Reset your password" : "Log in"}
            </h2>
            <p className="mt-1 text-[15px] leading-[1.4] text-[#617079]">
                {resetMode ? "Enter your email and we'll help you get back in." : "Welcome back."}
            </p>

            <form onSubmit={submit} noValidate className="mt-6 space-y-5">
                <EmailField value={email} onChange={(value) => { setEmail(value); setResetMessage(""); }} error={emailError} onErrorChange={setEmailError} />

                {!resetMode && (
                    <div>
                        <div className="mb-1.5 flex items-center justify-between gap-3">
                            <label htmlFor="login-password" className="text-[14px] font-medium text-[#243038]">
                                Password
                            </label>
                            <button type="button" onClick={() => { setResetMode(true); setFormError(""); }} className="text-[13px] font-medium text-[#08755e] hover:underline">
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value); setPasswordError(""); }}
                                placeholder="Enter your password"
                                aria-invalid={Boolean(passwordError)}
                                aria-describedby={passwordError ? "login-password-error" : undefined}
                                className={`h-12 w-full rounded-[10px] border bg-white px-4 pr-12 text-[16px] text-[#243038] outline-none transition placeholder:text-[#8a989e] focus:border-[#08755e] focus:ring-[3px] focus:ring-[#08755e]/15 ${
                                    passwordError ? "border-[#b54747]" : "border-[#dce5e0]"
                                }`}
                            />
                            <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[10px] text-[#617079] hover:bg-[#f0f5f2]">
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {passwordError && <p id="login-password-error" className="mt-1 text-[13px] text-[#a33b3b]">{passwordError}</p>}
                    </div>
                )}

                {resetMode && resetMessage && (
                    <p className="mt-4 text-[14px] leading-[1.5] text-[#08755e]" role="status">
                        {resetMessage}
                    </p>
                )}

                {formError && (
                    <div className="flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                        <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                        <span>{formError}</span>
                    </div>
                )}

                <button
                    type={resetMode ? "button" : "submit"}
                    onClick={resetMode ? requestReset : undefined}
                    disabled={pending}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#075d4c] px-6 text-[16px] font-semibold text-white transition hover:bg-[#064f41] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#08755e]/15 disabled:cursor-wait disabled:opacity-60"
                >
                    {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                    {pending ? (resetMode ? "Sending..." : "Logging in...") : (resetMode ? "Send reset link" : "Log in")}
                </button>

                {resetMode && (
                    <button type="button" onClick={() => { setResetMode(false); setResetMessage(""); setFormError(""); }} className="w-full py-2 text-[14px] font-medium text-[#08755e] hover:underline">
                        Back to log in
                    </button>
                )}
            </form>

            {!resetMode && (
                <>
                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-[#e2eae6]" />
                        <span className="text-[13px] font-normal text-[#72878d]">or continue with</span>
                        <span className="h-px flex-1 bg-[#e2eae6]" />
                    </div>

                    <SocialButtons mode="login" onError={setSocialError} />
                    {socialError && (
                        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                            <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                            <span>{socialError}</span>
                        </div>
                    )}

                    <p className="mt-6 text-center text-[14px] text-[#617079]">
                        New to Verdant?{" "}
                        <button type="button" onClick={onSignup} className="font-semibold text-[#08755e] hover:underline">
                            Create an account
                        </button>
                    </p>
                </>
            )}
        </div>
    );
}
