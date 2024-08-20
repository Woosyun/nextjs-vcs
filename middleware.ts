import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware.ts is running");
  
  if (!request.nextUrl.pathname.startsWith('/select-folder') && !request.cookies.get('directory'))
    return NextResponse.redirect(new URL('/select-folder', request.url))

  console.log('(middleware) cookie already exists: ', request.cookies.get('directory'));

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/:path'],  // Matches all paths except those starting with /select-folder
}