"use client";

import { type FormEvent, useMemo, useState } from "react";
import { Check, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { registerWithCredentials } from "@/lib/auth-client";
import { validateEmailAddress } from "@/lib/email-validation";
import { EmailField } from "./EmailField";
import { SocialButtons } from "./SocialButtons";

export interface SignupDraft {
    name: string;
    email: string;
    password: string;
}

const emptyDraft: SignupDraft = { name: "", email: "", password: "" };

interface SignupFormProps {
    draft: SignupDraft;
    onDraftChange: (draft: SignupDraft) => void;
    onLogin: () => void;
    onRegistered: (email: string) => void;
}

export function SignupForm({ draft, onDraftChange, onLogin, onRegistered }: SignupFormProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [socialError, setSocialError] = useState("");
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(false);

    const passwordRules = useMemo(() => ({
        length: draft.password.length >= 8,
        letter: /[A-Za-z]/.test(draft.password),
        number: /\d/.test(draft.password),
    }), [draft.password]);

    const isPasswordValid = passwordRules.length && passwordRules.letter && passwordRules.number;
    const emailValidation = validateEmailAddress(draft.email);
    const validEmail = Boolean(draft.email.trim()) && !emailValidation.error && !emailValidation.suggestion;
    const canSubmit = Boolean(draft.name.trim()) && validEmail && isPasswordValid && !pending;

    const update = (values: Partial<SignupDraft>) => onDraftChange({ ...emptyDraft, ...draft, ...values });

    const continueToDetails = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validation = validateEmailAddress(draft.email);
        setEmailError(validation.error);
        if (!validation.error && !validation.suggestion && draft.email.trim()) {
            setFormError("");
            setStep(2);
        } else if (!draft.email.trim()) {
            setEmailError("Enter a valid email address.");
        }
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validation = validateEmailAddress(draft.email);
        const nextNameError = draft.name.trim() ? "" : "Enter your full name.";
        const nextPasswordError = !passwordRules.length
            ? "Password must be at least 8 characters."
            : !passwordRules.letter
            ? "Password must include at least one letter."
            : !passwordRules.number
            ? "Password must include at least one number."
            : "";
        
        setNameError(nextNameError);
        setEmailError(validation.error || (validation.suggestion ? "" : ""));
        setPasswordError(nextPasswordError);
        setFormError("");

        if (nextNameError || validation.error || validation.suggestion || nextPasswordError) return;

        setPending(true);
        try {
            await registerWithCredentials({ name: draft.name.trim(), email: draft.email.trim(), password: draft.password });
            onRegistered(draft.email.trim());
        } catch {
            setFormError("We couldn't create your account just now. Please try again.");
        } finally {
            setPending(false);
        }
    };

    const strength = !draft.password
        ? 0
        : Number(passwordRules.length) + Number(passwordRules.letter) + Number(passwordRules.number) + Number(draft.password.length >= 12);

    return (
        <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center">
            {/* Step Indicator */}
            <div className="mb-4">
                <div className="flex items-center justify-between text-[12px] font-medium text-[#72878d]">
                    <span>Step {step} of 2</span>
                    {step === 2 && (
                        <button type="button" onClick={() => setStep(1)} className="font-medium text-[#08755e] hover:underline">
                            Back
                        </button>
                    )}
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <span className="h-1 rounded-full bg-[#08755e]" />
                    <span className={`h-1 rounded-full transition-colors ${step === 2 ? "bg-[#08755e]" : "bg-[#dce5e0]"}`} />
                </div>
            </div>

            <h2 id="auth-modal-title" className="text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#101c24]">
                Create your account
            </h2>
            <p className="mt-1 text-[15px] leading-[1.4] text-[#617079]">
                Start practicing interviews in minutes.
            </p>

            {step === 1 ? (
                <>
                    {/* Social Row FIRST on Step 1 */}
                    <div className="mt-5">
                        <SocialButtons mode="signup" onError={setSocialError} />
                    </div>
                    {socialError && (
                        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                            <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                            <span>{socialError}</span>
                        </div>
                    )}

                    <div className="my-5 flex items-center gap-3">
                        <span className="h-px flex-1 bg-[#e2eae6]" />
                        <span className="text-[13px] font-normal text-[#72878d]">or sign up with email</span>
                        <span className="h-px flex-1 bg-[#e2eae6]" />
                    </div>

                    <form onSubmit={continueToDetails} noValidate className="space-y-5">
                        <EmailField value={draft.email} onChange={(email) => update({ email })} error={emailError} onErrorChange={setEmailError} />
                        
                        {formError && (
                            <div className="flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                                <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                                <span>{formError}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!validEmail || pending}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#075d4c] px-6 text-[16px] font-semibold text-white transition hover:bg-[#064f41] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#08755e]/15 disabled:cursor-not-allowed disabled:bg-[#075d4c]/[0.45]"
                        >
                            {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                            <span>Continue</span>
                        </button>
                    </form>
                </>
            ) : (
                <>
                    {/* Step 2: Read-only email chip */}
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-[10px] border border-[#dce5e0] bg-white px-3.5 py-2.5">
                        <span className="min-w-0 truncate text-[15px] font-medium text-[#243038]">{draft.email}</span>
                        <button type="button" onClick={() => setStep(1)} className="shrink-0 text-[13px] font-semibold text-[#08755e] hover:underline">
                            Edit
                        </button>
                    </div>

                    <form onSubmit={submit} noValidate className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="signup-name" className="mb-1.5 block text-[14px] font-medium text-[#243038]">
                                Full name
                            </label>
                            <input
                                id="signup-name"
                                autoComplete="name"
                                value={draft.name}
                                onChange={(event) => { update({ name: event.target.value }); setNameError(""); }}
                                onBlur={() => setNameError(draft.name.trim() ? "" : "Enter your full name.")}
                                placeholder="Your name"
                                aria-invalid={Boolean(nameError)}
                                aria-describedby={nameError ? "signup-name-error" : undefined}
                                className={`h-12 w-full rounded-[10px] border bg-white px-4 text-[16px] text-[#243038] outline-none transition placeholder:text-[#8a989e] focus:border-[#08755e] focus:ring-[3px] focus:ring-[#08755e]/15 ${
                                    nameError ? "border-[#b54747]" : "border-[#dce5e0]"
                                }`}
                            />
                            {nameError && <p id="signup-name-error" className="mt-1 text-[13px] text-[#a33b3b]">{nameError}</p>}
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="mb-1.5 block text-[14px] font-medium text-[#243038]">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={draft.password}
                                    onChange={(event) => { update({ password: event.target.value }); setPasswordError(""); }}
                                    onBlur={() => setPasswordError(!passwordRules.length ? "Password must be at least 8 characters." : !passwordRules.letter ? "Password must include at least one letter." : !passwordRules.number ? "Password must include at least one number." : "")}
                                    placeholder="Create a password"
                                    aria-invalid={Boolean(passwordError)}
                                    aria-describedby="signup-password-hint"
                                    className={`h-12 w-full rounded-[10px] border bg-white px-4 pr-12 text-[16px] text-[#243038] outline-none transition placeholder:text-[#8a989e] focus:border-[#08755e] focus:ring-[3px] focus:ring-[#08755e]/15 ${
                                        passwordError ? "border-[#b54747]" : "border-[#dce5e0]"
                                    }`}
                                />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[10px] text-[#617079] hover:bg-[#f0f5f2]">
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* Single compact 4-segment strength bar */}
                            <div className="mt-2 grid grid-cols-4 gap-1.5" aria-hidden="true">
                                {[0, 1, 2, 3].map((segment) => (
                                    <span key={segment} className={`h-1 rounded-full transition-colors ${segment < strength ? "bg-[#08755e]" : "bg-[#dce5e0]"}`} />
                                ))}
                            </div>

                            {/* Single hint line that turns accent color with check icon once met */}
                            <p id="signup-password-hint" className={`mt-1.5 flex items-center gap-1.5 text-[13px] ${isPasswordValid ? "text-[#08755e] font-medium" : "text-[#617079]"}`}>
                                {isPasswordValid && <Check className="h-3.5 w-3.5 text-[#08755e]" aria-hidden="true" />}
                                <span>Use 8+ characters with a letter and a number.</span>
                            </p>

                            {passwordError && <p className="mt-1 text-[13px] text-[#a33b3b]">{passwordError}</p>}
                        </div>

                        {/* Terms and Privacy policy agreement line replacing checkbox */}
                        <p className="text-[13px] leading-[1.45] text-[#617079]">
                            By creating an account you agree to the{" "}
                            <a href="/terms" target="_blank" rel="noreferrer" className="font-medium text-[#08755e] underline underline-offset-2">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" target="_blank" rel="noreferrer" className="font-medium text-[#08755e] underline underline-offset-2">
                                Privacy Policy
                            </a>
                            .
                        </p>

                        {formError && (
                            <div className="flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                                <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                                <span>{formError}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#075d4c] px-6 text-[16px] font-semibold text-white transition hover:bg-[#064f41] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#08755e]/15 disabled:cursor-not-allowed disabled:bg-[#075d4c]/[0.45]"
                        >
                            {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                            <span>{pending ? "Creating account..." : "Create account"}</span>
                        </button>

                        <button type="button" onClick={() => setStep(1)} className="block w-full text-center text-[14px] font-medium text-[#08755e] hover:underline">
                            Back
                        </button>
                    </form>
                </>
            )}

            <p className="mt-5 text-center text-[14px] text-[#617079]">
                Already have an account?{" "}
                <button type="button" onClick={onLogin} className="font-semibold text-[#08755e] hover:underline">
                    Log in
                </button>
            </p>
        </div>
    );
}
