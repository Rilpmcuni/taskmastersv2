"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Container, Stack } from "@mui/material";
import SocialProofCard from "@/components/SocialProofCard";
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
            description: "trabajadores satisfechos",
        },
        {
            number: "20+",
            description: "trabajadores calificados",
        },
        {
            number: "2+",
            description: "ciudades que trabajámos",
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
                    textAlign={"center"}
                >
                    Nuestra reputación habla por sí misma
                </Typography>
                <Button
                    size="small"
                    href={`/Saber-Mas`}
                    sx={{ borderRadius: "2rem", fontSize: "small" }}
                    LinkComponent={Link}
                    endIcon={
                        <NavigateNextRoundedIcon
                            fontSize="small"
                            sx={{ mr: "0.30rem" }}
                            color={"primary"}
                        />
                    }
                >
                    Saber más
                </Button>
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
