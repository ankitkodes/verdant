"use client";

import { useEffect, useState } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { resendVerificationCode, verifyEmailCode } from "@/lib/auth-client";
import { OtpInput } from "./OtpInput";
import { useToast } from "@/components/ui/Toast";

interface VerifyEmailFormProps {
    email: string;
    onEditEmail: () => void;
    onVerified: () => void;
}

export function VerifyEmailForm({ email, onEditEmail, onVerified }: VerifyEmailFormProps) {
    const { toast, dismiss } = useToast();
    const [digits, setDigits] = useState(Array.from({ length: 6 }, () => ""));
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [resends, setResends] = useState(0);
    const completeCode = digits.join("").length === 6;

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = window.setTimeout(() => setCountdown((remaining) => remaining - 1), 1000);
        return () => window.clearTimeout(timer);
    }, [countdown]);

    const handleVerify = async () => {
        if (!completeCode || pending) return;
        setPending(true);
        setError("");
        const toastId = toast({ message: "Verifying...", type: "loading" });
        try {
            await verifyEmailCode(email, digits.join(""));
            setSuccess(true);
            dismiss(toastId);
            toast({ message: "Email verified! Welcome to Verdant.", type: "success" });
            window.setTimeout(onVerified, 700);
        } catch {
            setError("That code isn't correct. Try again.");
            dismiss(toastId);
            toast({ message: "That code isn't correct. Try again.", type: "error" });
            setPending(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0 || pending || resends >= 3) return;
        setPending(true);
        setError("");
        const toastId = toast({ message: "Resending code...", type: "loading" });
        try {
            await resendVerificationCode(email);
            setResends((count) => count + 1);
            setCountdown(30);
            setDigits(Array.from({ length: 6 }, () => ""));
            dismiss(toastId);
            toast({ message: "Verification code resent!", type: "success" });
        } catch {
            setError("We couldn't resend the code just now. Please try again.");
            dismiss(toastId);
            toast({ message: "We couldn't resend the code just now.", type: "error" });
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-[380px] flex-col justify-center pb-2">
            {success ? (
                <div className="py-8 text-center" role="status">
                    <span className="mx-auto flex h-14 w-14 animate-auth-success items-center justify-center rounded-full bg-[#eaf7f2] text-[#08755e]">
                        <Check className="h-7 w-7" strokeWidth={2.5} />
                    </span>
                    <h2 id="auth-modal-title" className="mt-5 text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[#101c24]">
                        You&apos;re all set
                    </h2>
                </div>
            ) : (
                <>
                    <h2 id="auth-modal-title" className="text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-[#101c24] sm:text-[28px]">
                        Check your email
                    </h2>
                    <p className="mt-1 text-[15px] leading-[1.4] text-[#617079]">
                        We sent a 6-digit code to <strong className="font-semibold text-[#243038]">{email || "your email"}</strong>.{" "}
                        <button type="button" onClick={onEditEmail} className="font-medium text-[#08755e] hover:underline">
                            Edit
                        </button>
                    </p>

                    <div className="mt-6">
                        <OtpInput value={digits} onChange={(value) => { setDigits(value); setError(""); }} hasError={Boolean(error)} />
                    </div>

                    {error && (
                        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#b54747]/25 bg-[#b54747]/[0.08] px-3.5 py-2.5 text-[14px] leading-[1.4] text-[#8e3434]" role="alert">
                            <TriangleAlert className="h-4 w-4 shrink-0 text-[#b54747]" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={!completeCode || pending}
                        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#075d4c] px-6 text-[16px] font-semibold text-white transition hover:bg-[#064f41] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#08755e]/15 disabled:cursor-not-allowed disabled:bg-[#075d4c]/[0.45]"
                    >
                        {pending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                        <span>{pending ? "Verifying..." : "Verify email"}</span>
                    </button>

                    <div className="mt-4 text-center text-[14px] text-[#617079]">
                        {resends >= 3 ? (
                            <p>Too many attempts. Please try again later.</p>
                        ) : (
                            <p>
                                Didn&apos;t get it?{" "}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={countdown > 0 || pending}
                                    className="font-semibold text-[#08755e] hover:underline disabled:cursor-default disabled:text-[#72878d]"
                                >
                                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
                                </button>
                            </p>
                        )}
                    </div>
                    <p className="mt-2 text-center text-[13px] text-[#72878d]">
                        Check your spam folder if you can&apos;t find it.
                    </p>
                </>
            )}
        </div>
    );
}

