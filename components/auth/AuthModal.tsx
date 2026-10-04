"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail, Sparkles, X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignupForm, type SignupDraft } from "./SignupForm";
import { VerifyEmailForm } from "./VerifyEmailForm";

export type AuthMode = "login" | "signup" | "verify";

interface AuthModalProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
    onClose: () => void;
    onVerified?: () => void;
}

const initialDraft: SignupDraft = { name: "", email: "", password: "" };

const brandCopy = {
    login: {
        eyebrow: "Welcome back",
        headline: "Pick up where you left off.",
        bottom: "Your sessions and progress are waiting.",
    },
    signup: {
        eyebrow: "Start free",
        headline: "Your first mock interview is a few clicks away.",
        bottom: "No credit card required.",
    },
    verify: {
        eyebrow: "Almost there",
        headline: "Confirm your email to start practicing.",
        bottom: "It only takes a moment.",
    },
};

function BrandLogo({ theme = "light" }: { theme?: "light" | "dark" }) {
    return (
        <div className={`flex items-center gap-2.5 ${theme === "dark" ? "text-[#101c24]" : "text-white"}`}>
            <svg viewBox="0 0 223 184" className="h-8 w-8 shrink-0" fill="none" aria-hidden="true">
                <path
                    d="M 26.3,29.2 Q 22.0,18.0 34.0,18.2 L 66.0,18.8 Q 78.0,19.0 82.8,30.0 L 137.2,154.0 Q 142.0,165.0 130.0,164.4 L 90.0,162.6 Q 78.0,162.0 73.7,150.8 Z"
                    fill={theme === "dark" ? "#075d4c" : "#83DDC5"}
                />
                <path
                    d="M 144.2,29.6 Q 150.0,19.0 162.0,19.6 L 198.0,21.4 Q 210.0,22.0 205.2,33.0 L 160.8,134.0 Q 156.0,145.0 150.2,134.5 L 124.8,88.5 Q 119.0,78.0 124.6,67.4 Z"
                    fill={theme === "dark" ? "#08755e" : "#0B705F"}
                />
            </svg>
            <span className="text-[20px] font-bold tracking-[-0.04em]">Verdant</span>
        </div>
    );
}

function BrandPreview({ mode }: { mode: AuthMode }) {
    return (
        <div key={mode} className="animate-auth-panel mt-7 rounded-[16px] border border-white/15 bg-white p-5 text-[#243038] shadow-[0_16px_40px_rgba(7,40,32,0.18)]">
            {mode === "login" && (
                <>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#08755e]">Last session</p>
                    <div className="mt-3 w-fit max-w-full rounded-[12px] bg-[#f3f7f5] px-3.5 py-2.5 text-[14px] leading-[1.45] text-[#243038]">
                        Tell me about a project you&apos;re proud of.
                    </div>
                    <div className="mt-3.5 flex items-start gap-2.5 text-[13px] leading-[1.45] text-[#52636a]">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#08755e]" />
                        <span>Good structure — add one concrete example.</span>
                    </div>
                </>
            )}
            {mode === "signup" && (
                <div className="space-y-3 text-[14px] font-medium text-[#34434a]">
                    {["Choose a role and difficulty", "Answer realistic questions", "Get feedback you can act on"].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf7f2] text-[#08755e]">
                                <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                            </span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            )}
            {mode === "verify" && (
                <div className="flex items-center gap-3 text-[14px] leading-[1.5] text-[#34434a]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf7f2] text-[#08755e]">
                        <Mail className="h-5 w-5" />
                    </span>
                    <span>Check your inbox for a 6-digit confirmation code.</span>
                </div>
            )}
        </div>
    );
}

export function AuthModal({ mode, onModeChange, onClose, onVerified }: AuthModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const [signupDraft, setSignupDraft] = useState(initialDraft);
    const [verificationEmail, setVerificationEmail] = useState("");

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const focusFrame = window.requestAnimationFrame(() => {
            dialogRef.current?.querySelector<HTMLInputElement>("input:not([type='checkbox'])")?.focus();
        });

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== "Tab" || !dialogRef.current) return;
            const focusable = Array.from(
                dialogRef.current.querySelectorAll<HTMLElement>(
                    "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"
                )
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [mode, onClose]);

    const handleRegistered = (email: string) => {
        setVerificationEmail(email);
        onModeChange("verify");
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10241e]/35 p-3 backdrop-blur-[10px] sm:p-4 max-[860px]:items-end max-[860px]:p-0"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
                className="animate-auth-modal grid max-h-[min(720px,92vh)] w-full max-w-[920px] grid-cols-1 overflow-hidden rounded-[24px] bg-white shadow-[0_24px_80px_rgba(12,48,40,0.22)] max-[860px]:max-h-[94vh] max-[860px]:rounded-b-none max-[860px]:rounded-t-[22px] min-[861px]:grid-cols-2"
            >
                <aside className="relative hidden min-h-0 flex-col justify-between overflow-hidden bg-[#075d4c] p-10 text-white min-[861px]:flex">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(72,201,170,0.28),transparent_32%)]" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="relative z-10">
                        <BrandLogo theme="light" />
                    </div>
                    <div key={mode} className="animate-auth-panel relative z-10 my-auto py-6">
                        <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
                            <Sparkles className="h-3.5 w-3.5" />
                            {brandCopy[mode].eyebrow}
                        </p>
                        <h2 className="mt-3 max-w-[360px] text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                            {brandCopy[mode].headline}
                        </h2>
                        <BrandPreview mode={mode} />
                    </div>
                    <p className="relative z-10 text-[14px] leading-[1.5] text-white/75">{brandCopy[mode].bottom}</p>
                </aside>

                <section className="relative flex min-h-0 flex-col bg-white px-5 py-6 sm:px-8 min-[861px]:px-10 min-[861px]:py-9">
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[#52636a] transition duration-200 hover:bg-[#f0f5f2] hover:text-[#172128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08755e]/35 sm:right-5 sm:top-5"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="mb-5 pr-12 min-[861px]:hidden">
                        <BrandLogo theme="dark" />
                        <p key={mode} className="animate-auth-panel mt-3 text-[18px] font-semibold leading-[1.25] text-[#172128]">
                            {brandCopy[mode].headline}
                        </p>
                    </div>

                    <div key={mode} className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 animate-auth-form">
                        {mode === "login" && <LoginForm onSignup={() => onModeChange("signup")} />}
                        {mode === "signup" && (
                            <SignupForm
                                draft={signupDraft}
                                onDraftChange={setSignupDraft}
                                onLogin={() => onModeChange("login")}
                                onRegistered={handleRegistered}
                            />
                        )}
                        {mode === "verify" && (
                            <VerifyEmailForm
                                email={verificationEmail}
                                onEditEmail={() => onModeChange("signup")}
                                onVerified={() => {
                                    onVerified?.();
                                    onClose();
                                }}
                            />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
