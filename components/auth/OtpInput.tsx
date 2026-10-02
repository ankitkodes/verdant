"use client";

import { type ClipboardEvent, type KeyboardEvent, useRef } from "react";

interface OtpInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    hasError: boolean;
}

export function OtpInput({ value, onChange, hasError }: OtpInputProps) {
    const refs = useRef<Array<HTMLInputElement | null>>([]);

    const updateAt = (index: number, rawValue: string) => {
        const digit = rawValue.replace(/\D/g, "").slice(-1);
        const next = [...value];
        next[index] = digit;
        onChange(next);
        if (digit && index < 5) refs.current[index + 1]?.focus();
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (!digits) return;
        event.preventDefault();
        const next = Array.from({ length: 6 }, (_, index) => digits[index] ?? "");
        onChange(next);
        refs.current[Math.min(digits.length, 5)]?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !value[index] && index > 0) refs.current[index - 1]?.focus();
        if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
        if (event.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
    };

    return (
        <div className="flex justify-between gap-2" role="group" aria-label="Six-digit verification code">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => { refs.current[index] = element; }}
                    value={digit}
                    onChange={(event) => updateAt(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onPaste={handlePaste}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    pattern="[0-9]*"
                    maxLength={1}
                    aria-label={`Verification digit ${index + 1}`}
                    className={`h-[56px] w-[52px] flex-none rounded-[10px] border bg-white text-center text-[22px] font-semibold text-[#172128] outline-none transition focus:border-[#08755e] focus:ring-[3px] focus:ring-[#08755e]/15 ${hasError ? "border-[#b54747]" : "border-[#dce5e0]"}`}
                />
            ))}
        </div>
    );
}

