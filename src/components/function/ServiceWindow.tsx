"use client";
import React, { useState, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
    Card,
    CardContent,
    CardMedia,
    Chip,
    Collapse,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { Stack } from "@mui/material";
import { ServicesData } from "@/data/ServicesData";
import DateSwiper from "./DateSwiper";
import HourSwiper from "./HourSwiper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import DetailServicesCard from "../DetailServicesCard";

export default function ServiceWindow({
    selectedProduct,
}: {
    selectedProduct: any;
}) {
    let selectedService = ServicesData.find(
        (service) => service.title === selectedProduct
    );
    // date
    dayjs.locale("es");
    let fechas: string[][] = [];
    for (let i = 0; i < 7; i++) {
        let fecha = dayjs().add(i, "day").format("ddd D MMM").split(" ");
        fechas.push(fecha);
    }

    const [selectedFechaIndex, setSelectedFechaIndex] = useState(0);

    let horas = [];
    let currentHour = selectedFechaIndex > 0 ? 0 : dayjs().hour();
    let hoursLeftToday = 24 - currentHour;
    for (let i = 0; i < hoursLeftToday; i++) {
        let hora = dayjs()
            .startOf("day")
            .add(currentHour + i, "hours")
            .format("h:mm a");
        horas.push(hora);
    }
    const initialSelectedDay = dayjs().format("ddd D MMM").split(" ");

    const [selectedHourIndex, setSelectedHourIndexState] = useState(0);
    const [isEmergency, setIsEmergency] = useState(false);
    const [hour, setHour] = useState(currentHour);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

    const setSelectedHourIndex = (index: any) => {
        setSelectedHourIndexState(index);
        let selectedHour = dayjs()
            .hour((currentHour + index) % 24)
            .hour();
        setHour(selectedHour);
        if (selectedHour >= 20 || selectedHour < 8) {
            setIsEmergency(true);
        } else {
            setIsEmergency(false);
        }
    };
    const setSelectedDayIndex = (index: any) => {
        setSelectedFechaIndex(index);
        let selectedDay: string[] = fechas[index];
        setSelectedDay(selectedDay);
    };
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const [selectedDetailService, setSelectedDetailService] = useState("");
    const [showMore, setShowMore] = useState(false); // Nuevo estado

    const handleCardClick = (product: SetStateAction<string>) => {
        setSelectedDetailService(product);
    };

    const handleShowMore = () => {
        setShowMore(!showMore); // Cambia el estado cada vez que se hace click
    };
    const servicesToShow = showMore
        ? selectedService?.list
        : selectedService?.list?.slice(0, 4);

    const steps = [
        {
            label: "Detalles del Trabajo",
            description: (
                <>
                    <Card variant="outlined" sx={{ width: "100%" }}>
                        {/* <CardMedia
                            sx={{
                                height: 140,
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            image={selectedService?.image}
                            title={selectedService?.title}
                        /> */}
                        <CardContent
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    alignSelf: "self-start",
                                }}
                            >
                                {selectedService?.title}
                            </Typography>
                            <Typography variant="body1">
                                {selectedService?.description}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Stack spacing={0.5} direction="column">
                        <Grid container spacing={1}>
                            {servicesToShow?.map((service: any, index: any) => (
                                <DetailServicesCard
                                    key={index}
                                    service={service}
                                    handleCardClick={() =>
                                        handleCardClick(service.title)
                                    }
                                    selectedDetailService={
                                        selectedDetailService
                                    }
                                />
                            ))}
                        </Grid>
                        <Button onClick={handleShowMore}>
                            {showMore ? "Mostrar menos" : "Mostrar más"}
                        </Button>
                    </Stack>
                </>
            ),
        },
        {
            label: "¿Cuándo y dónde?",
            description: (
                <>
                    {/* |{selectedFechaIndex}|{selectedHourIndex}|
                    {setSelectedHourIndexState}|{hour}|{selectedDay} */}
                    {/* <Typography variant="h5" gutterBottom>
                        ¡Tierra, cielo o mar!, estarémos ahí en menos de una
                        hora.
                    </Typography> */}
                    <Card
                        variant="outlined"
                        sx={{ width: "100%" }}
                        // sx={{
                        //     display: { xs: "none", md: "flex" },
                        // }}
                    >
                        <CardContent
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    alignSelf: "self-start",
                                }}
                            >
                                ¿Cuándo?
                            </Typography>
                            <Stack spacing={1} direction="column">
                                <DateSwiper
                                    date={fechas}
                                    setSelectedFechaIndex={setSelectedDayIndex}
                                    selectedFechaIndex={selectedFechaIndex}
                                />

                                <HourSwiper
                                    date={horas}
                                    setSelectedHourIndex={setSelectedHourIndex}
                                    selectedHourIndex={selectedHourIndex}
                                />
                                <Chip
                                    label={
                                        isEmergency
                                            ? "¡¡¡Llegarémos lo más pronto posible!!!"
                                            : "¡Llegámos en menos de una hora!"
                                    }
                                    color="success"
                                    variant="outlined"
                                />
                                {isEmergency && (
                                    <Chip
                                        label="Emergencias 25% extra"
                                        color="warning"
                                        variant="outlined"
                                    />
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card
                        variant="outlined"
                        sx={{ width: "100%" }}
                        // sx={{
                        //     display: { xs: "none", md: "flex" },
                        // }}
                    >
                        <CardContent
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                ¿Dónde?
                            </Typography>
                            <Stack spacing={1} direction="column">
                                <TextField
                                    id="outlined-basic"
                                    label="Región"
                                    variant="outlined"
                                    value={"Antofagasta"}
                                    disabled
                                />
                                <TextField
                                    id="outlined-controlled"
                                    label="Dirección"
                                    value={name}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setName(event.target.value);
                                    }}
                                />
                                <TextField
                                    id="outlined-controlled"
                                    label="N°"
                                    value={name}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setName(event.target.value);
                                    }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Propiedad
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Propiedad"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Casa"}>Casa</MenuItem>
                                        <MenuItem value={"Departamento"}>
                                            Departamento
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="outlined-controlled"
                                    label="Descripción (opcional)"
                                    value={name}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setName(event.target.value);
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </>
            ),
        },
        {
            label: "Cálculo del Costo Estimado",
            description: <></>,
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box
            sx={{
                // boxShadow: 4,
                // maxWidth: "90%",
                // minWidth: "90%",
                display: "flex",
                flexDirection: "Column",
                borderRadius: "1.5rem",
                justifyContent: "start",
                bgcolor: "white",
                height: "100%",
            }}
        >
            <Stepper
                activeStep={activeStep}
                orientation="horizontal"
                sx={{
                    p: 2,
                    backgroundColor: "text.primary",
                    borderBottomLeftRadius: "1.5rem",
                    borderTopLeftRadius: "1.5rem",
                }}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === activeStep ? (
                                    <Typography variant="body2" color="white">
                                        {step.label}
                                    </Typography>
                                ) : null
                            }
                        ></StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box
                sx={{
                    p: 1,
                    // paddingX:2,
                    // paddingy:2,
                    height: "100%",
                }}
            >
                {steps.map((step, index) => {
                    if (index === activeStep) {
                        return (
                            <Stack
                                sx={{
                                    display: "flex",
                                    alignItems: "start",
                                    justifyContent: "space-between",
                                    flexDirection: "col",
                                    height: "100%",
                                }}
                                key={index}
                            >
                                <Stack
                                    direction={"column"}
                                    spacing={0.5}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {step.description}
                                </Stack>
                                <Stack
                                    // sx={{
                                    //     display: "flex",
                                    //     flexDirection: "column",
                                    //     padding: 1,
                                    //     justifyContent: "space-between",
                                    //     width: "100%",
                                    //     gap: 1,
                                    // }}
                                    display="flex"
                                    direction={"column"}
                                    spacing={1}
                                    justifyContent={"space-between"}
                                    width={"100%"}
                                    padding={1}
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
                                            {selectedService &&
                                                selectedService.price.toLocaleString(
                                                    "es-CL",
                                                    {
                                                        style: "currency",
                                                        currency: "CLP",
                                                    }
                                                )}
                                        </Typography>
                                    </Box>{" "}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",

                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Chip
                                            label="Caso"
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
                                    {/* {selectedDetailService}
                                    {selectedDetailService} */}
                                    {isEmergency && selectedService && (
                                        <>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",
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
                                                    {(
                                                        selectedService.price *
                                                        0.25
                                                    ).toLocaleString("es-CL", {
                                                        style: "currency",
                                                        currency: "CLP",
                                                    })}
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
                                            {selectedService &&
                                                (
                                                    selectedService.price +
                                                    (selectedService?.list?.find(
                                                        (service) =>
                                                            service.title ===
                                                            selectedDetailService
                                                    )?.price || 0) +
                                                    (isEmergency
                                                        ? selectedService.price *
                                                          0.25
                                                        : 0)
                                                ).toLocaleString("es-CL", {
                                                    style: "currency",
                                                    currency: "CLP",
                                                })}
                                        </Typography>
                                    </Box>
                                    <Divider variant="middle" />
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
                                            disabled={index === 0}
                                            onClick={handleBack}
                                        >
                                            Volver
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                        >
                                            {index === steps.length - 1
                                                ? "¡Solicitar ahora!"
                                                : "Continuar"}
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        );
                    }
                    return null;
                })}
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}
