import { startInterviewSchema } from "@/modules/interview/interview.schema";
import { InterviewService } from "@/modules/interview/interview.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = await startInterviewSchema.safeParse(body);
        const UserId = " ";
        // type checking 
        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input", issues: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        // const session = await InterviewService.start(UserId, parsed.data);
        return NextResponse.json({ message: "api called succesfully", id: "session123" });
    } catch (error) {
        return NextResponse.json({ message: "Invalid error occured", status: 403 });
    }
}

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json({ message: "returned successfully" })
    } catch (error) {
        return NextResponse.json({ message: "invalid error occured!" })
    }
}