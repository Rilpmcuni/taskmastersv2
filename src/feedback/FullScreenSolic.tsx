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
import { Box, Chip, Stack } from "@mui/material";
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
    selectedProduct,
    metric,
    open,
    onClose,
}: {
    selectedProduct: any;
    metric: any;
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
                <AppBar
                    color="secondary"
                    variant="outlined"
                    sx={{
                        border: "none",
                        position: "relative",
                        borderBottomLeftRadius: "1rem",
                        borderBottomRightRadius: "1rem",
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
                            Solicitud {selectedProduct}
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    <>
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
                                {/* <Sello /> */}
                                <Stack
                                    display="flex"
                                    direction={"column"}
                                    spacing={1}
                                    justifyContent={"space-between"}
                                    width={"100%"}
                                    // padding={1}
                                >
                                    <Divider variant="fullWidth" />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",

                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Chip
                                            label="Desde"
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
                                            {/* {selectedService &&
                                                selectedService.price.toLocaleString(
                                                    "es-CL",
                                                    {
                                                        style: "currency",
                                                        currency: "CLP",
                                                    }
                                                )} */}
                                        </Typography>
                                    </Box>
                                    {/* {selectedDetailService !== "" && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",

                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <Chip
                                                label={`Caso (${selectedDetailService})`}
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
                                                {selectedService &&
                                                    (
                                                        selectedService?.list?.find(
                                                            (service) =>
                                                                service.title ===
                                                                selectedDetailService
                                                        )?.price || 0
                                                    ).toLocaleString("es-CL", {
                                                        style: "currency",
                                                        currency: "CLP",
                                                    })}
                                            </Typography>
                                        </Box>
                                    )} */}
                                    {/* {metric.isEmergency && selectedService && ( */}
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
                                            color="warning"
                                            variant="outlined"
                                        />
                                        <Typography
                                            textAlign={"end"}
                                            variant="caption"
                                            sx={{
                                                color: "warning.main",
                                            }}
                                        >
                                            {metric.price.toLocaleString(
                                                "es-CL",
                                                {
                                                    style: "currency",
                                                    currency: "CLP",
                                                }
                                            )}
                                        </Typography>
                                    </Box>
                                    {/*  )}*/}
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
                                            label="Coste Preliminar"
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
                                            {metric.price.toLocaleString(
                                                "es-CL",
                                                {
                                                    style: "currency",
                                                    currency: "CLP",
                                                }
                                            )}
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
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {metric.selectedService}
                                        </Typography>
                                    </Box>
                                    {/* {selectedDetailService !== "" && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: 1,
                                            }}
                                        >
                                            <Typography variant="body1">
                                                Caso:
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                {selectedDetailService}
                                            </Typography>
                                        </Box>
                                    )} */}
                                    <Divider variant="middle" />
                                </Stack>
                                <Stack
                                    width={"100%"}
                                    direction={"column"}
                                    spacing={0.5}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Persona
                                    </Typography>
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
                                            variant="body1"
                                            gutterBottom
                                        >
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
                                        <Typography variant="body1">
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
                                        <Typography variant="body1">
                                            Rut:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {metric.rut}
                                        </Typography>
                                    </Box>
                                    <Divider variant="middle" />
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
                                                    boxShadow:
                                                        "0 0 1px 3px #ffd234",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        pointerEvents: "none",
                                                    }}
                                                    variant="body1"
                                                >
                                                    {metric.hour % 12 || 12}:00
                                                    {metric.hour < 12
                                                        ? "am"
                                                        : "pm"}
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
                                                    boxShadow:
                                                        "0 0 1px 3px #ffd234",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        pointerEvents: "none",
                                                    }}
                                                    variant="caption"
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
                                                >
                                                    {metric.selectedDay[2]}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Divider variant="middle" />
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
                                        <Typography variant="body1">
                                            Ciudad:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
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
                                        <Typography variant="body1">
                                            Calle:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
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
                                        <Typography variant="body1">
                                            N°:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {metric.number}
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
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {metric.propiedad}
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
                                            Descripción:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                        >
                                            {metric.description}
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
                                    onClick={onClose || handleClose}
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    size="large"
                                    variant="contained"
                                    // onClick={handleRequestNow}
                                >
                                    ¡Solicitar ahora!
                                </Button>
                            </Box>
                        </Box>
                    </>
                </Box>
            </Dialog>
        </div>
    );
}
