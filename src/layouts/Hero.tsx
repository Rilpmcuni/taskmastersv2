"use client";
import heroImg from "@/../public/images/heroImg.jpg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
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
                    marginLeft:"1rem",
                    marginRight:"1rem",
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
                            backgroundImage: `linear-gradient(0deg, #173E6D 0%, rgba(0, 212, 255, 0) 100%)`,
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
                            <Typography
                                fontWeight={700}
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontSize: { xs: "3rem", md: "4rem" },
                                }}
                            >
                                Solucionamos todos sus problemas de hogar
                            </Typography>
                            <Typography variant="body1" component="p">
                                Use y reutilice toneladas de secciones
                                receptivas para crear el diseño perfecto. Las
                                secciones están firmemente organizadas en las
                                categorías iniciales perfectas.
                            </Typography>
                        </Stack>
                        <Box
                            display={"flex"}
                            justifyContent="center"
                            alignItems="stretch"
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                gap: 1
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
                                Llámanos: +56 9 8845 6231
                            </Button>
                            {/*  */}
                        </Box>
                    </Stack>
                    <Image
                        alt="Mountains"
                        src={heroImg}
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                            objectFit: "cover",
                            borderRadius: "1.5rem", // cover, contain, none
                        }}
                    />
                </div>
                {/* And more images in the grid... */}
            </div>
        </>
    );
}
