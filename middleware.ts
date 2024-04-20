import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const routes = [
  "/notes",
  "/reset-passw",
  "/products/edit/[id]",
  "/products/product/[id]",
  "/save-product",

]

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    let { data: { session } } = await supabase.auth.getSession();



    // 
    //  if( request.nextUrl.pathname === "/login"){

    //   return NextResponse.redirect(new URL("/",request.url))
    //  }

/* `request.nextUrl` is attempting to access the `nextUrl` property of the `request` object. However,
in the provided code snippet, `request.nextUrl` is not being used in any meaningful way. It seems
like there might be a typo or an incomplete implementation in the code. */

    if (request.nextUrl.pathname.startsWith("/products")&& !session || routes.includes(request.nextUrl.pathname) && !session) {


      return NextResponse.redirect(new URL("/", request.url))
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
