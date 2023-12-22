import { Box, Typography } from "@mui/material";
import React from "react";

export default function Hour({ hour }: { hour: any }) {
    return (
        <Box
            sx={{
                display: "flex",
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
                variant="body1"
            >
                {/* {hour % 12 || 12}
                :00
                {hour < 12 ? "am" : "pm"} */}
                {hour.hour}:{String(hour.minute).padStart(2, "0")}
                {hour < 12 ? "am" : "pm"}
            </Typography>
        </Box>
    );
}
