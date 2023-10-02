"use client";
import { Metadata } from "next";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Breadcrumbs, Typography } from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
    id: string;
    title: string;
    // Agrega otras propiedades que tenga tu objeto Job si las tienes definidas
}

export default function Ubicacion() {
    const pathname = usePathname();
    const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "");
    const [Jobs, setJobs] = useState<Job[] | null>(null);
    const supabase = createClientComponentClient();

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        const { data } = await supabase.from("empleos").select();
        setJobs(data);
    }

    const empleo = Jobs?.find((p) => pathSegments.includes(p.id));
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft: "2.5rem"}}>
                <LinkMui
                    component={Link}
                    underline="hover"
                    color="inherit"
                    href="/"
                >
                    Reviasa
                </LinkMui>
                {pathSegments.map((segment, index) => {
                    const isLastSegment = index === pathSegments.length - 1;

                    if (isLastSegment && empleo) {
                        return (
                            <Typography key={index} color="text.primary">
                                {empleo.title}
                            </Typography>
                        );
                    }

                    const segmentPath = `/${pathSegments
                        .slice(0, index + 1)
                        .join("/")}`;

                    if (isLastSegment && !empleo) {
                        return (
                            <LinkMui
                                key={index}
                                component={Link}
                                underline="hover"
                                color="inherit"
                                href={segmentPath}
                            >
                                {segment.endsWith("Empleo")
                                    ? segment
                                    : "Cargando..."}
                            </LinkMui>
                        );
                    }

                    return (
                        <LinkMui
                            key={index}
                            component={Link}
                            underline="hover"
                            color="inherit"
                            href={segmentPath}
                        >
                            {segment}
                        </LinkMui>
                    );
                })}
            </Breadcrumbs>
        </>
    );
}
