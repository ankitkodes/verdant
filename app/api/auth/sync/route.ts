import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, provider = "email" } = body;

        const dbUser = await prisma.user.upsert({
            where: { supabaseId: user.id },
            update: {
                email: user.email!,
                name: name || undefined, // only update if provided
            },
            create: {
                supabaseId: user.id,
                email: user.email!,
                name,
                provider,
                emailVerified: true, // If they reached here, Supabase verified them (or OAuth)
            },
        });

        return NextResponse.json({ success: true, user: dbUser });
    } catch (error: any) {
        console.error("Sync error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
