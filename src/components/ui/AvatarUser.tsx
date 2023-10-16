"use client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import AvatarClient from "./AvatarClient";
import { useCallback, useEffect, useState } from "react";

export default function AvatarUser() {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState("");

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                if (session?.user.email) {
                    setSession(session.user.email);
                }
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return (
        <>
            <AvatarClient session={session} />
        </>
    );
}
