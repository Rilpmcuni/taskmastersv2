"use client";
import heroImg from "@/../public/images/heroImg.jpg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React from "react";
import Image from "next/image";
import { Box, Button, Container, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SELLO from "@/../public/images/SELLO.svg";
import Logosvg from "@/../public/images/LOGO.svg";
import SocialProofCard from "@/components/SocialProofCard";
import { ServicesData } from "@/data/ServicesData";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import ServiceWindow from "@/components/function/ServiceWindow";
import { Collapse } from "@mui/material";
import Carousel from "./Carousel";

export default function SocialProof() {
    const [selectedProduct, setSelectedProduct] = useState("");

    const handleCardClick = (product: SetStateAction<string>) => {
        setSelectedProduct(product);
    };

    const ProofData = [
        {
            number: "1+",
            description: "año de experiencia en la industria",
        },
        {
            number: "50+",
            description: "clientes satisfechos",
        },
        {
            number: "4.8/5",
            description: "calificación promedio",
        },
        {
            number: "95%",
            description: "proyectos completados exitosamente",
        },
        {
            number: "20+",
            description: "trabajadores calificados",
        },
        {
            number: "4m+",
            description: "no se que poner",
        },
    ];

    return (
        <>
            <Stack
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
                sx={{
                    paddingY: "1rem",
                    marginBottom: "2rem",
                    // bgcolor:"primary.main",
                    // rgba(30,41,59,0.1)
                    // backgroundImage: `linear-gradient(0deg, #ffd234 20%, #1681ff 50%)`,
                    // backgroundImage: `linear-gradient(0deg, #1e293b 5%, #1681ff 100%)`,
                    // borderRadius: "1.5rem",
                }}
            >
                <Typography
                    variant="h4"
                    component="h3"
                    fontWeight={600}
                    color="text.primary"
                >
                    Nuestra reputación habla por sí misma
                </Typography>
                <LinkMui
                    component={Link}
                    href={`/Saber-Mas`}
                    underline="hover"
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                        flexDirection: "row",
                    }}
                >
                    <Typography variant="body2">Saber más</Typography>
                    <NavigateNextRoundedIcon
                        fontSize="small"
                        sx={{ mr: "0.30rem" }}
                        color={"primary"}
                    />
                </LinkMui>
                <Container sx={{ height: "14rem", margin: "0 auto" }}>
                    <Carousel />
                </Container>
                <Container
                    sx={{
                        maxWidth: 900,
                        margin: "0 auto",
                        borderRadius: "1.5rem",
                    }}
                >
                    <Grid container spacing={1}>
                        {ProofData.map((proof: any, index: any) => (
                            <SocialProofCard key={index} proof={proof} />
                        ))}
                    </Grid>
                </Container>
            </Stack>
        </>
    );
}