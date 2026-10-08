"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isEmailVerified } from "@/lib/auth-utils";
import { AuthModalProvider } from "./AuthModalProvider";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, session: null, isLoading: true });

export function useSession() {
    const context = useContext(AuthContext);
    return { data: context.session, status: context.isLoading ? "loading" : context.user ? "authenticated" : "unauthenticated", user: context.user };
}

export function AppProviders({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const applySession = async (nextSession: Session | null, event?: string) => {
            const nextUser = nextSession?.user ?? null;
            if (nextUser && !isEmailVerified(nextUser)) {
                await supabase.auth.signOut();
                setSession(null);
                setUser(null);
                setIsLoading(false);
                return;
            }

            setSession(nextSession);
            setUser(nextUser);
            setIsLoading(false);

            if (event === "SIGNED_IN" && nextUser) {
                fetch("/api/auth/sync", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: nextUser.email,
                        name: nextUser.user_metadata?.full_name || nextUser.user_metadata?.name,
                        provider: nextUser.app_metadata?.provider || "email",
                    }),
                }).catch(() => undefined);
            }
        };

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, nextSession) => {
            void applySession(nextSession, event);
        });

        supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
            void applySession(nextSession);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, session, isLoading }}>
            <AuthModalProvider>{children}</AuthModalProvider>
        </AuthContext.Provider>
    );
}
