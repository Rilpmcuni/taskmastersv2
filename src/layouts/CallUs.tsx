"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import HandymanIcon from "@mui/icons-material/Handyman";
import { Box, Typography } from "@mui/material";

// autoFill

export default function CallUs() {
    return (
        <Box>
            <Marquee
                autoFill
                loop={0}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffd234",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    userSelect: "none",
                }}
            >
                <Typography
                    color="text.primary"
                    variant="h1"
                    sx={{
                        marginX: { xs: "1.5rem", md: "2.5rem" },
                        fontSize: { xs: "3rem", md: "6rem" },
                    }}
                >
                    LLÁMANOS
                </Typography>
                <HandymanIcon
                    sx={{ fontSize: { xs: "3rem", md: "6rem" }, color: "text.primary" }}
                />
            </Marquee>
        </Box>
    );
}
// 251 191 36
// 2 132 199
