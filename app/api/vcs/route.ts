import vcs from "@/lib/vcs";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json({ vcs: {...vcs} });
}