import React, { useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Zoom,
} from "@mui/material";
export default function DialogPer({
    title,
    description,
    onConfirm,
    children,
    buttonProps,
}: {
    title: string;
    description: string;
    onConfirm: () => void;
    children?: React.ReactNode;
    buttonProps: string;
}) {
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleStart = () => {
        handleCloseAlert();
        onConfirm();
    };
    return (
        <>
            <Box onClick={handleOpenAlert} sx={{
                width:"100%"
            }}>{children}</Box>
            <Dialog
                open={openAlert}
                onClose={handleCloseAlert}
                TransitionComponent={Zoom}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {children && (
                        <Button
                            variant="outlined"
                            onClick={handleCloseAlert}
                            color="primary"
                            autoFocus
                        >
                            Pensándolo mejor, No
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleStart}
                        color="primary"
                    >
                        {buttonProps}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
