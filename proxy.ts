import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhooks(.*)", "/sign-in(.*)", "/sign-up(.*)", "/privacy-policy", "/terms-and-conditions", '/refund-policy']);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)", "/projects(.*)", "/analytics(.*)"]);
const isAdminOnlyRoute = createRouteMatcher(["/admin(.*)", "/users(.*)", "/settings(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Get the path and query parameters
  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // Paths we DO NOT want to rewrite to /[domain]/...
  const isExcludedPath = 
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/_next");

  let rewriteUrl: URL | null = null;
  if (!isExcludedPath) {
    // Rewrite non-excluded paths to our dynamic /[domain] route
    rewriteUrl = new URL(`/${hostname}${path}`, request.url);
  }

  // Allow public routes
  if (isPublicRoute(request)) {
    if (rewriteUrl) return NextResponse.rewrite(rewriteUrl);
    return NextResponse.next();
  }

  const authObject = await auth();

  // If user is not authenticated, protect will redirect to sign-in
  if (!authObject.userId) {
    await auth.protect();
  }

  const role = authObject.sessionClaims?.metadata?.role || "user";
  // console.log("Role:", role, "for user:", authObject.sessionClaims);

  // Restrict admin-only routes to 'admin' role
  if (isAdminOnlyRoute(request)) {
    if (role === "admin") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (rewriteUrl) {
    return NextResponse.rewrite(rewriteUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
