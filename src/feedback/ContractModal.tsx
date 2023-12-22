import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { marked } from "marked";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Chip,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Zoom,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import ServiceWindow from "@/components/function/ServiceWindow";
import { useSession } from "@/contexts/SessionContext";
import Logo from "@/components/ui/Logo";
import ContractMarkdown from "./ContractMarkdown";
import JSignature from "./JSignature";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContractModal({
    open,
    onClose,
    userId,
    children,
    sessionData
}: {
    open: boolean;
    onClose?: () => void;
    userId?: any;
    children?: React.ReactNode;
    sessionData: any;
}) {
    // const { sessionData, requestUpdate } = useSession();

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
    const TransitionDialog = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [openAlert, setOpenAlert] = React.useState(false);
    const topRef = React.useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = React.useState(0);

    const markdown = "# Marked in Node.js\n\nRendered by **marked**.";

    const [html, setHtml] = useState("");

    useEffect(() => {
        async function convertMarkdownToHtml() {
            const result = await marked(ContractMarkdown);
            setHtml(result);
        }

        convertMarkdownToHtml();
    }, [ContractMarkdown]);

    const steps = [
        {
            label: "Acuerdo Usuario",
            description: (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Stack
                        display="flex"
                        direction={"column"}
                        spacing={1}
                        justifyContent={"space-between"}
                        width={"100%"}
                        padding={1}
                    >
                        <Typography variant="h5" fontWeight={"bold"}>
                            Acuerdo de Usuario
                        </Typography>
                        <Typography variant="h6">
                            Lease el Acuerdo de Usuario
                        </Typography>
                        <Divider variant="middle" />
                        <Typography variant="body1">
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </Typography>
                        <JSignature sessionData={sessionData} />
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            paddingX: 2,
                            paddingY: 1,
                            justifyContent: "space-between",
                            width: "100%",
                            mt: 1,
                        }}
                    ></Box>
                </Box>
            ),
        },
    ];

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
                    {/*  */}
                    <div>
                        <Button
                            variant="outlined"
                            sx={{
                                display: "none",
                            }}
                        >
                            metric.nam
                        </Button>
                        <Dialog
                            fullScreen
                            open={open}
                            onClose={onClose}
                            TransitionComponent={Transition}
                        >
                            <Stack
                                ref={topRef}
                                direction={"row"}
                                spacing={0.5}
                                paddingLeft={2}
                                alignItems={"center"}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => {
                                        onClose &&
                                            (onClose(), setActiveStep(0));
                                    }}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Stepper
                                    activeStep={activeStep}
                                    orientation="horizontal"
                                    sx={{
                                        p: 2,
                                        backgroundColor: "info.main",
                                        borderBottomLeftRadius: "1.5rem",
                                        // borderTopLeftRadius: "1.5rem",
                                        flexGrow: 1,
                                    }}
                                >
                                    {steps.map((step, index) => (
                                        <Step key={step.label}>
                                            <StepLabel
                                                optional={
                                                    index === activeStep ? (
                                                        <Typography
                                                            variant="body2"
                                                            color="white"
                                                        >
                                                            {step.label}
                                                        </Typography>
                                                    ) : null
                                                }
                                            ></StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Stack>
                            <Box
                                sx={{
                                    height: "100%",
                                }}
                            >
                                {steps.map((step, index) => {
                                    if (index === activeStep) {
                                        return (
                                            <>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "space-between",
                                                        width: "100%",
                                                        alignItems:
                                                            "flex-start",
                                                        paddingX: 1,
                                                        paddingY: 0.5,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                            width: "100%",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "space-between",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <Logo app={true} />

                                                        <Typography
                                                            variant="h6"
                                                            textAlign={"end"}
                                                            sx={{
                                                                paddingX: 1,
                                                            }}
                                                            fontWeight={"bold"}
                                                        ></Typography>
                                                    </Box>
                                                </Box>
                                                {step.description}
                                            </>
                                        );
                                    }
                                    return null;
                                })}
                            </Box>
                        </Dialog>
                    </div>
                    {/*  */}
                </Box>
            </Dialog>
        </div>
    );
}
