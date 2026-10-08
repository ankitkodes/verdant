// modules/interview/interview.types.ts
export type SessionStatus = "in_progress" | "completed";

export type Session = {
    id: string;
    role: string;
    type: "dsa" | "system_design" | "backend" | "behavioral";
    difficulty: "easy" | "medium" | "hard";
    durationMin: number;
    status: SessionStatus;
    currentQuestion: string;
    startedAt: string; // dates arrive as ISO strings in JSON
};

export type TurnResult = {
    nextQuestion: string | null; // null when the interview is over
    turnNumber: number;
    done: boolean;
};