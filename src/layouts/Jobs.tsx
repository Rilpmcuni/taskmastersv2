"use client";
import React from "react";
import Image from "next/image";
import { Box, Button, Container, Stack } from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Typography } from "@mui/material";
import { SetStateAction, useState } from "react";

export default function Jobs() {
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
                    bgcolor: "secondary.main",
                    // rgba(30,41,59,0.1)
                    // backgroundImage: `linear-gradient(0deg, #1e293b 5%, #ffd234 100%)`,
                    // backgroundImage: `linear-gradient(0deg, #1e293b 5%, #1681ff 100%)`,
                    borderRadius: "1.5rem",
                }}
            >
                <Typography
                    variant="h4"
                    component="h3"
                    fontWeight={600}
                    color="text.primary"
                    textAlign={"center"}
                >
                    Trabaja con nosotros
                </Typography>
                <Typography
                    color="text.primary"
                    variant="body1"
                    sx={{ width: { xs: "100%", md: "50%" } }}
                    textAlign={"center"}
                >
                    Trabaja con un equipo altamente motivado de personas
                    talentosas y excelentes compañeros de equipo.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href={`/Empleo`}
                    sx={{
                        fontSize: "large",
                        boxShadow: 0,
                        "&:hover": {
                            boxShadow: 0,
                        },
                    }}
                    LinkComponent={Link}
                >
                    Lista de empleos
                </Button>
            </Stack>
        </>
    );
}
