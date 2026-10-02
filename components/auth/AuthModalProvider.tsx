"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthModal, AuthMode } from "./AuthModal";

interface AuthModalContextValue {
    openLogin: () => void;
    openSignup: () => void;
    close: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context) throw new Error("useAuthModal must be used inside AuthModalProvider");
    return context;
}

export function AuthModalProvider({ children, onVerified }: { children: ReactNode; onVerified?: () => void }) {
    const [mode, setMode] = useState<AuthMode | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);
    const wasOpenRef = useRef(false);

    const open = useCallback((nextMode: AuthMode) => {
        if (!mode) triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setMode(nextMode);
    }, [mode]);

    const close = useCallback(() => setMode(null), []);

    useEffect(() => {
        if (mode) {
            wasOpenRef.current = true;
            return;
        }
        if (wasOpenRef.current) {
            wasOpenRef.current = false;
            window.requestAnimationFrame(() => triggerRef.current?.focus());
        }
    }, [mode]);

    return (
        <AuthModalContext.Provider value={{ openLogin: () => open("login"), openSignup: () => open("signup"), close }}>
            {children}
            {mode && <AuthModal mode={mode} onModeChange={setMode} onClose={close} onVerified={onVerified} />}
        </AuthModalContext.Provider>
    );
}
