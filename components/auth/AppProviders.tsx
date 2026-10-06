"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
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
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        // Initialize state
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <AuthContext.Provider value={{ user, session, isLoading }}>
            <AuthModalProvider>{children}</AuthModalProvider>
        </AuthContext.Provider>
    );
}
