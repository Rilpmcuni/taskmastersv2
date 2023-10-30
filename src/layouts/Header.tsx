"use client";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { Badge, Button, Stack, Tooltip, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import Zoom from "@mui/material/Zoom";
import { ContactData } from "@/data/ContactData";
import TemporaryDrawer from "@/components/function/TemporaryDrawer";

export default function Header() {
    const [CountEmpleo, setCountEmpleo] = useState(0);
    function moreJob() {
        setCountEmpleo(+1);
    }
    return (
        <Stack
            bgcolor={"white"}
            position={"sticky"}
            top={0}
            display={"flex"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            paddingX={"1rem"}
            zIndex={50}
        >
            <Logo />
            <Stack
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                }}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={1}
            >
                <Button size="small" LinkComponent={Link} href="/Servicios">
                    SERVICIOS
                </Button>
                <Button size="small" LinkComponent={Link} href="/Nosotros">
                    NOSOTROS
                </Button>

                {/* <Badge color="primary" badgeContent={CountEmpleo}> */}
                <Badge
                    sx={{ userSelect: "none" }}
                    color="primary"
                    badgeContent={"+50"}
                >
                    <Tooltip
                        disableInteractive
                        TransitionComponent={Zoom}
                        title="Explora los empleos que tenemos para ti"
                    >
                        <Button
                            LinkComponent={Link}
                            href="/Empleo"
                            sx={{
                                boxShadow: 0,
                                "&:hover": {
                                    boxShadow: 0,
                                    bgcolor: "secondary.dark",
                                },
                            }}
                            variant="contained"
                            color="secondary"
                            onClick={() => setCountEmpleo(CountEmpleo + 1)}
                        >
                            Sé un Reviaser
                        </Button>
                    </Tooltip>
                </Badge>
                <Button size="small" LinkComponent={Link} href="/Contacto">
                    CONTACTO
                </Button>
            </Stack>
            <Stack direction={"row"} spacing={1}>
                <Button
                    href={`/pagar`}
                    variant="contained"
                    size="medium"
                    sx={{
                        display: {
                            xs: "flex",
                            md: "flex",
                        },
                    }}
                    LinkComponent={Link}
                >
                    pagar
                </Button>
                <TemporaryDrawer/>
                <Button
                    variant="outlined"
                    href={`/auth`}
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                    }}
                    size="medium"
                    LinkComponent={Link}
                    startIcon={<PersonRoundedIcon />}
                >
                    Acceder
                </Button>
            </Stack>
        </Stack>
    );
}
