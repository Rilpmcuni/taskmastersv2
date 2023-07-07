"use client";
import heroImg from "@/../public/images/heroImg.jpg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button, Container, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import featureImg from "@/../public/images/featureImg.webp";
import SELLO from "@/../public/images/SELLO.svg";
import Logosvg from "@/../public/images/LOGO.svg";
import ServicesCard from "@/components/ServicesCard";
import { ServicesData } from "@/data/ServicesData";

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

export default function Services() {
    const [selectedProduct, setSelectedProduct] = useState("");

    const handleCardClick = (product: SetStateAction<string>) => {
        setSelectedProduct(product);
    };

    return (
        <>
            <Stack
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
                sx={{
                    marginBottom: "2rem",
                }}
            >
                <Typography variant="h4" component="h3" fontWeight={600} color={"text.primary"}>
                    Nuestros Servicios
                </Typography>
                <Container sx={{ maxWidth: 900, margin: "0 auto" }}>
                    <Grid container spacing={1}>
                        {ServicesData.map((service: any, index: any) => (
                            <ServicesCard
                                key={index}
                                service={service}
                                handleCardClick={() =>
                                    handleCardClick(service.title)
                                }
                                selectedProduct={selectedProduct}
                            />
                        ))}
                    </Grid>
                </Container>
                <Collapse
                    in={selectedProduct !== ""}
                    sx={{
                        maxWidth: "90%",
                        minWidth: "90%",
                        minHeimaxHeight: "16rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ServiceWindow />
                </Collapse>
            </Stack>
        </>
    );
}
