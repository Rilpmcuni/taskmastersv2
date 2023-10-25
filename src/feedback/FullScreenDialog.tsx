import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import ServiceWindow from "@/components/function/ServiceWindow";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
    selectedProduct,
    open,
    onClose,
}: {
    selectedProduct: any;
    open: boolean;
    onClose?: () => void;
}) {
    const [localOpen, setLocalOpen] = React.useState(false);

    const handleClose = () => {
        setLocalOpen(false);
    };

    React.useEffect(() => {
        if (onClose) {
            setLocalOpen(open);
        }
    }, [open, onClose]);

    return (
        <div>
            <Button
                variant="outlined"
                sx={{
                    display: "none",
                }}
            >
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={onClose ? open : localOpen}
                onClose={onClose || handleClose}
                TransitionComponent={Transition}
            >
                {/* <AppBar
                    color="secondary"
                    variant="outlined"
                    sx={{
                        border: "none",
                        position: "relative",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose || handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {selectedProduct}
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    <ServiceWindow
                        onClose={onClose || handleClose}
                        selectedProduct={selectedProduct}
                    />
                </Box>
            </Dialog>
        </div>
    );
}
