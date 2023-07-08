"use client";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
// import servicesTwo from "@/../public/images/servicesTwo.jpg";
import heroRabbit from "@/../public/images/heroRabbit.webp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ContactData } from "@/data/ContactData";
// "repeat(auto-fit, minmax(500px, auto))",

export default function Hero() {
    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridGap: "8px",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, auto))",
                    // marginTop: "1rem",}
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    marginBottom: "2rem",
                }}
            >
                <div style={{ position: "relative", height: "600px" }}>
                    <Stack
                        spacing={2}
                        style={{
                            zIndex: "40",
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
                            {/* <Typography
                                fontWeight={700}
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontSize: { xs: "3rem", md: "4rem" },
                                }}
                            >
                                Solucionamos todos sus problemas de hogar
                            </Typography> */}
                            <Typography
                                fontWeight={700}
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontSize: { xs: "3rem", md: "4rem" },
                                }}
                            >
                                Tu solución confiable
                                para servicios en el hogar
                            </Typography>
                            {/* Bienvenido a TaskMasters:  */}
                            <Typography variant="body1" component="p">
                                Conéctate con expertos en construcción,
                                remodelación y reparaciones generales
                            </Typography>
                        </Stack>
                        <Box
                            display={"flex"}
                            justifyContent="center"
                            alignItems="stretch"
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 1,
                            }}
                        >
                            <Button
                                size="large"
                                sx={{
                                    fontWeight: 600,
                                    boxShadow: 0,
                                    "&:hover": {
                                        boxShadow: 0,
                                    },
                                }}
                                startIcon={<WhatsAppIcon />}
                                variant="contained"
                                color="success"
                            >
                                Escríbenos
                            </Button>
                            <Button
                            href={`tel:${ContactData.number}`}
                                startIcon={<PhoneInTalkIcon />}
                                size="large"
                                sx={{
                                    fontWeight: 600,
                                    boxShadow: 0,
                                    "&:hover": {
                                        boxShadow: 0,
                                    },
                                }}
                                variant="contained"
                                color="secondary"
                            >
                                {`Llámanos: ${ContactData.number}`}
                            </Button>
                            {/*  */}
                        </Box>
                    </Stack>
                    <Image
                        src={heroRabbit}
                        alt="taskMasters"
                        fill={true}
                        style={{
                            objectFit: "cover",
                            borderRadius: "1.5rem",
                        }}
                    />
                </div>
                {/* And more images in the grid... */}
            </div>
            {/* 
             */}
        </>
    );
}
