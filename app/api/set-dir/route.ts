import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const { directory } = await request.json();
  console.log('(set-dir) directory:', directory);

  const absoluteDirectory = makeAbsolutePath(directory);
  console.log('(set-dir) absoluteDirectory:', absoluteDirectory);

  if (!isDirValid(absoluteDirectory)) {
    return NextResponse.json({ error: 'Invalid directory' }, { status: 400 });
  } else {
    cookies().set('directory', absoluteDirectory);
    return NextResponse.json({ message: 'Directory set' });
  }
}

function makeAbsolutePath(dir: string): string {
  // Convert to absolute path if it's not already
  return path.isAbsolute(dir) ? dir : path.resolve(dir);
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
