import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/select-folder') && !request.cookies.get('directory'))
    return NextResponse.redirect(new URL('/select-folder', request.url))

  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }