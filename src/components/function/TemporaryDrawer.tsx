import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link as LinkMui } from "@mui/material";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Logo from "../ui/Logo";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };
    const [open, setOpen] = React.useState(true);
    const [propiedadesOpen, setPropiedadesOpen] = React.useState(false);
    const [propietarioOpen, setPropietarioOpen] = React.useState(false);
    const [calculaOpen, setCalculaOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handlePropiedadesClick = () => {
        setPropiedadesOpen(!propiedadesOpen);
    };

    const handlePropietarioClick = () => {
        setPropietarioOpen(!propietarioOpen);
    };

    const handleCalculaClick = () => {
        setCalculaOpen(!calculaOpen);
    };
    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                borderRadius: "1rem",
            }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "1rem",
                    justifyContent: "space-around",
                }}
            >
                <Logo />
                <IconButton onClick={toggleDrawer(anchor, false)}>
                    <ClearRoundedIcon />
                </IconButton>
            </Box>
            <ListItemButton dense>
                <ListItemText primary="Servicios" />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton dense>
                <ListItemText primary="Nosotros" />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton dense color="primary">
                <ListItemText primary="Sé un Reviaser" />
            </ListItemButton>
            <Divider variant="middle" />
            <ListItemButton dense color="primary">
                <ListItemText primary="Contacto" />
            </ListItemButton>

            <Divider variant="middle" />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    padding: 1,
                    justifyContent: "space-around",
                    gap: 1,
                }}
            >
                <Button
                    href={`pagar`}
                    variant="contained"
                    size="medium"
                    LinkComponent={Link}
                >
                    pagar servicio
                </Button>
                <Button
                    variant="outlined"
                    href={`/auth`}
                    size="medium"
                    LinkComponent={Link}
                    startIcon={<PersonRoundedIcon />}
                >
                    Acceder
                </Button>
            </Box>
        </Box>
    );

    return (
        <div>
            {(["right"] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        onClick={toggleDrawer(anchor, true)}
                        aria-label="menu"
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                        }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        sx={{
                            // display: { xs: "flex", md: "none" },
                            borderRadius: "1rem",
                        }}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
