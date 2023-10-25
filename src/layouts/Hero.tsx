"use client";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
// import servicesTwo from "@/../public/images/servicesTwo.jpg";
import heroRabbit from "@/../public/images/heroRabbit.webp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ContactData } from "@/data/ContactData";
import Link from "next/link";
import TextCarousel from "@/feedback/TextCarousel";
// "repeat(auto-fit, minmax(500px, auto))",
import ServicesCard from "@/components/ServicesCard";
import { ServicesData } from "@/data/ServicesData";

import { Grid } from "@mui/material";
import { SetStateAction, useState } from "react";
import ServiceWindow from "@/components/function/ServiceWindow";
import { Collapse } from "@mui/material";
import FullScreenDialog from "@/feedback/FullScreenDialog";

export default function Hero() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [showMore, setShowMore] = useState(false); // Nuevo estado

    const handleCardClick = (product: SetStateAction<string>) => {
        setSelectedProduct(product);
    };

    const handleShowMore = () => {
        setShowMore(!showMore); // Cambia el estado cada vez que se hace click
    };

    const servicesToShow = showMore ? ServicesData : ServicesData.slice(0, 4);

    let height = "";

    if (showMore) {
        if (selectedProduct !== "") {
            height = "1510px";
        } else {
            height = "1240px";
        }
    } else {
        if (selectedProduct !== "") {
            height = "1240px";
        } else {
            height = "1040px";
        }
    }
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (product: SetStateAction<string>) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };
    return (
        <>
            <Box
                sx={{
                    display: "grid",
                    gridGap: "8px",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, auto))",
                    // marginTop: "1rem",}
                    marginLeft: { xs: "0rem", md: "1rem" },
                    marginRight: { xs: "0rem", md: "1rem" },
                    marginBottom: "2rem",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        height: { xs: height, md: "590px" },
                        backgroundColor: "#1e293b",
                        borderRadius: "1.5rem",
                    }}
                >
                    <Stack
                        spacing={2}
                        style={{
                            zIndex: "30",
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                            borderRadius: "1.5rem",
                            textAlign: "center",
                            /*  */
                            backgroundImage: `linear-gradient(0deg, #1e293b 0%, rgba(255,210,52,0) 100%)`,
                        }}
                    >
                        <Stack
                            display={"flex"}
                            justifyContent="center"
                            alignItems="stretch"
                            sx={{
                                width: { xs: "90%", md: "60%" },
                            }}
                            direction="column"
                            spacing={1}
                            color={"white"}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    fontWeight={700}
                                    variant="h2"
                                    component="h2"
                                    sx={{
                                        fontSize: { xs: "2.5rem", md: "4rem" },
                                    }}
                                >
                                    Reviasa: Donde
                                </Typography>
                                <TextCarousel />
                                <Typography
                                    fontWeight={700}
                                    variant="h2"
                                    component="h2"
                                    sx={{
                                        fontSize: { xs: "2.5rem", md: "4rem" },
                                    }}
                                >
                                    se Convierte en
                                </Typography>
                                <TextCarousel />
                                <Typography variant="body1" component="p">
                                    La plataforma que conecta a personas con
                                    profesionales locales. Descubre una nueva
                                    forma de acceder a servicios de calidad en
                                    Chile.
                                </Typography>
                            </Box>
                        </Stack>
                        <Box
                            display={"flex"}
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                borderRadius: "1rem",
                                padding: "0.5rem",
                                width: { xs: "auto", md: "70%" },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        md: "column",
                                    },
                                    gap: 1,
                                    borderRadius: "1rem",
                                    padding: "0.5rem",
                                    paddingTop: "1rem",
                                    width: "100%",
                                    // backgroundColor: "white",
                                    transition: "250ms ease-in-out",
                                    boxShadow: 6,
                                    "&:hover": {
                                        transition: "250ms ease-in-out",
                                        boxShadow: 4,
                                    },
                                    // backgroundColor: "#ffdb5c",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Grid container spacing={0.5}>
                                    {servicesToShow.map(
                                        (service: any, index: any) => (
                                            <ServicesCard
                                                key={index}
                                                service={service}
                                                handleCardClick={() =>
                                                    handleDialogOpen(
                                                        service.title
                                                    )
                                                }
                                                selectedProduct={
                                                    selectedProduct
                                                }
                                            />
                                        )
                                    )}
                                </Grid>
                                <Button onClick={handleShowMore}>
                                    {showMore ? "Mostrar menos" : "Mostrar más"}
                                </Button>
                                <FullScreenDialog
                                    selectedProduct={selectedProduct}
                                    open={dialogOpen}
                                    onClose={() => setDialogOpen(false)}
                                />
                            </Box>
                            <Button
                                size="small"
                                color="secondary"
                                LinkComponent={Link}
                                href="/Características"
                                variant="text"
                                sx={{
                                    transition: "300ms",
                                    textDecoration: "wavy underline",
                                    "&:hover": {
                                        transition: "300ms",
                                        textDecoration: "wavy underline",
                                    },
                                }}
                            >
                                ¿Eres profesional?
                            </Button>
                        </Box>
                    </Stack>
                    <Image
                        src={heroRabbit}
                        alt="Reviasa"
                        fill={true}
                        style={{
                            objectFit: "cover",
                            borderRadius: "1.5rem",
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}
