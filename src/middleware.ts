import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const SESSION_COOKIE_NAME = "tt_session";

/**
 * Chequea solo la EXISTENCIA de la cookie de sesión (no valida contra la
 * tabla `Session` de MySQL — eso corre en Node, no en el Edge runtime del
 * middleware). La validación real pasa en `getSessionUser()` del lado del
 * server (API routes / server components), que sí puede quedar obsoleta
 * si el cookie existe pero la sesión ya expiró en la DB; por eso el layout
 * del dashboard vuelve a chequear con `/api/auth/me` como red de seguridad.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = req.cookies.has(SESSION_COOKIE_NAME);
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  if (!hasSession && !isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (hasSession && isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Excluye internals de Next y cualquier archivo estático de /public (los
  // que tienen extensión, ej. /escudo-ipn.png) — si no, next/image dispara
  // un fetch interno sin cookies que el middleware redirige a /login.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\.[\\w]+$).*)"],
};
