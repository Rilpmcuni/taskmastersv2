"use client";
// import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Box, IconButton, Link as LinkMui } from "@mui/material";
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

export default function AutoMenu({
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

    return (
        <>
            <LightTooltip
                TransitionComponent={Zoom}
                placement="bottom"
                arrow
                title={
                    <React.Fragment>
                        <Paper sx={{ maxWidth: "100%" }}>
                            <MenuList dense>
                                {subItem.map(
                                    (subItem: any, index: React.Key) => (
                                        <LinkMui
                                            component={Link}
                                            sx={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                            href={subItem.href}
                                            key={index}
                                        >
                                            <MenuItem>
                                                <ListItemIcon>
                                                    {subItem.ico}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    {subItem.title}
                                                </ListItemText>
                                                {/* <ListItemIcon>
                                                    <OpenInNewRoundedIcon
                                                        fontSize="small"
                                                        color="primary"
                                                    />
                                                </ListItemIcon> */}
                                            </MenuItem>
                                        </LinkMui>
                                    )
                                )}
                            </MenuList>
                        </Paper>
                    </React.Fragment>
                }
            >
                <Box>{item}</Box>
            </LightTooltip>
        </>
    );
}
