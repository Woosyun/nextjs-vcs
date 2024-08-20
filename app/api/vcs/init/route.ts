import { cookies } from "next/headers";
import vcs from '@/lib/vcs/vcs';
import { NextResponse } from "next/server";

export function GET() {
  try {
    const directory = cookies().get('directory')!.value;
    console.log('(api/vcs/init) directory:', directory);
    vcs.init(directory);
    return NextResponse.json({message: "VCS initialized"}, {status: 200});
  } catch (error: any) {
    console.log('(api/vcs/init) error: ', error.message);
    return NextResponse.json({message: "VCS initialization failed"}, {status: 500});
  }
}