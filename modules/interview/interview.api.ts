import { StartInput } from "./interview.schema";

export const startInterview = async (data: StartInput) => {
    const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};