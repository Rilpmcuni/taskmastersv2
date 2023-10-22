import { Metadata } from "next";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Breadcrumbs, Typography } from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Ubicacion from "@/components/function/Ubicacion";
import BottonNavigation from "@/components/function/BottonNavigation";
import HeaderAppBar from "@/layouts/HeaderAppBar";
import SessionProvider from "@/contexts/SessionContext";

export const metadata: Metadata = {
    title: `App | Reviasa`,
    description:
        "Trabaja con un equipo altamente motivado de personas talentosas y excelentes compañeros de equipo.",
};

export default function RootEmpleo({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SessionProvider>
                <HeaderAppBar>
                    <BottonNavigation>
                        <div
                            style={{
                                borderRadius: "1.5rem",
                                // border: "solid 1px black",
                                position: "fixed",
                                top: 56,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100vh",
                                width: "100%",
                                boxShadow: "0px 0px 0px 15px #fff",
                                zIndex: 40,
                                pointerEvents: "none",
                            }}
                        ></div>
                        {children}
                    </BottonNavigation>
                </HeaderAppBar>
            </SessionProvider>
        </>
    );
}
