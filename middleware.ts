import { auth } from "@/auth";
import { NextResponse } from "next/server";

// List of allowed admin routes
const ADMIN_ROUTES = [
  "/admin",
  "/admin/dashboard",
  "/admin/users",
  "/admin/settings",
  // Add more admin-specific routes here
];

export default auth((req) => {
  // If user is not authenticated, redirect to login
  if (!req.auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check if the current user is the admin
  const isAdmin = req.auth.user.name === "noahdev0";

  // If the user is trying to access an admin route
  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // If the route is an admin route and the user is not an admin
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
