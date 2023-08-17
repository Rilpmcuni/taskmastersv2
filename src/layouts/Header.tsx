import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";

import { Badge, Button, Stack, Tooltip, Typography } from "@mui/material";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import Zoom from "@mui/material/Zoom";
import { ContactData } from "@/data/ContactData";

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
            <LinkMui
                component={Link}
                href={"/"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "inherit",
                    textDecoration: "none",
                }}
            >
                <Logo />
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    Rilpni
                </Typography> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="grey.700"
                    sx={{
                        mr: 2,
                        fontWeight: 700,
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
                    Rilpni
                </Typography>
            </LinkMui>
            <Stack
                sx={{ display: { xs: "none", md: "flex" } }}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={1}
            >
                <Button LinkComponent={Link} href="/">
                    Inicio
                </Button>
                <Button LinkComponent={Link} href="/Nosotros">
                    Nosotros
                </Button>
                <Button LinkComponent={Link} href="/Servicios">
                    Servicios
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
                            Empleo
                        </Button>
                    </Tooltip>
                </Badge>
                <Button LinkComponent={Link} href="/Contacto">
                    Contacto
                </Button>
            </Stack>
            <Button
                href={`tel:${ContactData.number}`}
                variant="contained"
                size="medium"
                sx={{ boxShadow: 0 }}
                // sx={{ borderRadius: "0.8rem" }}
                startIcon={<PhoneInTalkIcon />}
                LinkComponent={Link}
            >
                Llámanos
            </Button>
        </Stack>
    );
}
