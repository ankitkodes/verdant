"use client";

import { useStartInterview } from "@/modules/interview/interview.hooks";
import { StartInput } from "@/modules/interview/interview.schema";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Mode = "chat" | "voice" | "video";
type InterviewType = "dsa" | "system-design" | "backend" | "behavioral";
type Difficulty = "easy" | "medium" | "hard";
type Duration = 15 | 30 | 45;

const MODES: { value: Mode; label: string; hint: string }[] = [
    { value: "chat", label: "Chat", hint: "Type your answers" },
    { value: "voice", label: "Voice", hint: "Speak with the AI interviewer" },
    {
        value: "video",
        label: "Video",
        hint: "Camera and mic, with delivery feedback",
    },
];

const TYPES: { value: InterviewType; label: string; hint: string }[] = [
    { value: "dsa", label: "DSA", hint: "Problem solving" },
    { value: "system-design", label: "System design", hint: "Architecture" },
    { value: "backend", label: "Backend", hint: "APIs and databases" },
    { value: "behavioral", label: "Behavioral", hint: "Communication" },
];

const DIFFICULTIES: { value: Difficulty; label: string; hint: string }[] = [
    { value: "easy", label: "Easy", hint: "Warm-up" },
    { value: "medium", label: "Medium", hint: "Standard" },
    { value: "hard", label: "Hard", hint: "Stretch" },
];

const DURATIONS: { value: Duration; label: string; hint: string }[] = [
    { value: 15, label: "15 min", hint: "Quick" },
    { value: 30, label: "30 min", hint: "Standard" },
    { value: 45, label: "45 min", hint: "Full" },
];

const TOPICS = ["Arrays", "Graphs", "DP", "SQL", "Caching", "REST APIs", "Queues"];

const QUESTION_COUNT: Record<Duration, number> = { 15: 3, 30: 5, 45: 7 };

