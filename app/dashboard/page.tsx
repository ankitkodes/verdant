"use client";

import { useSession } from "@/components/auth/AppProviders";
import { logout } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

export default function Dashboard() {
    const { user, status } = useSession();
    const router = useRouter();
    const { toast, dismiss } = useToast();

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f7f4]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#08755e] border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return null; // Handled by proxy.ts
    }
    function onpress() {
        router.push("/dashboard/interview")
    }
    const handleLogout = async () => {
        const toastId = toast({ message: "Logging out...", type: "loading" });
        await logout();
        dismiss(toastId);
        toast({ message: "Logged out successfully!", type: "success" });
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#f5f7f4] text-[#243038]">
            <header className="border-b border-[#e2eae6] bg-white px-6 py-4">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <div className="flex items-center gap-2 text-[#08755e] font-bold text-xl">
                        Verdant Dashboard
                    </div>
                    <button
                        onClick={handleLogout}
                        className="rounded-full bg-[#08755e] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#065c4a]"
                    >
                        Log out
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-12">
                <h1 className="text-3xl font-bold text-[#101c24]">
                    Welcome back, {user.user_metadata?.full_name || user.email}!
                </h1>
                <p className="mt-4 text-lg text-[#617079]">
                    You have successfully logged in. Your email ({user.email}) is verified and your account is ready to go.
                </p>

                <div className="mt-10 rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h2 className="text-xl font-semibold">Ready to practice?</h2>
                    <p className="mt-2 text-[#617079]">
                        Choose an interview module below to start your mock interview. (More coming soon!)
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                        <button className="rounded-xl border border-[#dceae4] bg-[#f9fbfa] px-6 py-4 font-medium transition hover:border-[#c9e7dc] hover:shadow-md" onClick={onpress}>
                            Start Interview
                        </button>
                        <button className="rounded-xl border border-[#dceae4] bg-[#f9fbfa] px-6 py-4 font-medium transition hover:border-[#c9e7dc] hover:shadow-md">
                            Product Management
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
