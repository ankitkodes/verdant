import { z } from "zod";

export const startInterviewSchema = z.object({
    mode: z.enum(["chat", "voice", "video"]),
    role: z.string().trim().min(1, "Target role is required").max(80),
    type: z.enum(["dsa", "system-design", "backend", "behavioral"]),
    difficulty: z.enum(["easy", "medium", "hard"]),
    duration: z.union([z.literal(15), z.literal(30), z.literal(45)]),
    topics: z.array(z.string()).max(10),
    codeEditor: z.boolean(),
    hints: z.boolean(),
});

export type StartInput = z.infer<typeof startInterviewSchema>;