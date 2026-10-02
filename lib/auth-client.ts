const simulateRequest = () => new Promise<void>((resolve) => window.setTimeout(resolve, 800));

export async function loginWithCredentials(email: string, password: string) {
    void email;
    void password;
    // TODO: connect to backend
    await simulateRequest();
    return { ok: true };
}

export async function registerWithCredentials({ name, email, password }: { name: string; email: string; password: string }) {
    void name;
    void email;
    void password;
    // TODO: connect to backend
    await simulateRequest();
    return { ok: true };
}

export async function verifyEmailCode(email: string, code: string) {
    void email;
    void code;
    // TODO: connect to backend
    await simulateRequest();
    return { ok: true };
}

export async function resendVerificationCode(email: string) {
    void email;
    // TODO: connect to backend
    await simulateRequest();
    return { ok: true };
}

export async function requestPasswordReset(email: string) {
    void email;
    // TODO: connect to backend
    await simulateRequest();
    return { ok: true };
}
