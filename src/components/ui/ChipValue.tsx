import { Box, Chip, Typography } from "@mui/material";
import React from "react";

export default function ChipValue({
    label,
    value,
    color = "primary",
    variant = "outlined",
    size = "small",
    onDelete,
}: {
    label: string;
    value: number;
    color?: "success" | "error" | "warning" | "info" | "primary" | "secondary";
    variant?: "outlined" | "filled";
    size?: "small" | "medium" | "large";
    onDelete?: () => void;
}) {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Chip
                    onDelete={onDelete}
                    label={label}
                    color={color}
                    variant={variant}
                    size={
                        color === "error"
                            ? "small"
                            : size === "large"
                            ? "medium"
                            : size
                    }
                    sx={{
                        fontSize: size === "small" ? "auto" : size,
                        fontWeight: size === "large" ? "bold" : "regular",
                    }}
                />
                <Typography
                    textAlign={"end"}
                    variant={
                        size === "small" || size === "medium" ? "caption" : "h6"
                    }
                    fontWeight={size === "large" ? "bold" : "regular"}
                    sx={{
                        color: `${color}.main`,
                    }}
                >
                    {value.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}
                </Typography>
            </Box>
        </>
    );
}
