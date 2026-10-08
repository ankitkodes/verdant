export const interviewKeys = {
    all: ["interview"] as const,
    list: () => [...interviewKeys.all, "list"] as const,
    detail: (id: string) => [...interviewKeys.all, "detail", id] as const,
};