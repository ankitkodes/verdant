"use client";

import { SessionProvider } from "next-auth/react";
import { AuthModalProvider } from "./AuthModalProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthModalProvider>{children}</AuthModalProvider>
        </SessionProvider>
    );
}
