import { NextRequest, NextResponse } from "next/server";

const PROXY_URL = process.env.LANA_PROXY_URL || "http://127.0.0.1:3307";

function proxyHeaders(): HeadersInit {
  const apiKey = process.env.LUX_CODEX_API_KEY;
  return {
    "Content-Type": "application/json",
    ...(apiKey ? { "X-OpenCodex-API-Key": apiKey } : {}),
  };
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("contentBridge") !== "1") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const resp = await fetch(`${PROXY_URL}/api/content-bridge/drafts?target=lux_automaton`, {
      headers: proxyHeaders(),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    return new NextResponse(resp.body, {
      status: resp.status,
      headers: { "Content-Type": resp.headers.get("content-type") || "application/json" },
    });
  } catch {
    return NextResponse.json({
      error: "Lux Codex content bridge is unavailable.",
      status: "NEEDS_SETUP",
      publishing_allowed: false,
    }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await fetch(`${PROXY_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const ct = resp.headers.get("content-type") || "";

    return new NextResponse(resp.body, {
      status: resp.status,
      headers: {
        "Content-Type": ct || "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "LANA service unavailable" },
      { status: 502 }
    );
  }
}
