"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startInterview } from "./interview.api";
import { interviewKeys } from "./interview.keys";

export const useStartInterview = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: startInterview,
        retry: false, // never repeat a paid LLM call
        onSuccess: () => qc.invalidateQueries({ queryKey: interviewKeys.list() }),
    });
};