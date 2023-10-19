"use client";
import React, { useEffect, useState } from "react";
import { Typography, Stack, Box, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Horario from "@/components/function/Horario";
import Image from "next/image";
import BasicTabs from "@/components/ui/BasicTabs";
import { TextFields } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import ChangeCalendar from "@/components/function/ChangeCalendar";
import FichaView from "@/layouts/app/FichaView";
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
                <Typography variant="h5">Ficha Profesional</Typography>
                {/* <Typography variant="body2">
                    Configura en cualquier momento, cuando lo necesites, cuando
                    quieras.
                </Typography> */}
            </Box>
            <FichaView session={sessionData} />
        </main>
    );
}
