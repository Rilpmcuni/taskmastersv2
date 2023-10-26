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
import { Box, Chip, Stack, Step, StepLabel, Stepper } from "@mui/material";
import Logo from "@/components/ui/Logo";

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
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    // calc
    const total = metric.price.reduce(
        (sum: number, item: { value: number }) => sum + item.value,
        0
    );
    let emergencyFee = 0;
    if (metric.isEmergency) {
        emergencyFee = total * 0.25;
    }
    const preliminaryCost = total + emergencyFee;

    const steps = [
        {
            label: `Solicitud ${metric.selectedService} ${
                metric.selectedDetailService && -metric.selectedDetailService
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            <Logo />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                    gap: 0.5,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    textAlign={"end"}
                                    fontWeight={"bold"}
                                >
                                    {metric.selectedService}{" "}
                                    {metric.selectedDetailService &&
                                        ` - ${metric.selectedDetailService}`}
                                </Typography>
                                {metric.isEmergency && (
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
                                )}
                            </Box>
                        </Box>
                        <Stack
                            display="flex"
                            direction={"column"}
                            spacing={1}
                            justifyContent={"space-between"}
                            width={"100%"}
                            // padding={1}
                        >
                            <Divider variant="fullWidth" />
                            {metric.price.map((item: any, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Chip
                                        label={item.label}
                                        color="info"
                                        variant="outlined"
                                    />
                                    <Typography
                                        textAlign={"end"}
                                        variant="caption"
                                        sx={{
                                            color: "info.main",
                                        }}
                                    >
                                        {item.value.toLocaleString("es-CL", {
                                            style: "currency",
                                            currency: "CLP",
                                        })}
                                    </Typography>
                                </Box>
                            ))}
                            {metric.isEmergency && (
                                <>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Chip
                                            label="Emergencias 25% extra"
                                            color="success"
                                            variant="outlined"
                                        />
                                        <Typography
                                            textAlign={"end"}
                                            variant="caption"
                                            sx={{
                                                color: "success.main",
                                            }}
                                        >
                                            {emergencyFee.toLocaleString(
                                                "es-CL",
                                                {
                                                    style: "currency",
                                                    currency: "CLP",
                                                }
                                            )}
                                        </Typography>
                                    </Box>
                                </>
                            )}
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
                                    label="Ganancia mínima estimada"
                                    color="success"
                                    variant="outlined"
                                    size="medium"
                                    sx={{
                                        fontSize: "large",
                                        fontWeight: "bold",
                                    }}
                                />
                                <Typography
                                    textAlign={"end"}
                                    variant="h6"
                                    fontWeight={"bold"}
                                    sx={{
                                        color: "success.main",
                                    }}
                                >
                                    {preliminaryCost.toLocaleString("es-CL", {
                                        style: "currency",
                                        currency: "CLP",
                                    })}
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
                                    Descripción de servicio:
                                </Typography>
                                <Typography variant="body1" textAlign={"end"}>
                                    {metric.description
                                        ? metric.description
                                        : "No hay descripción"}
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
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Typography variant="body1">
                                    Fecha y hora:
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: 1,
                                    }}
                                >
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
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="body1"
                                        >
                                            {metric.hour % 12 || 12}
                                            :00
                                            {metric.hour < 12 ? "am" : "pm"}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
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
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {metric.selectedDay[0].replace(
                                                /\./g,
                                                ""
                                            )}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="body1"
                                            fontWeight={"bold"}
                                        >
                                            {metric.selectedDay[1]}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {metric.selectedDay[2]}
                                        </Typography>
                                    </Box>
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
                    {/* <Box
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
                        <Button variant="outlined" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            // onClick={handleRequestNow}
                        >
                            ¡Solicitar ahora!
                        </Button>
                    </Box> */}
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
                            // disabled={index === 0}
                            // onClick={() => {
                            //     handleBack();
                            //     handleScrollTop();
                            // }}
                            variant="outlined"
                        >
                            Volver
                        </Button>
                        <Button
                            onClick={handleNext}
                            size="large"
                            variant="contained"
                            // onClick={() => {
                            //     handleRequestNow();
                            //     window.scrollTo(0, 0);
                            // }}
                        >
                            ¡Solicitar ahora!
                        </Button>
                    </Box>
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
                        <Logo />

                        <Typography variant="h5" fontWeight={"bold"}>
                            ¡Servicio en camino!
                        </Typography>
                        <Typography variant="h6">
                            Detalles, enviados a tu número de WhatsApp
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={"bold"}
                        >
                            puedes salir
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
                    >
                        {/* <Button onClick={handleReset}>Reset</Button> */}
                        {/* <Button
                                size="large"
                                variant="contained"
                                onClick={handleRequestNow}
                            >
                                ¡Solicitar ahora!
                            </Button> */}
                    </Box>
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
                metric.nam
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <Stack
                    direction={"row"}
                    spacing={0.5}
                    paddingLeft={2}
                    alignItems={"center"}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => {
                            // if (onClose) {
                            //     onClose();
                            //     setActiveStep(0);
                            // }
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
                            backgroundColor: "text.primary",
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
                            return <>{step.description}</>;
                        }
                        return null;
                    })}
                </Box>
            </Dialog>
        </div>
    );
}
