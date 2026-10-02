"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail, X } from "lucide-react";
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
        headline: "Pick up where you left off.",
        bottom: "Your sessions and progress are waiting.",
    },
    signup: {
        headline: "Your first mock interview is a few clicks away.",
        bottom: "Free to start.",
    },
    verify: {
        headline: "One last step.",
        bottom: "It only takes a moment.",
    },
};

function BrandLogo({ theme = "light" }: { theme?: "light" | "dark" }) {
    return (
        <div className={`flex items-center gap-2.5 ${theme === "dark" ? "text-[#101c24]" : "text-white"}`}>
            <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" fill="none" aria-hidden="true">
                <path d="M8 8h13l17 34-8 15L8 8Z" fill={theme === "dark" ? "#075d4c" : "white"} />
                <path d="M36 7h17L35 50c-2 4-8 4-10 0l-5-10L36 7Z" fill={theme === "dark" ? "#08755e" : "white"} />
            </svg>
            <span className="text-[20px] font-bold tracking-[-0.04em]">Verdant</span>
        </div>
    );
}

function BrandPreview({ mode }: { mode: AuthMode }) {
    return (
        <div key={mode} className="animate-auth-panel mt-6 rounded-[10px] bg-white p-5 text-[#243038] shadow-sm">
            {mode === "login" && (
                <>
                    <div className="w-fit max-w-full rounded-[10px] bg-[#f3f7f5] px-3.5 py-2.5 text-[14px] leading-[1.45] text-[#243038]">
                        Tell me about a project you&apos;re proud of.
                    </div>
                    <div className="mt-3.5 flex items-start gap-2.5 text-[13px] leading-[1.45] text-[#52636a]">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#08755e]" />
                        <span>Good structure - add one concrete example.</span>
                    </div>
                </>
            )}
            {mode === "signup" && (
                <div className="space-y-3 text-[14px] font-medium text-[#34434a]">
                    {["Choose a role", "Answer timed questions", "Get feedback right away"].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eaf7f2] text-[#08755e]">
                                <Check className="h-3.5 w-3.5" />
                            </span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            )}
            {mode === "verify" && (
                <div className="flex items-center gap-3 text-[14px] leading-[1.5] text-[#34434a]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eaf7f2] text-[#08755e]">
                        <Mail className="h-5 w-5" />
                    </span>
                    <span>Check your inbox for a 6-digit code.</span>
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f7f4]/55 p-4 backdrop-blur-[6px] max-[860px]:items-end max-[860px]:p-0"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
                className="animate-auth-modal grid h-auto max-h-[640px] w-full max-w-[880px] grid-cols-2 overflow-hidden rounded-[20px] bg-white shadow-[0_18px_50px_rgba(17,74,58,0.16)] max-[860px]:max-h-[92vh] max-[860px]:grid-cols-1 max-[860px]:rounded-b-none max-[860px]:rounded-t-[20px]"
            >
                {/* Desktop Left Panel (Brand Panel) */}
                <aside className="hidden min-h-0 flex-col justify-between bg-[#075d4c] p-10 text-white min-[861px]:flex">
                    <BrandLogo theme="light" />
                    <div key={mode} className="animate-auth-panel my-auto py-4">
                        <h2 className="max-w-[340px] text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                            {brandCopy[mode].headline}
                        </h2>
                        <BrandPreview mode={mode} />
                    </div>
                    <p className="text-[14px] leading-[1.5] text-white/75">{brandCopy[mode].bottom}</p>
                </aside>

                {/* Form Panel */}
                <section className="relative flex min-h-0 flex-col justify-center bg-white p-6 min-[861px]:p-[40px]">
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="absolute right-5 top-5 z-10 flex h-[36px] w-[36px] items-center justify-center rounded-[10px] text-[#52636a] transition hover:bg-[#f0f5f2] hover:text-[#172128] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08755e]/35"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Mobile Header (Shown on screens <= 860px) */}
                    <div className="mb-6 pr-10 min-[861px]:hidden">
                        <BrandLogo theme="dark" />
                        <p key={mode} className="animate-auth-panel mt-3 text-[18px] font-semibold leading-[1.2] text-[#172128]">
                            {brandCopy[mode].headline}
                        </p>
                    </div>

                    <div key={mode} className="min-h-0 flex-1 overflow-y-auto animate-auth-form">
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

