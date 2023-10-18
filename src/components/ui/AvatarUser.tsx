"use client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import AvatarClient from "./AvatarClient";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import AvatarNormal from "./AvatarNormal";
interface Session {
    user: any;
}
export default function AvatarUser() {
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [sessionData, setSessionData] = useState<Session | null>(null);
    useEffect(() => {
        getSessionData();
    }, []);
    async function getSessionData() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        setSessionData(session);
    }
    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`avatar_url`)
                .eq("id", sessionData?.user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {

                setAvatarUrl(data.avatar_url);

            }
        } catch (error) {
            // alert("Error loading user data!");
            // setLastName("Error");
            console.log("error traer datos");
        } finally {
            setLoading(false);
        }
    }, [sessionData?.user, supabase]);

    useEffect(() => {
        getProfile();
    }, [sessionData?.user, getProfile]);

    return (
        <>
            {/* {session ? (
                <AvatarClient session={session} />
            ) : (
                <Skeleton variant="circular" width={40} height={40} />
            )} */}
            <AvatarNormal
                uid={sessionData?.user.id}
                url={avatar_url}
                size={40}
            />
        </>
    );
}
