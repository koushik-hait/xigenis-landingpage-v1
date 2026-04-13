import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhooks(.*)", "/sign-in(.*)", "/sign-up(.*)", "/privacy-policy", "/terms-and-conditions", '/refund-policy']);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)", "/projects(.*)", "/analytics(.*)"]);
const isAdminOnlyRoute = createRouteMatcher(["/admin(.*)", "/users(.*)", "/settings(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // Allow public routes
  if (isPublicRoute(request)) {
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
      const url = new URL("/dashboard", request.url);
      return NextResponse.redirect(url);
    }
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
