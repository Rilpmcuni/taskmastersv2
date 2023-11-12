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
import { useRouter } from "next/navigation";
import { TransitionProps } from "@mui/material/transitions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ServiceWindow from "@/components/function/ServiceWindow";
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
import Logo from "@/components/ui/Logo";
import { useSession } from "@/contexts/SessionContext";
import ChipValue from "@/components/ui/ChipValue";
import DialogPer from "./DialogPer";
import Day from "@/components/ui/Day";
import Hour from "@/components/ui/Hour";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenSolic({
    metric,
    open,
    onClose,
}: {
    metric: any;
    open: boolean;
    onClose?: () => void;
}) {
    const router = useRouter();
    const [openAlert, setOpenAlert] = React.useState(false);
    const topRef = React.useRef<HTMLDivElement>(null);
    const supabase = createClientComponentClient();
    const [activeStep, setActiveStep] = React.useState(0);
    const { sessionData, requestUpdate } = useSession();

    // const handleRequestNow = async () => {
    //     try {
    //         const { data, error } = await supabase
    //             .from("request")
    //             .update({
    //                 status: "solicited",
    //                 user_id: sessionData?.user?.id,
    //             })
    //             .eq("id", metric.id);
    //         if (error) {
    //             console.error("Error al solicitar el trabajo:", error);
    //         } else {
    //             setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //             topRef.current?.scrollIntoView({ behavior: "auto" });
    //             setTimeout(() => {
    //                 requestUpdate();
    //                 router.push("/app/metricas/trabajos", { scroll: false });
    //             }, 3000);
    //         }
    //     } catch (error: any) {
    //         alert(error.message);
    //     }
    // };
    const handleRequestNow = async () => {
        try {
            // Primero, obtenemos el estado actual del trabajo
            let { data: jobData, error } = await supabase
                .from("request")
                .select("status")
                .eq("id", metric.id);

            if (error) {
                console.error("Error al obtener el estado del trabajo:", error);
                return;
            }

            // Verificamos si el trabajo aún está disponible
            if (jobData && jobData[0].status !== "published") {
                setOpenAlert(true);
                return;
            }

            // Si el trabajo está disponible, actualizamos su estado a "solicitado"
            let { data, error: updateError } = await supabase
                .from("request")
                .update({
                    status: "solicited",
                    user_id: sessionData?.user?.id,
                })
                .eq("id", metric.id);

            if (updateError) {
                console.error("Error al solicitar el trabajo:", updateError);
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                topRef.current?.scrollIntoView({ behavior: "auto" });
                setTimeout(() => {
                    requestUpdate();
                    router.push("/app/metricas/trabajos", { scroll: false });
                }, 3000);
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    // calc
    const total = metric.price.reduce(
        (sum: number, item: { value: number }) => sum + item.value,
        0
    );
    let emergencyFee = 0;
    if (metric.isEmergency) {
        emergencyFee = total * 0.5;
    }
    let preliminaryCost = total + emergencyFee;
    // Primero calculamos el (11.5%) del costo preliminar
    let fourteenPercent = preliminaryCost * 0.115;

    // Luego lo restamos del costo preliminar
    let finalCost = preliminaryCost - fourteenPercent;
    const handleOpenAlert = () => {
        setOpenAlert(true);
    };
    const steps = [
        {
            label: `Solicitud ${metric.selectedService} ${
                metric.selectedDetailService &&
                `-${metric.selectedDetailService}`
            }`,
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
                            {metric.price.map((item: any, index: number) => (
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
                                label={"Ganancia estimada"}
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

                                <Typography variant="body1">
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
                                <Typography variant="body1" textAlign={"end"}>
                                    {metric.clientNote
                                        ? metric.clientNote
                                        : "Sin comentarios del cliente "}
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
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {/* {metric.name} */}
                                    ### ####
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
                                    +56 9 #### ####
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
                            <Typography variant="h6" gutterBottom>
                                Horario
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
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
                                        Fecha y hora:
                                        </Typography>
                                        <Hour hour={metric.hour} />
                                    </Box>
                                    <Day day={metric.selectedDay} />
                                </Box>
                                <Divider orientation="vertical" />
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
                                <Typography variant="body1">
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
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {/* {metric.number} */}
                                    ###
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
                                <Typography variant="body1">
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
                            justifyContent: "space-between",
                            width: "100%",
                            mt: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                onClose && (onClose(), setActiveStep(0));
                            }}
                        >
                            Cerrar
                        </Button>
                        <DialogPer
                            title={"¿Solicitar trabajo?"}
                            description={
                                " Al solicitar el trabajo, te comprometes a realizarlo en el horario y lugar indicado."
                            }
                            onConfirm={() => {
                                // onClose && (onClose(), setActiveStep(0));
                                handleRequestNow();
                            }}
                            buttonProps={"¡Solicitar Ahora!"}
                        >
                            <Button size="large" variant="contained">
                                ¡Solicitar ahora!
                            </Button>
                        </DialogPer>
                    </Box>
                    <Dialog
                        open={openAlert}
                        onClose={() => {
                            setOpenAlert(false);
                        }}
                        TransitionComponent={Zoom}
                    >
                        <DialogTitle>¡Lo sentimos!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                El trabajo ya no está disponible.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setOpenAlert(false);
                                    onClose && (onClose(), setActiveStep(0));
                                    requestUpdate();
                                }}
                                color="primary"
                            >
                                ¡Entendido!
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ),
        },
        {
            label: "¡Solicitado!",
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
                            ¡Trabajo Solicitado!
                        </Typography>
                        <Typography variant="h6">
                            Tu solicitud ha sido procesada y aceptada. Revisa
                            tus <b>trabajos activos</b> en <b>Metricas</b>
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={"bold"}
                        >
                            Serás redirigido en 3 segundos...
                        </Typography>
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
