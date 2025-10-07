// middleware.ts (à la RACINE du projet)
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"], // protège /admin et ses sous-routes
};

export default function middleware(req: Request) {
  const username = process.env.BASIC_AUTH_USER || "admin";
  const password = process.env.BASIC_AUTH_PASS || "Family1962-2007"; // fallback pour local

  const auth = req.headers.get("authorization");
  const challenge = new Headers({
    "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
  });

  if (!auth) {
    return new Response("Auth required", { status: 401, headers: challenge });
  }

  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return new Response("Invalid auth", { status: 401, headers: challenge });
  }

  // Edge runtime: atob est dispo
  let decoded = "";
  try {
    decoded = atob(encoded);
  } catch {
    return new Response("Bad base64", { status: 401, headers: challenge });
  }

  const [user, pass] = decoded.split(":");
  if (user !== username || pass !== password) {
    return new Response("Unauthorized", { status: 401, headers: challenge });
  }

  // Petit header de preuve que le middleware a tourné
  const res = NextResponse.next();
  res.headers.set("x-admin-protected", "1");
  return res;
}