export default function Page() {
    const [mode, setMode] = useState<Mode>("chat");
    const [role, setRole] = useState("");
    const [type, setType] = useState<InterviewType>("dsa");
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [duration, setDuration] = useState<Duration>(30);
    const [topics, setTopics] = useState<string[]>(["Arrays"]);
    const [codeEditor, setCodeEditor] = useState(true);
    const [hints, setHints] = useState(false);

    const summary = useMemo(
        () => ({
            role: role.trim() || "[Role]",
            mode: MODES.find((m) => m.value === mode)!.label,
            type: TYPES.find((t) => t.value === type)!.label,
            difficulty: DIFFICULTIES.find((d) => d.value === difficulty)!.label,
            length: `${duration} min`,
            questions: `About ${QUESTION_COUNT[duration]}`,
        }),
        [role, mode, type, difficulty, duration]
    );

    const toggleTopic = (topic: string) =>
        setTopics((prev) =>
            prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
        );

    const router = useRouter();
    const startMutation = useStartInterview();
    const canStart = role.trim().length > 0;

    const handleStart = () => {
        if (!canStart || startMutation.isPending) return;

        const config: StartInput = {
            mode,
            role: role.trim(),
            type,
            difficulty,
            duration,
            topics,
            codeEditor,
            hints,
        };

        startMutation.mutate(config, {
            onSuccess: ({ id }) => router.push(`/dashboard/interview/${id}`),
        });
    };

    return (
        <main className="min-h-screen bg-[#eef3ef] px-4 py-8 text-[#0f2a1f] sm:px-8 lg:px-4">
            <div className="mx-auto max-w-[1040px]">
                <header className="mb-5 px-1">
                    <h1 className="text-[32px] font-bold leading-tight tracking-tight">
                        New interview
                    </h1>
                    <p className="mt-1 text-sm text-[#5f6f67]">
                        Configure your practice session
                    </p>
                </header>

                <div className="grid items-start gap-5 lg:grid-cols-[1fr_328px]">
                    {/* Setup */}
                    <section className="rounded-3xl bg-white p-[18px] shadow-[0_2px_12px_rgba(15,42,31,0.06)]">
                        <h2 className="mb-5 text-base font-bold">Interview setup</h2>

                        <Field label="Interview mode">
                            <OptionGrid cols="grid-cols-1 sm:grid-cols-3">
                                {MODES.map((m) => (
                                    <OptionCard
                                        key={m.value}
                                        label={m.label}
                                        hint={m.hint}
                                        selected={mode === m.value}
                                        onSelect={() => setMode(m.value)}
                                    />
                                ))}
                            </OptionGrid>
                        </Field>

                        <Field label="Target role" htmlFor="target-role">
                            <input
                                id="target-role"
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. Backend Developer"
                                className="h-11 w-full rounded-xl border border-[#dbe3de] bg-white px-4 text-sm placeholder:text-[#9aa8a0] focus:border-[#0f7a56] focus:outline-none focus:ring-2 focus:ring-[#0f7a56]/20"
                            />
                        </Field>

                        <Field label="Interview type">
                            <OptionGrid cols="grid-cols-2 sm:grid-cols-4">
                                {TYPES.map((t) => (
                                    <OptionCard
                                        key={t.value}
                                        label={t.label}
                                        hint={t.hint}
                                        selected={type === t.value}
                                        onSelect={() => setType(t.value)}
                                    />
                                ))}
                            </OptionGrid>
                        </Field>

                        <Field label="Difficulty">
                            <OptionGrid cols="grid-cols-1 sm:grid-cols-3">
                                {DIFFICULTIES.map((d) => (
                                    <OptionCard
                                        key={d.value}
                                        label={d.label}
                                        hint={d.hint}
                                        selected={difficulty === d.value}
                                        onSelect={() => setDifficulty(d.value)}
                                    />
                                ))}
                            </OptionGrid>
                        </Field>

                        <Field label="Duration">
                            <OptionGrid cols="grid-cols-1 sm:grid-cols-3">
                                {DURATIONS.map((d) => (
                                    <OptionCard
                                        key={d.value}
                                        label={d.label}
                                        hint={d.hint}
                                        selected={duration === d.value}
                                        onSelect={() => setDuration(d.value)}
                                    />
                                ))}
                            </OptionGrid>
                        </Field>

                        <Field label="Focus topics">
                            <div className="flex flex-wrap gap-2">
                                {TOPICS.map((topic) => {
                                    const active = topics.includes(topic);
                                    return (
                                        <button
                                            key={topic}
                                            type="button"
                                            aria-pressed={active}
                                            onClick={() => toggleTopic(topic)}
                                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7a56]/40 ${active
                                                ? "bg-[#0f7a56] text-white"
                                                : "bg-[#eaf0ec] text-[#3d4f46] hover:bg-[#dfe8e2]"
                                                }`}
                                        >
                                            {topic}
                                        </button>
                                    );
                                })}
                            </div>
                        </Field>

                        <div className="mt-6 divide-y divide-[#edf1ee]">
                            <ToggleRow
                                title="Code editor"
                                description="Write and run code during the interview"
                                checked={codeEditor}
                                onChange={setCodeEditor}
                            />
                            <ToggleRow
                                title="Hints"
                                description="Allow up to 2 hints per question"
                                checked={hints}
                                onChange={setHints}
                            />
                        </div>
                    </section>

                    {/* Summary */}
                    <aside className="flex flex-col gap-5 lg:sticky lg:top-8">
                        <section className="rounded-3xl bg-white p-[18px] shadow-[0_2px_12px_rgba(15,42,31,0.06)]">
                            <h2 className="mb-4 text-base font-bold">Session summary</h2>
                            <dl className="divide-y divide-[#edf1ee] text-sm">
                                <SummaryRow label="Role" value={summary.role} />
                                <SummaryRow label="Mode" value={summary.mode} />
                                <SummaryRow label="Type" value={summary.type} />
                                <SummaryRow label="Difficulty" value={summary.difficulty} />
                                <SummaryRow label="Length" value={summary.length} />
                                <SummaryRow label="Questions" value={summary.questions} />
                            </dl>
                            <button
                                type="button"
                                onClick={handleStart}
                                disabled={!canStart || startMutation.isPending}
                                className="mt-4 h-11 w-full rounded-xl bg-[#0f7a56] text-sm font-semibold text-white transition-colors hover:bg-[#0c6a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7a56]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {startMutation.isPending ? "Starting..." : "Start interview"}
                            </button>

                            {!canStart && (
                                <p className="mt-2 text-xs text-[#6b7a72]">Enter a target role to continue.</p>
                            )}
                            {startMutation.isError && (
                                <p role="alert" className="mt-2 text-xs text-red-600">
                                    {startMutation.error.message}
                                </p>
                            )}
                        </section>

                        <section className="rounded-3xl bg-gradient-to-b from-white to-[#f3f8f5] p-[18px] shadow-[0_2px_12px_rgba(15,42,31,0.05)]">
                            <h3 className="text-sm font-bold">Tip</h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-[#5f6f67]">
                                Think aloud. The interviewer scores your reasoning, not only the
                                final answer.
                            </p>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
}

/* ---------- Building blocks ---------- */

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-5">
            <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-semibold">
                {label}
            </label>
            {children}
        </div>
    );
}

function OptionGrid({
    cols,
    children,
}: {
    cols: string;
    children: React.ReactNode;
}) {
    return (
        <div role="radiogroup" className={`grid gap-3 ${cols}`}>
            {children}
        </div>
    );
}

function OptionCard({
    label,
    hint,
    selected,
    onSelect,
}: {
    label: string;
    hint: string;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={onSelect}
            className={`rounded-2xl border px-3.5 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7a56]/40 ${selected
                ? "border-[#0f7a56] bg-[#e9f7ef] shadow-[0_0_0_3px_rgba(15,122,86,0.12)]"
                : "border-[#dbe3de] bg-white hover:border-[#b9c8bf]"
                }`}
        >
            <span className="block text-sm font-semibold">{label}</span>
            <span className="mt-0.5 block text-xs leading-snug text-[#6b7a72]">
                {hint}
            </span>
        </button>
    );
}

function ToggleRow({
    title,
    description,
    checked,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-[#6b7a72]">{description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={title}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f7a56]/40 focus-visible:ring-offset-2 ${checked ? "bg-[#0f7a56]" : "bg-[#c9d3cd]"
                    }`}
            >
                <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between py-3">
            <dt className="text-[#6b7a72]">{label}</dt>
            <dd className="max-w-[60%] truncate font-semibold">{value}</dd>
        </div>
    );
}