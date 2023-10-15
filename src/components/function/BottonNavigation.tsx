"use client";
import * as React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
export default function BottonNavigation({
    children,
    pathname,
}: {
    children: any;
    pathname: any;
}) {
    const [value, setValue] = React.useState(
        pathname === "/app/metricas"
            ? 1
            : pathname === "/app/ficha-profecional"
            ? 0
            : 2
    );
    const ref = React.useRef<HTMLDivElement>(null);
    //
    //

    console.log(pathname);
    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Box>
                {children}
                {/* {obtenerPrimeraParte(pathname[0])} */}
            </Box>
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction
                        LinkComponent={Link}
                        href="/app/ficha-profecional"
                        onClick={() => setValue(0)}
                        label="Ficha Profecional"
                        icon={<BadgeRoundedIcon />}
                    />
                    <BottomNavigationAction
                        LinkComponent={Link}
                        href="/app/metricas"
                        onClick={() => setValue(1)}
                        label="Métricas"
                        icon={<LeaderboardRoundedIcon />}
                    />
                    <BottomNavigationAction
                        LinkComponent={Link}
                        href="/app/cobro"
                        onClick={() => setValue(2)}
                        label="Cobro"
                        icon={<AccountBalanceWalletRoundedIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
