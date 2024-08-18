'use server'
 
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import vcs from '@/lib/vcs';
 
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('(set-dir) body: ', body);
  const newDir = body.directory ? body.directory : cookies().get('directory');
  
  //TODO: add error handling
  if (body.directory) {
    cookies().set('directory', newDir);
    vcs.init(newDir);
  } else {
    vcs.init(cookies().get('directory')!.toString());
  }

  return NextResponse.json({message: 'directory set'});
}