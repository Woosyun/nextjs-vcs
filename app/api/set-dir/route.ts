'use server'
 
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('(set-dir) body: ', body);
  const newDir = body.directory;

  cookies().set('directory', newDir);
  return NextResponse.json({message: 'directory set'});
}