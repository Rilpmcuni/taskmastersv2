"use client";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React from "react";
import Image from "next/image";
import { Box, Button, Stack, Typography, Container } from "@mui/material";
import featureImg from "@/../public/images/featureImg.webp";
import CallUsImgTwo from "@/../public/images/CallUsImgTwo.webp";

export default function Contact() {
    return (
        <>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // alignItems: { xs: "start", md: "center" },
                    flexDirection: { xs: "column", md: "row" },
                    gap: "0.5rem",
                    marginBottom: "2rem",

                }}
            >
                <Stack sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    flexDirection: "row",
                }}>
                    {[CallUsImgTwo, featureImg].map((image) => (
                        <Box
                            sx={{
                                width: "10rem",
                                height: "24rem",
                                position: "relative",
                                borderRadius: "1.5rem",
                            }}
                        >
                            <Image
                                fill={true}
                                alt="Mountains"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "1.5rem",
                                }}
                                src={image}
                            />
                        </Box>
                    ))}
                </Stack>
                <Stack
                    spacing={2}
                    sx={{ p: 2, width: { xs: "100%", md: "30%" } }}
                >
                    <Typography
                        color="text.primary"
                        variant="h4"
                        component="h3"
                        fontWeight={600}
                    >
                        Respondemos a su llamada rápidamente
                    </Typography>
                    <Typography color="text.primary" variant="body1">
                        Puede confiar en nuestros Taskers y en la
                        profesionalidad de calidad de nuestro trabajo
                    </Typography>
                    <Stack
                        display={"flex"}
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "column" },
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
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}
