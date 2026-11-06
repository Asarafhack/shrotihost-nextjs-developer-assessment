import { NextRequest, NextResponse } from "next/server";
import { aiAdvisorService } from "@/lib/services/ai-advisor";

export async function POST(req: NextRequest) {
  try {
    let body: {
      message?: string;
      history?: { role: "user" | "assistant" | "system"; content: string }[];
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { success: false, error: "Field 'message' is required." },
        { status: 400 }
      );
    }

    const result = await aiAdvisorService.consult({
      message: body.message,
      history: body.history || [],
    });

    return NextResponse.json(
      {
        success: true,
        ...result,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error).message || "Error consulting AI advisor." },
      { status: 500 }
    );
  }
}
