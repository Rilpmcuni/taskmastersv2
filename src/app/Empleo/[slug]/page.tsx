"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Top from "@/layouts/Top";
import {
    Box,
    Container,
    Grid,
    Link,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";

import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobCard from "@/components/JobCard";
interface Job {
    id: any; // Reemplaza esto con el tipo correcto para el id si es diferente
    title: string;
    content: string;
    Job: any;
    // Agrega otras propiedades que tenga tu objeto Job si las tienes definidas
}
export default function ProyectoPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    // const proyecto = ProyectsData.find((p) => p.page.toLowerCase() === slug);
    // if (!proyecto) {
    //     redirect("/");
    // }
    // console.log(proyecto);
    /*  */
    const supabase = createClientComponentClient();
    const [Jobs, setJobs] = useState<Job[] | null>(null); // Tipo explícito para Jobs

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        const { data } = await supabase.from("empleos").select();
        setJobs(data);
    }
    /*  */
    const empleo = Jobs?.find((p) => p.id === slug);

    return (
        <>
            <main className={""}>
                {slug}
                <Typography
                    color="text.primary"
                    variant="h4"
                    component="h3"
                    fontWeight={600}
                >
                    {empleo?.title}
                </Typography>
                <Typography
                        color="text.primary"
                        variant="body1"
                        sx={{ width: { xs: "100%", md: "60%" } }}
                    >
                        {empleo?.content}
                    </Typography>
            </main>
        </>
    );
}
