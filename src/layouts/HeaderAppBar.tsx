"use client";

import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import Logosvg from "@/../public/images/LOGO.svg";
/*  */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { alpha } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuList,
    MenuItem,
    Paper,
    Zoom,
    Collapse,
} from "@mui/material";
import Link from "next/link";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { ExpandLess, ExpandMore, PersonAdd } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ScienceTwoToneIcon from "@mui/icons-material/ScienceTwoTone";
import FeedTwoToneIcon from "@mui/icons-material/FeedTwoTone";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import Logo from "@/components/ui/Logo";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import AvatarUser from "@/components/ui/AvatarUser";

const drawerWidth = 80;
type Anchor = "top" | "left" | "bottom" | "right";
export default function HeaderAppBar({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme();

    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const router = useRouter();

    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    return (
        <Box sx={{ display: "flex", userSelect: "none" }}>
            {/* desktop */}

            {/* desktop */}
            {/* mobile */}
            <Box>
                <AppBar
                    position="fixed"
                    color="secondary"
                    variant="outlined"
                    sx={{
                        border: "none",
                        zIndex: 50,
                        background: "#fff",
                    }}
                >
                    <Toolbar
                        sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Logo app={true} />
                        <Tooltip
                            title="Configurar Perfil"
                            arrow
                            TransitionComponent={Zoom}
                            disableInteractive
                        >
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={
                                    open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <AvatarUser size={40} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            TransitionComponent={Zoom}
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                            }}
                            anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                }}
                                component={Link}
                                href="/app/config"
                            >
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                Configurar
                            </MenuItem>
                            <Divider variant="middle" />
                            <MenuItem
                                onClick={handleClose}
                                component={Link}
                                href="/Auth/Signout"
                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Cerrar sesión
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                    <Divider variant="middle" />
                </AppBar>
                {/*  */}
            </Box>
            {/* mobile */}

            <Box
                // component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    // paddingX: 0.5,
                    paddingY: 1,
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
}
