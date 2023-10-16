"use client";
import { Typography } from "@mui/material";

import Link from "next/link";

import Horario from "@/components/function/Horario";
export default function Home() {
    return (
        <main>
            <Typography variant="h5">Hola, "nombre de unsuario" 👋</Typography>
            <Horario />
        </main>
    );
}
