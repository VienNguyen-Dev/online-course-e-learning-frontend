import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_cookies");
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/", "/courses/:path*", "/contact/:path*", "/about-us/:path*", "/pricing/:path*"],
};
