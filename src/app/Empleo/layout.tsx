import { Metadata } from "next";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Breadcrumbs, Typography } from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Ubicacion from "@/components/function/Ubicacion";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    return {
        title: `Empleos | Reviasa`,
        description:
            "Trabaja con un equipo altamente motivado de personas talentosas y excelentes compañeros de equipo.",
    };
}

export default function RootEmpleo({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Ubicacion />
            {children}
        </>
    );
}
