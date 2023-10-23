import React from "react";
import Image from "next/image";
import Logosvg from "@/../public/images/LOGO.svg";
import { CardActionArea, Link as LinkMui } from "@mui/material";
import Link from "next/link";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { Box } from "@mui/material";
import ButtonMenu from "../function/ButtonMenu";
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
                gap: 0.5,
                userSelect: "none",
            }}
        >
            <CardActionArea
                LinkComponent={Link}
                href={"/"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "inherit",
                    textDecoration: "none",
                    transition: "all 300ms ease-out",
                    width: "auto",
                    margin: "3px",
                    "&:hover": {
                        "& .hoverable": {
                            backgroundPosition: "-40%", // Cambia la posición del fondo al hacer hover
                        },
                        boxShadow: "0 0 1px 2px #ffd234",
                        borderRadius: "1rem",
                    },
                }}
            >
                {/* <LinkMui
                    component={Link}
                    href={"/"}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "inherit",
                        textDecoration: "none",
                        transition: "all 1s ease-out",
                        "&:hover": {
                            "& .hoverable": {
                                backgroundPosition: "-40%", // Cambia la posición del fondo al hacer hover
                            },
                            boxShadow: "0 0 1px 2px #ffd234",
                            borderRadius: "1rem",
                        },
                    }}
                > */}
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
                    paddingRight={0.5}
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
                {/* </LinkMui> */}
            </CardActionArea>
            <ButtonMenu
                subItem={[
                    {
                        title: "Llavasa",
                        description: "Inmobiliaria",
                        href: "https://llavasa.vercel.app/",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={LlavasaLogo}
                                alt="Llavasa"
                                width={40}
                                height={40}
                            />
                        ),
                    },
                    {
                        title: "Reviasa",
                        description: "Servicios",
                        href: "https://reviasa.vercel.app/",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={Reviasa}
                                alt="Reviasa"
                                width={40}
                                height={40}
                            />
                        ),
                    },
                    {
                        title: "Mudasa",
                        description: "Mudanza",
                        href: "https://mudasa.vercel.app/",
                        ico: (
                            <Image
                                style={{ pointerEvents: "none" }}
                                className=""
                                src={Mudasa}
                                alt="Mudasa"
                                width={40}
                                height={40}
                            />
                        ),
                    },
                ]}
                item={
                    <IconButton
                        sx={{
                            marginBottom: "-6px",
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
