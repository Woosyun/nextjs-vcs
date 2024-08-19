import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import vcs from '@/lib/vcs/vcs';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('(set-dir) body: ', body);

  // Error handling for missing or invalid directory
  if (!isDirValid(body.directory)) {
    if (!cookies().has('directory')) {
      console.log('(set-dir) Invalid directory:', body.directory);
      return NextResponse.json({ error: 'Invalid directory' }, { status: 400 });
    } else {
      console.log("(set-dir) Invalid directory, using cookie's directory:", cookies().get('directory')!.toString());
      vcs.init(cookies().get('directory')!.toString());
    }
  } else {
    vcs.init(body.directory);
  }

  return NextResponse.json({ message: 'Directory set' });
}

function isDirValid(dir: string): boolean {
  if (!dir) return false;

  // Check if the path exists and is a directory
  try {
    const stat = fs.statSync(dir);
    return stat.isDirectory();
  } catch (error) {
    console.error('Directory validation error:', error);
    return false;
  }
}