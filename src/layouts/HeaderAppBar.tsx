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

    const items = [
        {
            text: "Laboratorio",
            icon: <SpaceDashboardTwoToneIcon />,
            subItems: [],
        },
        {
            text: "Carpeta",
            icon: <FolderTwoToneIcon />,
            subItems: [
                {
                    text: "Carpeta",
                    icon: <MailIcon />,
                },
                {
                    text: "Informes",
                    icon: <MailIcon />,
                },
            ],
        },
        {
            text: "Ensayos",
            icon: <ScienceTwoToneIcon />,
            subItems: [
                {
                    text: "Ensayos",
                    icon: <ScienceTwoToneIcon />,
                },
                {
                    text: "Granulometría",
                    icon: <ScienceTwoToneIcon />,
                },
                {
                    text: "Hormigón",
                    icon: <ScienceTwoToneIcon />,
                },
            ],
        },
        {
            text: "Manuales",
            icon: <FeedTwoToneIcon />,
            subItems: [],
        },
        {
            text: "Cursos",
            icon: <SchoolTwoToneIcon />,
            subItems: [],
        },
    ];

    const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[4],
            fontSize: 11,
            padding: "0",
            margin: "0",
        },
    }));
    /* list drawer */
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
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };
    const handleListItemClick = (path: string) => {
        router.push(path);
    };
    const handleCloseDrawer = (anchor: Anchor) => {
        return () => {
            setState({ ...state, [anchor]: false });
        };
    };

    const handleDrawerItemClick = (anchor: Anchor) => {
        const closeDrawer = handleCloseDrawer(anchor);
        closeDrawer();
    };
    function removeAccents(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {items.map((item, index) => (
                    <React.Fragment key={item.text}>
                        <ListItemButton
                            onClick={() =>
                                handleListItemClick(
                                    index === 0
                                        ? "/Laboratorio"
                                        : `/Laboratorio/${item.text}`
                                )
                            }
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.subItems.length > 0 ? (
                                state[anchor] ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )
                            ) : null}
                        </ListItemButton>
                        {item.subItems.length > 0 && (
                            <Collapse
                                in={state[anchor]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItemButton
                                            key={subItem.text}
                                            onClick={() =>
                                                handleListItemClick(
                                                    index === 1
                                                        ? "/Laboratorio/Carpeta"
                                                        : `/Laboratorio/Carpeta/${subItem.text}`
                                                )
                                            }
                                            sx={{ pl: 4 }}
                                        >
                                            <ListItemIcon>
                                                {subItem.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={subItem.text}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    /*  */
    return (
        <Box sx={{ display: "flex" }}>
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
                        {(["left"] as const).map((anchor) => (
                            <React.Fragment key={anchor}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={toggleDrawer(anchor, true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    <Box
                                        role="presentation"
                                        onKeyDown={toggleDrawer(anchor, false)}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Logo />
                                        </Box>
                                        <Divider variant="middle" />
                                        <List>
                                            {items.map((item, index) => {
                                                const normalizedItemText =
                                                    removeAccents(item.text);
                                                const isActivePrimary = (() => {
                                                    const pathSegments =
                                                        pathname
                                                            .split("/")
                                                            .filter(
                                                                (segment) =>
                                                                    segment !==
                                                                    ""
                                                            );
                                                    const decodedLastSegment =
                                                        decodeURIComponent(
                                                            pathSegments[
                                                                pathSegments.length -
                                                                    1
                                                            ]
                                                        );
                                                    const normalizedLastSegment =
                                                        removeAccents(
                                                            decodedLastSegment
                                                        );

                                                    return (
                                                        (index === 0 &&
                                                            pathSegments.length ===
                                                                1 &&
                                                            pathSegments[0] ===
                                                                "Laboratorio") ||
                                                        (pathSegments.length >=
                                                            2 &&
                                                            pathSegments[0] ===
                                                                "Laboratorio" &&
                                                            pathSegments[1] ===
                                                                normalizedItemText)
                                                    );
                                                })();
                                                return (
                                                    <React.Fragment
                                                        key={item.text}
                                                    >
                                                        <ListItemButton
                                                            sx={{
                                                                // display: "flex",
                                                                // flexDirection: "column",
                                                                // alignItems: "center",
                                                                // justifyContent: "center",
                                                                color: isActivePrimary
                                                                    ? "primary.main"
                                                                    : "",
                                                                bgcolor:
                                                                    isActivePrimary
                                                                        ? alpha(
                                                                              theme
                                                                                  .palette
                                                                                  .primary
                                                                                  .main,
                                                                              0.1
                                                                          )
                                                                        : "",
                                                            }}
                                                            LinkComponent={Link}
                                                            href={
                                                                index === 0
                                                                    ? "/Laboratorio"
                                                                    : `/Laboratorio/${normalizedItemText}`
                                                            }
                                                            onClick={() =>
                                                                handleDrawerItemClick(
                                                                    anchor
                                                                )
                                                            }
                                                        >
                                                            <ListItemIcon>
                                                                {item.icon}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    item.text
                                                                }
                                                            />
                                                            {item.subItems
                                                                .length > 0 ? (
                                                                state[
                                                                    anchor
                                                                ] ? (
                                                                    <ExpandLess />
                                                                ) : (
                                                                    <ExpandMore />
                                                                )
                                                            ) : null}
                                                        </ListItemButton>
                                                        {item.subItems.length >
                                                            0 && (
                                                            <Collapse
                                                                in={
                                                                    state[
                                                                        anchor
                                                                    ]
                                                                }
                                                                // in={
                                                                //     isActivePrimary
                                                                // }
                                                                timeout="auto"
                                                                unmountOnExit
                                                            >
                                                                <List
                                                                    component="div"
                                                                    disablePadding
                                                                >
                                                                    {item.subItems.map(
                                                                        (
                                                                            subItem,
                                                                            subIndex
                                                                        ) => {
                                                                            const subItemDecodedText =
                                                                                decodeURIComponent(
                                                                                    subItem.text
                                                                                );
                                                                            const subItemNormalizedText =
                                                                                removeAccents(
                                                                                    subItemDecodedText
                                                                                );
                                                                            const subItemPath = `/Laboratorio/${normalizedItemText}/${subItemNormalizedText}`;
                                                                            const isActiveSubItem =
                                                                                pathname ===
                                                                                subItemPath;

                                                                            return (
                                                                                <ListItemButton
                                                                                    key={
                                                                                        subItem.text
                                                                                    }
                                                                                    LinkComponent={
                                                                                        Link
                                                                                    }
                                                                                    href={
                                                                                        subItemDecodedText
                                                                                            ? `/Laboratorio/${normalizedItemText}/${subItemNormalizedText}`
                                                                                            : `/Laboratorio/${normalizedItemText}`
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleDrawerItemClick(
                                                                                            anchor
                                                                                        )
                                                                                    }
                                                                                    sx={{
                                                                                        pl: 4,
                                                                                        color: isActiveSubItem
                                                                                            ? "primary.main"
                                                                                            : "",
                                                                                        bgcolor:
                                                                                            isActiveSubItem
                                                                                                ? alpha(
                                                                                                      theme
                                                                                                          .palette
                                                                                                          .primary
                                                                                                          .main,
                                                                                                      0.1
                                                                                                  )
                                                                                                : "",
                                                                                    }}
                                                                                >
                                                                                    <ListItemIcon>
                                                                                        {
                                                                                            subItem.icon
                                                                                        }
                                                                                    </ListItemIcon>
                                                                                    <ListItemText
                                                                                        primary={
                                                                                            subItem.text
                                                                                        }
                                                                                    />
                                                                                </ListItemButton>
                                                                            );
                                                                        }
                                                                    )}
                                                                </List>
                                                            </Collapse>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                        <Image
                            className=""
                            src={Logosvg}
                            alt="Reviasa"
                            width={33}
                            height={33}
                            priority
                        />
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
                                {/* <Avatar sx={{ width: 32, height: 32 }}>
                                    C
                                </Avatar> */}
                                <AvatarUser />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Divider variant="middle"/>
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
