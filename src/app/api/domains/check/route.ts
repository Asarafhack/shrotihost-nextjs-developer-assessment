import { NextRequest, NextResponse } from "next/server";
import { registrarService } from "@/lib/services/registrar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain") || searchParams.get("query") || "";

  if (!domain.trim()) {
    return NextResponse.json(
      { success: false, error: "Query parameter 'domain' or 'query' is required." },
      { status: 400 }
    );
  }

  try {
    const result = await registrarService.checkAvailability(domain);
    return NextResponse.json(
      {
        success: true,
        ...result,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: { domain?: string; query?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const domain = body.domain || body.query || "";
    if (!domain.trim()) {
      return NextResponse.json(
        { success: false, error: "Field 'domain' is required." },
        { status: 400 }
      );
    }

    const result = await registrarService.checkAvailability(domain);
    return NextResponse.json(
      {
        success: true,
        ...result,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
