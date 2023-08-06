"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import Top from "@/layouts/Top";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    Skeleton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { Metadata, ResolvingMetadata } from "next";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import GasMeterTwoToneIcon from "@mui/icons-material/GasMeterTwoTone";
import Hero from "@/layouts/Hero";
import Features from "@/layouts/Features";
import Services from "@/layouts/Services";
import Contact from "@/layouts/Contact";
import CallUs from "@/layouts/CallUs";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobCard from "@/components/JobCard";
import Logo from "@/components/ui/Logo";
import { ContactData } from "@/data/ContactData";

interface Job {
    id: any; // Reemplaza esto con el tipo correcto para el id si es diferente
    title: string;
    location: any;
    experience: any;
    salary: any;
    role: any;
    employ: any;
    content: string;
    Job: any;
    responsibilities: any;
    requirements: any;
    valued: any;
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
    /*  */
    /* datos del empleo convertidos */
    /*  */
    function obtenerNombreRegion(numero: number): string {
        const regiones: { [key: number]: string } = {
            1: "Arica y Parinacota",
            2: "Tarapacá",
            3: "Antofagasta",
            4: "Atacama",
            5: "Valparaíso",
            6: "Coquimbo",
            7: "Metropolitana de Santiago",
            8: "Libertador General Bernardo O'Higgins",
            9: "Maule",
            10: "Ñuble",
            11: "Biobío",
            12: "Araucanía",
        };

        return regiones[numero] || "Región no encontrada";
    }
    function obtenerNivelExperiencia(numero: number): string {
        const experiencia: { [key: number]: string } = {
            0: "Sin experiencia",
            1: "1 año exp",
            2: "2 años exp",
            3: "> 3 años exp",
        };

        return experiencia[numero] || "Error experiencia";
    }
    function obtenerEmploy(numero: number): string {
        const employ: { [key: number]: string } = {
            0: "Tiempo completo",
            1: "Medio tiempo",
            2: "Bajo demanda",
            3: "Negociable",
        };

        return employ[numero] || "Error employ";
    }
    function obtenerIco(nombre: any): any {
        const employ: { [key: string]: any } = {
            Gasfitería: (
                <GasMeterIcon
                    sx={{
                        borderRadius: "1rem",
                        border: "5px solid #ffd234",
                        fontSize: "5rem",
                    }}
                    color="primary"
                />
            ),
            Plomería: (
                <PlumbingIcon
                    sx={{
                        borderRadius: "1rem",
                        border: "5px solid #ffd234",
                        fontSize: "5rem",
                    }}
                    color="primary"
                />
            ),
            Electricidad: (
                <ElectricBoltRoundedIcon
                    sx={{
                        borderRadius: "1rem",
                        border: "5px solid #ffd234",
                        fontSize: "5rem",
                    }}
                    color="primary"
                />
            ),
        };

        return employ[nombre] || "Error icon";
    }
    return (
        <>
            <main
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    flexGrow: 1,
                    margin: "1rem",
                    gap: "1rem",
                }}
            >
                {/* sx={{ flexGrow: 1, p:"1rem", margin:"1rem" }}
 sx={{border: "1px solid #e0e0e0", borderRadius:"1.5rem"}} */}
                <Box
                    sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "1.5rem",
                        padding: "1rem",
                        width: "75%",
                    }}
                >
                    <Typography
                        color="text.primary"
                        variant="h4"
                        component="h3"
                        fontWeight={600}
                    >
                        {/* <Skeleton variant="rounded" width={50} height={50} /> */}
                        {empleo ? empleo?.title : <Skeleton width={200} />}
                    </Typography>
                    <Typography
                        color="text.primary"
                        variant="h6"
                        component="h5"
                        fontWeight={600}
                    >
                        {empleo ? (
                            "Descripción del trabajo"
                        ) : (
                            <Skeleton width={300} />
                        )}
                    </Typography>
                    <Typography
                        color="text.primary"
                        variant="body1"
                        sx={{ width: { xs: "100%", md: "90%" } }}
                    >
                        {empleo ? empleo?.content : <Skeleton height={200} />}
                    </Typography>
                    <>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            flexWrap={"wrap"}
                            spacing={2}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: "secondary.main",
                                margin: "-1rem",
                                paddingY: "1rem",
                                marginTop: "1rem",
                            }}
                        >
                            {/* Responsabilidades */}
                            <Box
                                sx={{
                                    width: "30%",
                                    minWidth: 250,
                                }} /* sx={{ minWidth: 275 }} */
                            >
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            Responsabilidades
                                        </Typography>
                                        {empleo ? (
                                            <List dense>
                                                {empleo?.responsibilities.responsabilidades.map(
                                                    (
                                                        responsabilidad: any,
                                                        index: number
                                                    ) => (
                                                        <ListItem
                                                            disableGutters
                                                            key={index}
                                                        >
                                                            <VerifiedIcon
                                                                fontSize="small"
                                                                sx={{
                                                                    mr: "0.30rem",
                                                                    // mr: 0.5,
                                                                }}
                                                                color={
                                                                    "secondary"
                                                                }
                                                            />

                                                            <ListItemText
                                                                primary={
                                                                    responsabilidad
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        ) : (
                                            <List dense disablePadding>
                                                {[0, 1].map(
                                                    (
                                                        // responsabilidad: any,
                                                        index: number
                                                    ) => (
                                                        <ListItem
                                                            disableGutters
                                                            disablePadding
                                                        >
                                                            <VerifiedIcon
                                                                fontSize="small"
                                                                sx={{
                                                                    mr: "0.30rem",
                                                                    // mr: 0.5,
                                                                }}
                                                                color={
                                                                    "secondary"
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    <Skeleton
                                                                        width={
                                                                            "100%"
                                                                        }
                                                                        height={
                                                                            150
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                            {/* requisitos */}
                            <Box
                                sx={{
                                    width: "30%",
                                    minWidth: 100,
                                }} /* sx={{ minWidth: 275 }} */
                            >
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            bgcolor={"secondary"}
                                            sx={{
                                                backgroundColor: "secondary",
                                            }}
                                            variant="h5"
                                            component="div"
                                        >
                                            Requisitos
                                        </Typography>

                                        {empleo ? (
                                            <List dense>
                                                {empleo?.valued.valorado.map(
                                                    (
                                                        valor: any,
                                                        index: number
                                                    ) => (
                                                        <ListItem
                                                            disableGutters
                                                            key={index}
                                                        >
                                                            <VerifiedIcon
                                                                fontSize="small"
                                                                sx={{
                                                                    mr: "0.30rem",
                                                                    // mr: 0.5,
                                                                }}
                                                                color={
                                                                    "secondary"
                                                                }
                                                            />

                                                            <ListItemText
                                                                primary={valor}
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        ) : (
                                            <List dense disablePadding>
                                                {[0].map(
                                                    (
                                                        // responsabilidad: any,
                                                        index: number
                                                    ) => (
                                                        <ListItem
                                                            disableGutters
                                                            disablePadding
                                                        >
                                                            <VerifiedIcon
                                                                fontSize="small"
                                                                sx={{
                                                                    mr: "0.30rem",
                                                                    // mr: 0.5,
                                                                }}
                                                                color={
                                                                    "secondary"
                                                                }
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    <Skeleton
                                                                        width={
                                                                            "100%"
                                                                        }
                                                                        height={
                                                                            150
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                            {/* Se valorará */}
                            <Box
                                sx={{
                                    width: "30%",
                                    minWidth: 100,
                                }} /* sx={{ minWidth: 275 }} */
                            >
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography
                                            bgcolor={"secondary"}
                                            sx={{
                                                backgroundColor: "secondary",
                                            }}
                                            variant="h5"
                                            component="div"
                                        >
                                            Se valorará
                                        </Typography>

                                        <List dense>
                                            {empleo?.valued.valorado.map(
                                                (valor: any, index: number) => (
                                                    <ListItem
                                                        disableGutters
                                                        key={index}
                                                    >
                                                        <VerifiedIcon
                                                            fontSize="small"
                                                            sx={{
                                                                mr: "0.30rem",
                                                                // mr: 0.5,
                                                            }}
                                                            color={"secondary"}
                                                        />

                                                        <ListItemText
                                                            primary={valor}
                                                        />
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                        {/* <Typography variant="body2">
                                            well meaning and kindly.
                                            <br />
                                            {'"a benevolent smile"'}
                                        </Typography> */}
                                    </CardContent>
                                </Card>
                            </Box>
                        </Stack>
                    </>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "25%",
                    }}
                >
                    <Box
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "1.5rem",
                            padding: "1rem",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            fontWeight={600}
                        >
                            {empleo ? (
                                obtenerIco(empleo?.title)
                            ) : (
                                <Skeleton
                                    variant="rounded"
                                    width={"5.6rem"}
                                    height={"5.6rem"}
                                />
                            )}
                        </Typography>

                        <List dense>
                            <ListItem disablePadding disableGutters>
                                <VerifiedIcon
                                    fontSize="small"
                                    sx={{
                                        mr: "0.30rem",
                                        // mr: 0.5,
                                    }}
                                    color={"secondary"}
                                />
                                <ListItemText
                                    primary={"Locación"}
                                    secondary={
                                        empleo ? (
                                            `${obtenerNombreRegion(
                                                empleo?.location
                                            )}, Chile`
                                        ) : (
                                            <Skeleton width={150} />
                                        )
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <VerifiedIcon
                                    fontSize="small"
                                    sx={{
                                        mr: "0.30rem",
                                        // mr: 0.5,
                                    }}
                                    color={"primary"}
                                />
                                <ListItemText
                                    primary={"Experiencia"}
                                    secondary={
                                        empleo ? (
                                            obtenerNivelExperiencia(
                                                empleo?.experience
                                            )
                                        ) : (
                                            <Skeleton width={130} />
                                        )
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <VerifiedIcon
                                    fontSize="small"
                                    sx={{
                                        mr: "0.30rem",
                                        // mr: 0.5,
                                    }}
                                    color={"secondary"}
                                />
                                <ListItemText
                                    primary={"Salario"}
                                    secondary={
                                        empleo ? (
                                            `$${empleo?.salary}.000`
                                        ) : (
                                            <Skeleton width={100} />
                                        )
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <VerifiedIcon
                                    fontSize="small"
                                    sx={{
                                        mr: "0.30rem",
                                        // mr: 0.5,
                                    }}
                                    color={"primary"}
                                />
                                <ListItemText
                                    primary={"Puesto"}
                                    secondary={
                                        empleo ? (
                                            empleo?.role
                                        ) : (
                                            <Skeleton width={80} />
                                        )
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <VerifiedIcon
                                    fontSize="small"
                                    sx={{
                                        mr: "0.30rem",
                                        // mr: 0.5,
                                    }}
                                    color={"secondary"}
                                />
                                <ListItemText
                                    primary={"Tiempo"}
                                    secondary={
                                        empleo ? (
                                            obtenerEmploy(empleo?.employ)
                                        ) : (
                                            <Skeleton width={150} />
                                        )
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "1.5rem",
                            padding: "1rem",
                        }}
                    >
                        <LinkMui
                            component={Link}
                            href={"/"}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            <Logo />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                color="grey.700"
                                sx={{
                                    mr: 2,
                                    fontWeight: 700,
                                    color: "inherit",
                                    textDecoration: "none",
                                    /*  */

                                    backgroundcolor: "primary.main",
                                    backgroundImage: `linear-gradient(to right, #1681FF 23%, #FFD234 42%)`,
                                    "&:hover": {
                                        backgroundImage: `linear-gradient(to right, #FFD234 23%, #1681FF 42%)`,
                                    },
                                    backgroundSize: "100%",
                                    backgroundRepeat: "repeat",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                taskMasters
                            </Typography>
                        </LinkMui>
                        <List dense disablePadding>
                            <ListItem disablePadding disableGutters>
                                <ListItemText primary={ContactData.direction} />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <ListItemText primary={ContactData.number} />
                            </ListItem>
                            <ListItem disablePadding disableGutters>
                                <ListItemText primary={ContactData.mailJob} />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </main>
        </>
    );
}
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
