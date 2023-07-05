import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

import {
    Button,
    Chip,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";
// import Stack from '@mui/material/Stack'
import React from "react";
// color="primary"
export default function Top() {
    return (
        <>
            <Stack
            display={"flex"}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                paddingX={"1rem"}
                paddingY={"0.25rem"}
            >
                <Button
                    size="small"
                    href={"tel:+123456789"}
                    variant="outlined"
                    sx={{ borderRadius: "2rem" }}
                    LinkComponent={Link}
                    startIcon={<LocalPhoneIcon />}
                >
                    Llámanos: +56 9 8845 6231
                </Button>
                {/* <Link
                    href={"tel:+123456789"}
                    underline="hover"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "black",
                        "&:hover": {
                            color: "primary.main",
                        },
                    }}
                >
                    <LocalPhoneIcon />
                    <Typography variant="subtitle2" gutterBottom>
                        Llámanos:
                    </Typography>{" "}
                    <Typography
                        fontWeight={600}
                        variant="subtitle2"
                        gutterBottom
                    >
                        +56 9 8845 6231
                    </Typography>
                </Link> */}
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                >
                    <IconButton size="small" aria-label="Example">
                        <InstagramIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" aria-label="Example">
                        <FacebookIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" aria-label="Example">
                        <LinkedInIcon fontSize="small" color="primary" />
                    </IconButton>
                </Stack>
            </Stack>
        </>
    );
}
