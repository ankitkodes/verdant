"use client";

import { validateEmailAddress } from "@/lib/email-validation";

interface EmailFieldProps {
    value: string;
    onChange: (value: string) => void;
    error: string;
    onErrorChange: (error: string) => void;
    onFocus?: () => void;
}

export function EmailField({ value, onChange, error, onErrorChange, onFocus }: EmailFieldProps) {
    const validation = validateEmailAddress(value);

    const validate = () => {
        const result = validateEmailAddress(value);
        onErrorChange(result.error);
    };

    return (
        <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-[14px] font-medium text-[#243038]">
                Email
            </label>
            <input
                id="auth-email"
                name="email"
                type="email"
                autoComplete="email"
                value={value}
                onChange={(event) => {
                    onChange(event.target.value);
                    if (error) onErrorChange("");
                }}
                onBlur={validate}
                onFocus={onFocus}
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "auth-email-error" : validation.suggestion ? "auth-email-suggestion" : undefined}
                className={`h-12 w-full rounded-[10px] border bg-white px-4 text-[16px] text-[#243038] outline-none transition placeholder:text-[#8a989e] focus:border-[#08755e] focus:ring-[3px] focus:ring-[#08755e]/15 ${
                    error ? "border-[#b54747]" : "border-[#dce5e0]"
                }`}
            />
            {error && <p id="auth-email-error" className="mt-1 text-[13px] text-[#a33b3b]">{error}</p>}
            {!error && validation.suggestion && (
                <p id="auth-email-suggestion" className="mt-1 text-[13px] text-[#52636a]">
                    Did you mean <button type="button" onClick={() => { onChange(validation.suggestion); onErrorChange(""); }} className="font-semibold text-[#08755e] underline underline-offset-2">{validation.suggestion}</button>?
                </p>
            )}
        </div>
    );
}

