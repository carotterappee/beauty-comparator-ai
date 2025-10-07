import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protège /admin et /api/admin/*
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const auth = req.headers.get("authorization");
    const ok = checkBasicAuth(auth);
    if (!ok) {
      return new NextResponse("Auth required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' },
      });
    }
  }
  return NextResponse.next();
}

function checkBasicAuth(authHeader: string | null) {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return false;
  if (!authHeader?.startsWith("Basic ")) return false;

  const base64 = authHeader.split(" ")[1] || "";
  const [user, pass] = Buffer.from(base64, "base64").toString().split(":");
  // on ignore "user", on vérifie juste le password
  return pass === pwd;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // <-- ajoute l'API admin ici
};

