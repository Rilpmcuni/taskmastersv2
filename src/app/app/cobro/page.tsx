"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import Link from "next/link";
import AccountForm from "@/components/function/AccountForm";
interface Session {
    user: any;
}
export default function Home() {
    const supabase = createClientComponentClient();

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

    return (
        <main>
            <Link href="/app">App</Link>
            <Link href="/">Incio</Link>
            {sessionData?.user.id}
        </main>
    );
}
