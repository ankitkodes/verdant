import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isEmailVerified } from "@/lib/auth-utils";
import { syncUserToDatabase } from "@/lib/sync-user";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!isEmailVerified(user)) {
            return NextResponse.json({ error: "Email not verified" }, { status: 403 });
        }

        let extras: { name?: string; provider?: string } = {};
        try {
            extras = await request.json();
        } catch {
            extras = {};
        }

        const dbUser = await syncUserToDatabase(user, extras);
        return NextResponse.json({ success: true, user: dbUser });
    } catch (error) {
        console.error("Sync error:", error);
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
