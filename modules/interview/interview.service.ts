import { InterviewRepository } from "./interview.repository";
import { StartInput } from "./interview.schema";

export const InterviewService = {
    async start(userId: string, input: StartInput) {
        return InterviewRepository.create(userId, input);
    }
}