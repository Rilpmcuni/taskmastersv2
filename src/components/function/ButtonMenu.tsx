"use client";
// import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import {
    Box,
    Divider,
    IconButton,
    Link as LinkMui,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material";
import Link from "next/link";

import {
    Badge,
    Button,
    Stack,
    Typography,
    Paper,
    Avatar,
    Menu,
    MenuList,
    MenuItem,
    Zoom,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import Logo from "@/components/ui/Logo";
import React, { useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export default function ButtonMenu({
    item,
    subItem,
}: {
    item: any;
    subItem: any;
}) {
    const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            boxShadow: theme.shadows[4],
            fontSize: 11,
            padding: "0",
            margin: "0",
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.white,
        },
    }));
    //
    //
    //
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box onClick={handleClick}>{item}</Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                TransitionComponent={Zoom}
            >
                {subItem.map((subItem: any, index: React.Key) => (
                    <LinkMui
                        component={Link}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        href={subItem.href}
                        key={index}
                    >
                        <ListItemButton dense sx={{ gap: 1.5 }}>
                            {subItem.ico}
                            <ListItemText
                                primary={subItem.title}
                                secondary={subItem.description}
                            />
                        </ListItemButton>
                        {index != 2 && <Divider variant="middle" />}
                    </LinkMui>
                ))}
            </Menu>
        </>
    );
}
