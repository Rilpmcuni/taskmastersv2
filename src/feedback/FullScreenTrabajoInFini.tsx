import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import {
    ListItemButton,
    ListItemIcon,
    MenuItem,
    TextField,
    Zoom,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TransitionProps } from "@mui/material/transitions";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ServiceWindow from "@/components/function/ServiceWindow";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
    Box,
    Chip,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Menu,
    Stack,
    Step,
    StepLabel,
    Stepper,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Logo from "@/components/ui/Logo";
import { useSession } from "@/contexts/SessionContext";
import Link from "next/link";
import TextFieldPrice from "@/components/ui/TextFieldPrice";
import ChipValue from "@/components/ui/ChipValue";
import DialogPer from "./DialogPer";
import Hour from "@/components/ui/Hour";
import Day from "@/components/ui/Day";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenTrabajoInFini({
    metric,
    open,
    onClose,
}: {
    metric: any;
    open: boolean;
    onClose?: () => void;
}) {
    const router = useRouter();
    const topRef = useRef<HTMLDivElement>(null);
    const supabase = createClientComponentClient();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { sessionData, requestUpdate } = useSession();
    const [profesionalNote, setProfesionalNote] = useState(
        metric.profesionalNote
    );
    const [priceItems, setPriceItems] = useState(metric.price);
    // Día y hora
    dayjs.locale("es");
    let currentHour = dayjs().hour();
    const currentDay = dayjs().format("ddd D MMM").split(" ");
    // Día y hora
    const openMenu = Boolean(anchorEl);
    const handlePublishJob = async () => {
        try {
            const { data, error } = await supabase
                .from("request")
                .update({
                    status: "published",
                    user_id: null,
                })
                .eq("id", metric.id);
            if (error) {
                console.error("Error al publicar el trabajo:", error);
            } else {
                // setActiveStep((prevActiveStep) => prevActiveStep + 1);
                // setOpenAlert(false);
                // setTimeout(() => {
                requestUpdate();
                onClose && (onClose(), setActiveStep(0));
                // router.push("/app/metricas/trabajos", { scroll: false });
                // }, 3000);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    const handleCancelJob = async () => {
        try {
            const { data, error } = await supabase
                .from("request")
                .update({
                    status: "cancel",
                })
                .eq("id", metric.id);
            if (error) {
                console.error("Error al publicar el trabajo:", error);
            } else {
                // setActiveStep((prevActiveStep) => prevActiveStep + 1);
                // setOpenAlert(false);
                // setTimeout(() => {
                requestUpdate();
                onClose && (onClose(), setActiveStep(0));
                // router.push("/app/metricas/trabajos", { scroll: false });
                // }, 3000);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    const [newItems, setNewItems] = useState<
        Array<{ label: string; value: number }>
    >([]);
    const [inputState, setInputState] = useState<{
        label: string;
        value: string;
    }>({ label: "", value: "" });
    // calc
    const total =
        metric.price.reduce(
            (sum: number, item: { value: number }) => sum + item.value,
            0
        ) +
        newItems.reduce(
            (sum: number, item: { value: number }) => sum + item.value,
            0
        );
    let emergencyFee = 0;
    if (metric.isEmergency) {
        emergencyFee = total * 0.5;
    }
    const preliminaryCost = total + emergencyFee;

    let fourteenPercent = preliminaryCost * 0.115;

    // Luego lo restamos del costo preliminar
    let finalCost = preliminaryCost - fourteenPercent;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        topRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        topRef.current?.scrollIntoView({ behavior: "auto" });
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleStart = async () => {
        metric.price = [...metric.price, ...newItems];

        //
        try {
            const { error } = await supabase
                .from("request")
                .update({
                    price: priceItems,
                    profesionalNote: metric.profesionalNote,
                    status: "finalized",
                    hourFinish: currentHour,
                    dayFinish: currentDay,
                })
                .eq("id", metric.id);

            if (error) {
                console.error("Error al solicitar el trabajo:", error);
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setOpenAlert(false);
                setTimeout(() => {
                    onClose && (onClose(), setActiveStep(0));
                    requestUpdate();
                    router.push("/app/metricas/trabajos?tab=2", {
                        scroll: false,
                    });
                }, 3000);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const steps = [
        {
            label: `Ficha de trabajo`,
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
                        <Stack
                            display="flex"
                            direction={"column"}
                            spacing={1}
                            justifyContent={"space-between"}
                            width={"100%"}
                            // padding={1}
                        >
                            <Divider>Costos</Divider>
                            {priceItems.map((item: any, index: number) => (
                                <ChipValue
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                    color={"primary"}
                                    size={"medium"}
                                />
                            ))}
                            {metric.isEmergency && (
                                <ChipValue
                                    label={"Emergencias 50% extra"}
                                    value={emergencyFee}
                                    color={"success"}
                                    size={"medium"}
                                />
                            )}
                            <ChipValue
                                label={"Costo preliminar"}
                                value={preliminaryCost}
                                color={"success"}
                                size={"large"}
                            />
                            <Divider>Ganancias</Divider>
                            <ChipValue
                                label={"Comisíon (11.5%)"}
                                value={fourteenPercent}
                                color={"warning"}
                                size={"medium"}
                            />
                            <ChipValue
                                label={"Ganancia"}
                                value={finalCost}
                                color={"success"}
                                size={"large"}
                            />
                            <Divider>Datos</Divider>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Servicio:
                                </Typography>

                                <Typography variant="body2">
                                    {metric.selectedService}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Nota del cliente:
                                </Typography>

                                <Typography variant="body2" textAlign={"end"}>
                                    {metric.clientNote
                                        ? metric.clientNote
                                        : "Sin comentarios del cliente "}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Nota del profesional:
                                </Typography>
                                <Typography variant="body2" textAlign={"end"}>
                                    {metric.profesionalNote
                                        ? metric.profesionalNote
                                        : "Sin comentarios del profesional"}
                                </Typography>
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{
                                    paddingY: 0.5,
                                }}
                            />
                        </Stack>
                        <Stack
                            width={"100%"}
                            direction={"column"}
                            spacing={0.5}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Persona
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Datos ocultos por seguridad
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Nombre y apellido:
                                </Typography>
                                <Typography variant="body2">
                                    {metric.name}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Número de contacto:
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {/* +56 {metric.cellPhone} */}
                                    +56 {metric.cellPhone}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">Rut:</Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {/* {metric.rut} */}
                                    ##.###.###-#
                                </Typography>
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{
                                    paddingY: 0.5,
                                }}
                            />
                            <Typography variant="h6">Horario</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Inicio:
                                        </Typography>
                                        <Hour hour={metric.hour} />
                                    </Box>
                                    <Day day={metric.selectedDay} />
                                </Box>
                                <Divider orientation="vertical" />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Término:
                                        </Typography>
                                        <Hour hour={metric.hourFinish} />
                                    </Box>
                                    <Day day={metric.dayFinish} />
                                </Box>
                            </Box>
                            <Divider
                                variant="middle"
                                sx={{
                                    paddingY: 0.5,
                                }}
                            />
                            <Typography variant="h6" gutterBottom>
                                Dirección
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">Ciudad:</Typography>
                                <Typography variant="body2">
                                    Antofagasta
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">Calle:</Typography>
                                <Typography variant="body1">
                                    {metric.adress}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">N°:</Typography>
                                <Typography variant="body2">
                                    {metric.number}
                                    {/* ### */}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Propiedad:
                                </Typography>
                                <Typography variant="body2">
                                    {metric.propiedad}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            paddingX: 2,
                            paddingY: 1,
                            justifyContent: "end",
                            width: "100%",
                            mt: 1,
                        }}
                    >
                        <Button
                            onClick={handleBack}
                            size="large"
                            variant="contained"
                        >
                            Cerrar
                        </Button>
                    </Box>
                </Box>
            ),
        },
    ];
    // console.log(metric.nam);
    return (
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
                sx={{
                    width: "100%",
                }}
            >
                <Stack
                    ref={topRef}
                    direction={"row"}
                    // spacing={0.5}
                    paddingLeft={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            onClose && (onClose(), setActiveStep(0));
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
                            backgroundColor: "text.secondary",
                            borderBottomLeftRadius: "1.5rem",
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
                                            justifyContent: "space-between",
                                            width: "100%",
                                            alignItems: "flex-start",
                                            paddingX: 1,
                                            paddingY: 0.5,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: 0.5,
                                            }}
                                        >
                                            <Logo app={true} />
                                            {metric.isEmergency ? (
                                                <Chip
                                                    label="¡Emergencia!"
                                                    color="warning"
                                                    variant="outlined"
                                                    size="medium"
                                                    sx={{
                                                        fontSize: "large",
                                                        fontWeight: "bold",
                                                    }}
                                                />
                                            ) : (
                                                <Typography
                                                    variant="h6"
                                                    textAlign={"start"}
                                                    sx={{
                                                        paddingX: 1,
                                                    }}
                                                    fontWeight={"bold"}
                                                >
                                                    {metric.selectedService}{" "}
                                                    {metric.selectedDetailService &&
                                                        ` - ${metric.selectedDetailService}`}
                                                </Typography>
                                            )}
                                        </Box>
                                        {metric.isEmergency! && (
                                            <Typography
                                                variant="h6"
                                                textAlign={"start"}
                                                sx={{
                                                    paddingX: 1,
                                                }}
                                                fontWeight={"bold"}
                                            >
                                                {metric.selectedService}{" "}
                                                {metric.selectedDetailService &&
                                                    ` - ${metric.selectedDetailService}`}
                                            </Typography>
                                        )}
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
    );
}
//
//
//
//
//
//
