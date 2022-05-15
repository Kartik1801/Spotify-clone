import { NextResponse } from "next/server";

const protectedPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (
    protectedPages.find((p) => {
      return p === req.nextUrl.pathname;
    })
  ) {
    const { SPOTIFY_CLONE_ACCESS_TOKEN } = req.cookies;

    if (!SPOTIFY_CLONE_ACCESS_TOKEN) {
      return NextResponse.redirect("signin");
    }
  }
}
