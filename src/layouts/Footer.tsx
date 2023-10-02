"use client";

import React from "react";

import { Box, Stack, Typography } from "@mui/material";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { ContactData } from "@/data/ContactData";

export default function Footer() {
    /* año */
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    /* paginas */
    const PagesList = [
        {
            title: "Inicio",
        },
        {
            title: "Nosotros",
        },
        {
            title: "Servicios",
        },
        {
            title: "Empleo",
        },
        {
            title: "Contacto",
        },
    ];
    const CompaniList = [
        {
            title: `Llámanos: ${ContactData.number}`,
            ico: (
                <PhoneInTalkIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
            link: `tel:${ContactData.number}`,
        },
        {
            title: ContactData.mail,
            ico: (
                <EmailRoundedIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
            link: `mailto:${ContactData.mail}`,
        },
        {
            title: ContactData.direction,
            ico: (
                <RoomRoundedIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
            link: "https://goo.gl/maps/jvL2fjRRPueTowym6",
        },
        {
            title: "Lunes - Viernes, 9am - 6pm; Fin de semana cerrado",
            ico: (
                <AccessTimeRoundedIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
            link: "",
        },
    ];
    return (
        <Box
            bgcolor={"text.primary"}
            color={"white"}
            py={6}
            px={4}
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "4rem", md: "1rem" },
                // borderTopLeftRadius: "1.5rem",
                // borderTopRightRadius: "1.5rem",
            }}
        >
            <Stack
                justifyContent={"start"}
                direction={"column"}
                sx={{
                    width: { xs: "100%", md: "30%" },
                    gap: "1rem",
                }}
            >
                <LinkMui
                    component={Link}
                    href={"/"}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    <Logo />
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        color="grey.700"
                        sx={{
                            mr: 2,
                            fontWeight: 800,
                            color: "inherit",
                            textDecoration: "none",
                            /*  */

                            backgroundcolor: "primary.main",
                            backgroundImage: `linear-gradient(to right, #1681FF 23%, #FFD234 42%)`,
                            "&:hover": {
                                backgroundImage: `linear-gradient(to right, #FFD234 23%, #1681FF 42%)`,
                            },
                            backgroundSize: "100%",
                            backgroundRepeat: "repeat",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Reviasa
                    </Typography>
                </LinkMui>
                <Typography variant="body2">
                    Simplificando tu hogar, construyendo sonrisas
                </Typography>
                <Typography variant="caption">
                    © {currentYear} Reviasa SpA. Todos los derechos reservados.
                </Typography>
            </Stack>
            <Stack
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "2rem",
                }}
                // spacing={1}
                // direction={"row"}
            >
                <Stack>
                    <Typography variant="body2">Paginas</Typography>
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
                        {PagesList.map(({ title }, index) => (
                            <>
                                <li key={index}>
                                    <LinkMui
                                        component={Link}
                                        href={`/${title}`}
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "flex",
                                            alignItems: "start",
                                            justifyContent: "start",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <WebAssetIcon
                                            fontSize="small"
                                            sx={{ mr: "0.30rem" }}
                                            color={"primary"}
                                        />

                                        <Typography variant="caption">
                                            {title}
                                        </Typography>
                                    </LinkMui>
                                </li>
                            </>
                        ))}
                    </ul>
                </Stack>
                <Stack
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                    }}
                >
                    <Typography variant="body2">Compañía</Typography>
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
                        {CompaniList.map(({ title, ico, link }, index) => (
                            <>
                                <li key={index}>
                                    <LinkMui
                                        target="_blank"
                                        component={Link}
                                        href={link}
                                        color="inherit"
                                        underline="hover"
                                        sx={{
                                            display: "flex",
                                            alignItems: "start",
                                            justifyContent: "start",
                                            flexDirection: "row",
                                        }}
                                    >
                                        {ico}
                                        <Typography variant="caption">
                                            {title}
                                        </Typography>
                                    </LinkMui>
                                </li>
                            </>
                        ))}
                    </ul>
                </Stack>
            </Stack>
        </Box>
    );
}
