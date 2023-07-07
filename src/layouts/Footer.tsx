"use client";

import React from "react";

import { Link, Box, Stack, Typography } from "@mui/material";

import Logo from "@/components/ui/Logo";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import MarkunreadMailboxRoundedIcon from "@mui/icons-material/MarkunreadMailboxRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';


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
            title: "Llámanos: +56 9 8845 6231",

            ico: (
                <PhoneInTalkIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
        },
        {
            title: "contacto@taskMasters.cl",
            ico: (
                <EmailRoundedIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
        },
        {
            title: "C. Talca 344, Cartagena, Valparaiso, Chile",
            ico: (
                <RoomRoundedIcon
                    fontSize="small"
                    sx={{ mr: "0.30rem" }}
                    color={"primary"}
                />
            ),
        },
        {
            title: "Lunes - Viernes, 9am - 6pm; Fin de semana cerrado",
            ico: <AccessTimeRoundedIcon fontSize="small" sx={{ mr: "0.30rem" }} color={"primary"} />,
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
                <Link
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
                        taskMasters
                    </Typography>
                </Link>
                <Typography variant="body2">
                    Puede confiar en nuestros Taskers y en la profesionalidad de
                    calidad de nuestro trabajo
                </Typography>
                <Typography variant="caption">
                    © {currentYear} taskMasters. Todos los derechos reservados.
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
                                <li
                                    style={{
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
                        {CompaniList.map(({ title, ico }, index) => (
                            <>
                                <li
                                    style={{
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
                                </li>
                            </>
                        ))}
                    </ul>
                </Stack>
            </Stack>
        </Box>
    );
}
