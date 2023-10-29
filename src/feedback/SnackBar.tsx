import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

interface Props {
    children: string;
    message: string;
    fullWidth: boolean;
    onClick: any;
    disabled: boolean;
}
export const SimpleSnackbar: React.FC<Props> = ({
    children,
    message,
    fullWidth,
    onClick,
    disabled,
}) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
        onClick();
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <Button
                size="large"
                disabled={disabled}
                fullWidth={fullWidth}
                variant="contained"
                onClick={handleClick}
            >
                {children}
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                // message={message}
                action={action}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                sx={{
                    margginBottom: "20rem",
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
