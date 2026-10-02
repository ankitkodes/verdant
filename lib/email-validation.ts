import { ALLOWED_EMAIL_DOMAINS } from "./auth-config";
import { DISPOSABLE_EMAIL_DOMAINS } from "./disposable-domains";

const strictEmailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const domainCorrections: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmail.con": "gmail.com",
    "gamil.com": "gmail.com",
    "yahooo.com": "yahoo.com",
    "hotmial.com": "hotmail.com",
    "outlok.com": "outlook.com",
};

export interface EmailValidation {
    error: string;
    suggestion: string;
}

export function validateEmailAddress(value: string): EmailValidation {
    const email = value.trim();
    const localPart = email.split("@")[0] ?? "";
    if (!strictEmailPattern.test(email) || localPart.startsWith(".") || localPart.endsWith(".") || localPart.includes("..")) {
        return { error: "Enter a valid email address.", suggestion: "" };
    }

    const [, domainValue] = email.split("@");
    const domain = domainValue.toLowerCase();
    const correctedDomain = domainCorrections[domain];
    if (correctedDomain) {
        return { error: "", suggestion: `${localPart}@${correctedDomain}` };
    }

    if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        return { error: "Please use a permanent email address.", suggestion: "" };
    }

    if (ALLOWED_EMAIL_DOMAINS.length > 0 && !ALLOWED_EMAIL_DOMAINS.includes(domain)) {
        const allowedDomain = ALLOWED_EMAIL_DOMAINS.length === 1 && ALLOWED_EMAIL_DOMAINS[0] === "gmail.com"
            ? "Gmail"
            : ALLOWED_EMAIL_DOMAINS.map((item) => item.split(".")[0]).join(" or ");
        return { error: `Please use a ${allowedDomain} address.`, suggestion: "" };
    }

    return { error: "", suggestion: "" };
}
