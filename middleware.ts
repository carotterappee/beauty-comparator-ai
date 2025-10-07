import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"], // protège /admin et /api/admin/**
};

export function middleware(req: NextRequest) {
  // 1) récupère l'en-tête Authorization
  const auth = req.headers.get("authorization");

  // Tes identifiants (privilégier les variables d'env en prod)
  const USER = process.env.ADMIN_USER || "admin";
  const PASS = process.env.ADMIN_PASS || "Family1962-2007"; // <- ton mot de passe par défaut (dev)

  // 2) si Authorization: Basic ... est présent, on vérifie
  if (auth && auth.startsWith("Basic ")) {
    try {
      const base64 = auth.split(" ")[1] || "";
      const [user, pass] = Buffer.from(base64, "base64").toString().split(":");
      if (user === USER && pass === PASS) {
        return NextResponse.next(); // OK -> continue
      }
    } catch {
      // on tombera sur le 401 plus bas
    }
  }

  // 3) sinon -> 401 + WWW-Authenticate -> le navigateur affiche la pop-up login
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}
