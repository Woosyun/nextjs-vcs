import { NextRequest, NextResponse } from "next/server";
import vcs from '@/lib/vcs/vcs';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    //일단 add('.')를 여기서 처리하고
    vcs.add('.');
    vcs.commit(message);

    return NextResponse.json({ message: 'commit success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'commit failed' }, { status: 500 });
  }
}