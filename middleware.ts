import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useRouter } from "next/router";

// get token function with getToken from next-auth/jwt
export async function middleware(request: NextRequest) {
  const req = request as any;
  const token = await getToken({ req, secret: process.env.JWT_SECRET || "" });
  const url = req.nextUrl;
  const { pathname } = url;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
}

export const config = {
  unstable_includeFiles: [
    "node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)",
  ],
};
