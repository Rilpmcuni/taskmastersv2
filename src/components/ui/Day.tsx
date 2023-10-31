import { Box, Typography } from "@mui/material";
import React from "react";

export default function Day({ day }: { day: string[] }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "center",
                paddingX: 1.5,
                paddingY: 0.3,
                borderRadius: 1,
                border: "1px #d9d9d9 solid",
                "&:hover": {
                    opacity: 0.9,
                },
                boxShadow: "0 0 1px 3px #ffd234",
                height: "fit-content",
            }}
        >
            <Typography
                sx={{
                    pointerEvents: "none",
                }}
                variant="caption"
                color="text.secondary"
            >
                {day[0].replace(/\./g, "")}
            </Typography>
            <Typography
                sx={{
                    pointerEvents: "none",
                }}
                variant="body1"
                fontWeight={"bold"}
            >
                {day[1]}
            </Typography>
            <Typography
                sx={{
                    pointerEvents: "none",
                }}
                variant="caption"
                color="text.secondary"
            >
                {day[2]}
            </Typography>
        </Box>
    );
}
