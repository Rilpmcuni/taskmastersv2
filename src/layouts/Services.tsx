"use client";
import React from "react";
import { Container, Stack } from "@mui/material";
import ServicesCard from "@/components/ServicesCard";
import { ServicesData } from "@/data/ServicesData";

import { Grid, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import ServiceWindow from "@/components/function/ServiceWindow";
import { Collapse } from "@mui/material";

export default function Services({
    textDescription = true,
}:{
    textDescription?: boolean
}) {
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
                spacing={0.5}
                sx={{
                    paddingY: "1rem",
                    marginBottom: "2rem",
                    // bgcolor:"primary.main",
                    // rgba(30,41,59,0.1)
                    // backgroundImage: `linear-gradient(0deg, #ffd234 20%, #1681ff 50%)`,
                    backgroundImage: `linear-gradient(0deg, #1e293b 5%, #1681ff 100%)`,
                    borderRadius: "1.5rem",
                }}
            >
                <Typography
                    variant="h4"
                    component="h3"
                    fontWeight={600}
                    color={"white"}
                >
                    Nuestros Servicios
                </Typography>
                <Container sx={{ maxWidth: 900, margin: "0 auto" }}>
                    <Grid container spacing={1}>
                        {ServicesData.map((service: any, index: any) => (
                            <ServicesCard
                            textDescription={false}
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
                {/* <Collapse
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
                </Collapse> */}
            </Stack>
        </>
    );
}
