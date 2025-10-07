import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const USER = process.env.ADMIN_USER || "admin";
  const PASS = process.env.ADMIN_PASS || "Family1962-2007";

  // option logout pour forcer la déconnexion
  const url = new URL(req.url);
  if (url.searchParams.get("logout") === "1") {
    return new NextResponse("Déconnexion effectuée", {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
        "WWW-Authenticate": `Basic realm="Logout-${Date.now()}"`,
      },
    });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      // atob est dispo dans l'Edge Runtime
      const [user, pass] = atob(auth.split(" ")[1] || "").split(":");
      if (user === USER && pass === PASS) return NextResponse.next();
    } catch {}
  }

  return new NextResponse("Authentification requise", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Espace Admin"',
    },
  });
}
