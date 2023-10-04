import React from "react";
import Image from "next/image";
import Logosvg from "@/../public/images/LOGO.svg";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Box } from "@mui/material";
import AutoMenu from "../function/AutoMenu";
import LlavasaLogo from "@/../public/images/LlavasaLogo.svg";
import Reviasa from "@/../public/images/ReviasaLogo.svg";
import Mudasa from "@/../public/images/MudasaLogo.svg";

export default function Logo() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
            }}
        >
            <LinkMui
                component={Link}
                href={"/"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": {
                        "& .hoverable": {
                            backgroundPosition: "-40%", // Cambia la posición del fondo al hacer hover
                        },
                    },
                }}
            >
                <Image
                    style={{ pointerEvents: "none" }}
                    className=""
                    src={Logosvg}
                    alt="Reviasa"
                    width={55}
                    height={55}
                    priority
                />
                <Typography
                    variant="h6"
                    noWrap
                    marginBottom={-1}
                    component="div"
                    color="grey.700"
                    className="hoverable"
                    sx={{
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        transition: "background-position 300ms", // Añade la transición aquí
                        backgroundColor: "primary.main",
                        backgroundImage: `linear-gradient(to right, #1681FF 23%, #FFD234 42%)`,
                        backgroundSize: "200% 100%", // Aumenta el tamaño del fondo
                        backgroundPosition: "20%", // Posición inicial del fondo
                        backgroundRepeat: "repeat",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Reviasa
                </Typography>
            </LinkMui>
            <AutoMenu
                subItem={[
                    {
                        title: "Llavasa",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={LlavasaLogo}
                                alt="Llavasa"
                                width={25}
                                height={25}
                                priority
                            />
                        ),
                    },
                    {
                        title: "Reviasa",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={Reviasa}
                                alt="Reviasa"
                                width={25}
                                height={25}
                                priority
                            />
                        ),
                    },
                    {
                        title: "Mudasa",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={Mudasa}
                                alt="Mudasa"
                                width={25}
                                height={25}
                                priority
                            />
                        ),
                    },
                ]}
                item={
                    <IconButton
                        sx={{
                            marginBottom: -1,
                            color: "primary.main",
                            transition: "transform 300ms", // Añade la transición aquí
                            "&:hover": {
                                color: "secondary.main",
                                transform: "rotate(-540deg)", // Añade la rotación aquí
                            },
                        }}
                        aria-label="cambiar"
                    >
                        <ReplayOutlinedIcon />
                    </IconButton>
                }
            />
        </Box>
    );
}
