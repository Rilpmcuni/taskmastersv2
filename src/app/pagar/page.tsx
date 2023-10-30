"use client";
import AuthForm from "@/components/ui/AuthForm";
import Logo from "@/components/ui/Logo";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import TextFieldRut from "@/components/ui/TextFieldRut";

interface Job {
    id: number; // Reemplaza esto con el tipo correcto para el id si es diferente
    title: string;
    Job: any;
    user_metadata: any;
    // Agrega otras propiedades que tenga tu objeto Job si las tienes definidas
}
export default function Auth() {
    const supabase = createClientComponentClient();
    const [Jobs, setJobs] = useState<Job[] | null>(null); // Tipo explícito para Jobs
    const [rut, setRut] = useState<string | null>(null);

    const router = useRouter();
    // useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
        // if (event == "SIGNED_IN") router.push("/auth/Callback");

        if (event == "SIGNED_IN") {
            router.push("/auth/Callback");
            setOpen(true);
        }
        // if (event == "INITIAL_SESSION") {
        //     router.push("/auth/Callback");
        // }
    });
    // }, []);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                // width: "100%",
                alignItems: "center",
                height: "100vh",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", md: "50%" },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: { xs: "auto", md: "1.5rem" },
                    borderBottomRightRadius: { xs: "auto", md: "1.5rem" },
                    gap: 1,
                }}
            >
                <Alert
                    variant="filled"
                    severity="warning"
                    sx={{ width: "26rem" }}
                >
                    <AlertTitle sx={{ fontweight: "bold" }}>
                        <strong>En fase de Integración</strong>
                    </AlertTitle>
                </Alert>
                <Card
                    variant="elevation"
                    sx={{
                        position: "relative",
                        overflow: "visible",
                        borderRadius: "1rem",
                        // backgroundColor: "secondary.dark",
                        width: "26rem",
                        border: "none",
                    }}
                >
                    <CardContent>
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={open}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <Stack
                            direction="row"
                            spacing={0}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                fontWeight={600}
                                gutterBottom
                            >
                                <Logo />
                            </Typography>
                        </Stack>
                        <TextFieldRut
                            value={rut || ""}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setRut(e.target.value)}
                        />
                        <Button variant="contained" size="large">Pagar</Button>
                    </CardContent>
                </Card>
                <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{
                        marginTop: "1rem",
                        display: {
                            xs: "flex",
                            md: "none",
                        },
                    }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        LinkComponent={Link}
                        href="/"
                    >
                        Volver al inicio
                    </Button>
                </Stack>
            </Box>
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    width: "50%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        overflow: "visible",
                        borderRadius: "1rem",
                        width: "30rem",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{ fontStyle: "italic" }}
                        gutterBottom
                    >
                        <blockquote>
                            " A veces quisiera tirar la toalla, ¿Pero luego ¿Con
                            qué me seco?
                        </blockquote>
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        LinkComponent={Link}
                        href="/"
                        sx={{ display: "flex" }}
                    >
                        Volver al inicio
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
