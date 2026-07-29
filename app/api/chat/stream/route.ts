import { NextRequest, NextResponse } from "next/server";

const PROXY_URL = process.env.LANA_PROXY_URL || "http://127.0.0.1:3307";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await fetch(`${PROXY_URL}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "Unknown error");
      return new NextResponse(
        JSON.stringify({ error: errText }),
        { status: resp.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream SSE back to the client
    const reader = resp.body?.getReader();
    if (!reader) {
      return new NextResponse(
        JSON.stringify({ error: "No stream body" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const decoder = new TextDecoder();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
        } catch (err) {
          console.error("[chat/stream] Read error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e.message || "LANA service unavailable" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
