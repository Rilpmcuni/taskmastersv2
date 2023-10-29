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
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobCard from "@/components/JobCard";

interface Job {
    id: number; // Reemplaza esto con el tipo correcto para el id si es diferente
    title: string;
    Job: any;
    // Agrega otras propiedades que tenga tu objeto Job si las tienes definidas
}

export default function Empleo() {
    const supabase = createClientComponentClient();
    const [Jobs, setJobs] = useState<Job[] | null>(null); // Tipo explícito para Jobs

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        const { data } = await supabase.from("empleos").select();
        setJobs(data);
    }

    return (
        <main>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <>
                    <Stack
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        spacing={1}
                        sx={{
                            // marginBottom: "2rem",
                            bgcolor: "secondary.main",
                            borderRadius: "1.5rem",
                            width: "100%",
                            paddingY: "1rem",
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h3"
                            fontWeight={600}
                            color="text.primary"
                            textAlign={"center"}
                            sx={{
                                paddingX: "1rem",
                            }}
                        >
                            ¡Trabaja con nosotros!
                        </Typography>
                        <Typography
                            color="text.primary"
                            variant="body1"
                            sx={{
                                paddingX: "1rem",
                            }}
                        >
                            Trabaja con un equipo altamente motivado de personas
                            talentosas y excelentes compañeros de equipo.
                        </Typography>
                    </Stack>
                </>

                <Container
                    sx={{ maxWidth: 900, margin: "0 auto", marginY: "1rem" }}
                >
                    <Grid container spacing={1}>
                        {Jobs ? (
                            <>
                                {Jobs.map((Job: any, index: any) => (
                                    <JobCard key={index} Job={Job} />
                                ))}
                            </>
                        ) : (
                            <>
                                {[0, 1, 2].map((dato, index) => (
                                    <Grid
                                        key={index}
                                        item
                                        xs={12}
                                        sm={4}
                                        padding={"2rem"}
                                    >
                                        <Skeleton
                                            variant="rounded"
                                            width={50}
                                            height={50}
                                        />
                                        <Typography variant="h6">
                                            <Skeleton width={"50%"} />
                                        </Typography>
                                        <Skeleton
                                            width={"50%"}
                                            variant="text"
                                            sx={{ fontSize: "1rem" }}
                                        />
                                        <Skeleton
                                            variant="rounded"
                                            height={80}
                                        />
                                        <Typography
                                            variant="body2"
                                            component="div"
                                        >
                                            <Skeleton width={"30%"} />
                                        </Typography>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                </Container>
            </Box>
        </main>
    );
}
