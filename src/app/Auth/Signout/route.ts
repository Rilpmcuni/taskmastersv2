// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { type NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const supabase = createRouteHandlerClient({ cookies });

//     // Check if we have a session
//     const {
//         data: { session },
//     } = await supabase.auth.getSession();

//     if (session) {
//         await supabase.auth.signOut();
//     }

//     return NextResponse.redirect(new URL("/", req.url)

//     // , {
//     //     status: 302,
//     // }

//     );
// }

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        await supabase.auth.signOut();
    }

    return NextResponse.redirect(new URL("/", req.url));
}
