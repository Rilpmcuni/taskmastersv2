"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

import PerfilConfig from "@/layouts/app/PerfilConfig";
// chip
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
            <Box
                sx={{
                    padding: "1rem",
                }}
            >
                <Typography variant="h5">Configuración</Typography>
                <Typography variant="body2">
                    Configura en cualquier momento, cuando lo necesites, cuando
                    quieras.
                </Typography>
            </Box>
            <PerfilConfig session={sessionData} />
        </main>
    );
}
