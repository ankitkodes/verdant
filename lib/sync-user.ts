import type { User } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";

function databaseConfigured() {
    const url = process.env.DATABASE_URL ?? "";
    return Boolean(url) && !url.includes("YOUR-PASSWORD");
}

export async function syncUserToDatabase(user: User, extras?: { name?: string; provider?: string }) {
    if (!databaseConfigured() || !user.email) return null;

    const provider = extras?.provider || user.app_metadata?.provider || "email";
    const name = extras?.name || user.user_metadata?.full_name || user.user_metadata?.name || null;
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
    const emailVerified = Boolean(user.email_confirmed_at);

    try {
        return await prisma.user.upsert({
            where: { supabaseId: user.id },
            update: {
                email: user.email,
                name: name || undefined,
                avatarUrl: avatarUrl || undefined,
                provider,
                emailVerified,
            },
            create: {
                supabaseId: user.id,
                email: user.email,
                name,
                avatarUrl,
                provider,
                emailVerified,
            },
        });
    } catch (error) {
        console.error("Failed to sync user to the database:", error);
        return null;
    }
}
