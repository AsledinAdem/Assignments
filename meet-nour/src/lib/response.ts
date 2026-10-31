import { NextResponse } from "next/server";

// Every error uses the same shape: { error: { message, fields? } }
export function errorResponse(message: string, status: number, fields?: Record<string, string>) {
  return NextResponse.json({ error: { message, fields } }, { status });
}
