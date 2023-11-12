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
import { useSession } from "@/contexts/SessionContext";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogUser({
    open,
    onClose,
    userId,
    children,
}: {
    open: boolean;
    onClose?: () => void;
    userId?: any;
    children?: React.ReactNode;
}) {
    const { sessionData, requestUpdate } = useSession();

    const [localOpen, setLocalOpen] = React.useState(false);

    const handleClose = () => {
        setLocalOpen(false);
    };

    React.useEffect(() => {
        if (onClose) {
            setLocalOpen(open);
        }
    }, [open, onClose]);
    //
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
            {children}
            <Dialog
                fullScreen
                open={onClose ? open : localOpen}
                onClose={onClose || handleClose}
                TransitionComponent={Transition}
            >
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    <ServiceWindow
                        onClose={onClose || handleClose}
                        userId={sessionData?.user?.id}
                        requestUpdate={requestUpdate}
                    />
                </Box>
            </Dialog>
        </div>
    );
}
