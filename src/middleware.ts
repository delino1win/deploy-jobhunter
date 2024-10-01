import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { jobHunterUrl } from "./utils";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log("Req next url", request.nextUrl.pathname);
    // console.log("Req auth", request.nextauth.token);

    // console.log("Middleware triggered for:");

    const pathName = request.nextUrl.pathname;

    if (
      pathName.startsWith("/company") &&
      request.nextauth.token?.role !== "company"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (
      pathName.startsWith("/user") &&
      request.nextauth.token?.role !== "candidate"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (pathName.startsWith("/job-vacancy") && request.nextauth.token?.role === "company") {

      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    if (pathName.startsWith("/FindJobs/detail") && request.nextauth.token?.role === "company" || !request.nextauth.token?.role) {

      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // if (pathName === "/" && request.nextauth.token?.role === "company") {

    //   return NextResponse.rewrite(new URL("/company/joblisting", request.url));
    // }

    if (pathName.startsWith("/company") && request.nextauth.token?.role !== "company") {

      return NextResponse.rewrite(new URL("/auth/signIn", request.url));
    }

    if (
      (pathName.startsWith("/signUp") || pathName.startsWith("/signIn")) &&
      !!request.nextauth.token
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    return NextResponse.next(); // Allow other requests to proceed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [ "/job-vacancy/:path*", "/company/:path*", "/user/:path*", "/FindJobs/detail/:path*"],
};
