"use client";
import heroImg from "@/../public/images/heroImg.jpg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button, Container, Stack, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import featureImg from "@/../public/images/featureImg.webp";
import SELLO from "@/../public/images/SELLO.svg";
import Logosvg from "@/../public/images/LOGO.svg";

export default function Features() {
    const FeaturesListOne = [
        {
            description: "Rilpnis con experiencia",
        },
        {
            description: "Precio competitivo",
        },
        {
            description: "Opciones sustentables",
        },
    ];
    const FeaturesListTwo = [
        {
            description: "Servicio de Emergencia 24/7",
        },
        {
            description: "Garantía de satisfacción del cliente",
        },
        {
            description: "Comunicación transparente",
        },
    ];

    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // alignItems: { xs: "start", md: "center" },
                    flexDirection: { xs: "column-reverse", md: "row" },
                    gap: "0.5rem",
                    marginBottom: "2rem",
                }}
            >
                <Stack
                    justifyContent={"center"}
                    direction="column"
                    spacing={1}
                    sx={{ width: { xs: "90%", md: "60%" } }}
                >
                    <Typography
                        color="text.primary"
                        variant="h4"
                        component="h3"
                        fontWeight={600}
                    >
                        Nos enfocamos en la satisfacción del cliente y la
                        calidad
                    </Typography>
                    <Typography
                        color="text.primary"
                        variant="body1"
                        sx={{ width: { xs: "100%", md: "60%" } }}
                    >
                        En Rilpni, nuestra prioridad es superar tus
                        expectativas y brindarte servicios de excelencia en cada
                        proyecto. Nos enorgullece ofrecerte una experiencia
                        única y una calidad que puedes confiar. ¿Qué nos
                        distingue?
                    </Typography>
                    <Typography
                        color="text.primary"
                        variant="h6"
                        fontWeight={600}
                    >
                        Una instantánea de las características de Rilpni:
                    </Typography>

                    {/* list */}
                    <Stack direction="row" spacing={2}>
                        {/* List */}
                        <ul
                            style={{
                                listStyleType: "none",
                                listStylePosition: "outside",
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "center",
                                flexDirection: "column",
                                marginLeft: 0,
                                paddingLeft: 0,
                            }}
                        >
                            {FeaturesListOne.map(({ description }, index) => (
                                <>
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <VerifiedIcon
                                            sx={{ mr: "0.30rem" }}
                                            color={"primary"}
                                        />
                                        <Typography
                                            color="text.primary"
                                            variant="body1"
                                        >
                                            {description}
                                        </Typography>
                                    </li>
                                </>
                            ))}
                        </ul>
                        <ul
                            style={{
                                listStyleType: "none",
                                listStylePosition: "outside",
                                display: "flex",
                                alignItems: "start",
                                justifyContent: "center",
                                flexDirection: "column",
                                marginLeft: 0,
                                paddingLeft: 0,
                            }}
                        >
                            {FeaturesListTwo.map(({ description }, index) => (
                                <>
                                    <li
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <VerifiedIcon
                                            sx={{ mr: "0.30rem" }}
                                            color={"secondary"}
                                        />
                                        <Typography variant="body1">
                                            {description}
                                        </Typography>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </Stack>
                </Stack>

                {/* Image */}
                <Stack
                    sx={{
                        alignSelf: "start",
                        position: "relative",
                        marginLeft: "1rem",
                        marginright: "1rem",
                    }}
                >
                    <Stack sx={{ width: { xs: "12rem", md: "24rem" } }}>
                        <Image
                            style={{
                                borderRadius: "1.5rem",
                                width: "100%",
                                height: "auto",
                            }}
                            src={featureImg}
                            alt="Next.js Logo"
                            priority
                        />
                    </Stack>
                    <Stack
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            top: "0px",
                            bottom: "0px",
                            right: { xs: "-5rem", md: "auto" },
                            left: { xs: "auto", md: "-5rem" },
                        }}
                    >
                        <Stack
                            sx={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: { xs: "180px", md: "200px" },
                                height: { xs: "180px", md: "200px" },
                            }}
                        >
                            <Image
                                src={SELLO}
                                className="animate"
                                style={{
                                    borderRadius: "99rem",
                                    width: "100%",
                                    height: "auto",
                                }}
                                alt="Sello"
                                priority
                            />
                            <Stack
                                sx={{
                                    position: "absolute",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    inset: "0px",
                                    borderRadius: "99rem",
                                }}
                            >
                                <Stack
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: "99rem",
                                        p: 1,
                                        width: { xs: "40px", md: "40px" },
                                        height: { xs: "40px", md: "40px" },
                                    }}
                                >
                                    <Image
                                        style={{
                                            borderRadius: "99rem",
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        src={Logosvg}
                                        alt="Rilpni"
                                        // width={55}
                                        // height={55}
                                        priority
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                {/* Sello */}
                {/* Logo */}
            </Container>
        </>
    );
}
