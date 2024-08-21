import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const directory = cookies().get('directory');

  return NextResponse.json({ directory });
}