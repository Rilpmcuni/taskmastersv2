"use client";
import React, { useState, SetStateAction, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Typography from "@mui/material/Typography";
import {
    Card,
    CardContent,
    Chip,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ServicesData } from "@/data/ServicesData";
import DateSwiper from "./DateSwiper";
import HourSwiper from "./HourSwiper";
import dayjs from "dayjs";
import "dayjs/locale/es";
import DetailServicesCard from "../DetailServicesCard";
import Logo from "../ui/Logo";
import TextFieldPhone from "../ui/TextFieldPhone";
import TextFieldRut from "../ui/TextFieldRut";
import Sello from "../ui/Sello";
import { StackedBarChartRounded } from "@mui/icons-material";

export default function ServiceWindow({
    selectedProduct,
    onClose,
}: {
    selectedProduct: any;
    onClose: any;
}) {
    let selectedService = ServicesData.find(
        (service) => service.title === selectedProduct
    );
    // date
    // date
    dayjs.locale("es");
    let fechas: string[][] = [];
    // let currentDay = dayjs().hour() >= 0 ? dayjs().add(1, "day") : dayjs();
    let currentDay = dayjs();
    for (let i = 0; i < 7; i++) {
        let fecha = currentDay.add(i, "day").format("ddd D MMM").split(" ");
        fechas.push(fecha);
    }

    const [selectedFechaIndex, setSelectedFechaIndex] = useState(0);

    let horas = [];
    let currentHour = dayjs().hour();

    // let currentDay = dayjs();

    // if (currentHour >= 0) {
    //     currentDay = dayjs().add(1, "day");
    //     currentHour = 0;
    // }

    let startHour = selectedFechaIndex === 0 ? currentHour : 0;

    let hoursLeftToday = 24 - startHour;
    for (let i = 0; i < hoursLeftToday; i++) {
        let hora = currentDay
            .startOf("day")
            .add(startHour + i, "hours")
            .format("h:mm a");
        horas.push(hora);
    }
    const initialSelectedDay = dayjs().format("ddd D MMM").split(" ");

    const [selectedHourIndex, setSelectedHourIndexState] = useState(0);
    const [isEmergency, setIsEmergency] = useState(
        currentHour >= 20 || currentHour < 8
    );
    const [hour, setHour] = useState(currentHour);
    const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

    const setSelectedHourIndex = (index: any) => {
        setSelectedHourIndexState(index);
        let selectedHour = dayjs()
            .hour(startHour + index)
            .hour();
        console.log("Selected hour:", selectedHour); // Add this line
        setHour(selectedHour);
        if (selectedHour >= 20 || selectedHour < 8) {
            setIsEmergency(true);
        } else {
            setIsEmergency(false);
        }
        console.log("Is emergency:", isEmergency); // Add this line
    };
    const setSelectedDayIndex = (index: any) => {
        setSelectedFechaIndex(index);
        let selectedDay: string[] = fechas[index];
        setSelectedDay(selectedDay);
        setSelectedHourIndex(hour);
    };
    const [name, setName] = React.useState("");
    const [adress, setAdress] = useState("");
    const [number, setNumber] = useState("");
    const [clientNote, setClientNote] = useState("");
    const [indications, setIndications] = useState("");
    const [propiedad, setPropiedad] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
        setPropiedad(event.target.value as string);
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
    const [rut, setRut] = useState<string | null>(null);
    const [cellPhone, setCellPhone] = useState<string | null>(null);

    const supabase = createClientComponentClient();

    const handleRequestNow = async () => {
        const price = [
            {
                label: `${selectedProduct} desde`,
                value: selectedService?.price,
            },
        ];

        if (selectedDetailService !== "") {
            const detailServicePrice =
                selectedService?.list?.find(
                    (service) => service.title === selectedDetailService
                )?.price || 0;

            price.push({
                label: `Caso (${selectedDetailService})`,
                value: detailServicePrice,
            });
        }

        if (isEmergency && selectedService) {
            price.push({
                label: "Emergencias 50% extra",
                value: 1, // Aquí almacenamos el valor como 1 en lugar de calcular el extra
            });
        }

        const { error } = await supabase.from("request").insert([
            {
                name: name,
                cellPhone: cellPhone,
                rut: rut,
                adress: adress,
                number: number,
                propiedad: propiedad,
                clientNote: clientNote,
                indications: indications,
                selectedService: selectedService?.title,
                selectedDetailService: selectedDetailService,
                isEmergency: isEmergency,
                selectedDay: selectedDay,
                hour: hour,
                price: price,
            },
        ]);

        if (error) {
            console.log("Error: ", error);
        } else {
            console.log("Data inserted successfully!");
            handleNext();
        }
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    const steps = [
        {
            label: "Detalles del Trabajo",
            description: (
                <>
                    <Card variant="outlined" sx={{ width: "100%" }}>
                        <CardContent
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Typography variant="body1">
                                {selectedService?.description}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Typography variant="body1" sx={{ paddingY: 1 }}>
                        Caso (Opcional)
                    </Typography>
                    <Stack spacing={0.5} direction="column">
                        <Grid container spacing={0.5}>
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
                    <TextField
                        id="outlined-controlled"
                        label="Descripción de servicio (opcional)"
                        value={indications}
                        multiline
                        placeholder="Ej. Tengo una filtracion en la cocina que necesito reparar..."
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setIndications(event.target.value);
                        }}
                    />
                </>
            ),
        },
        {
            label: "¿Cuándo y dónde?",
            description: (
                <>
                    {/* |{selectedFechaIndex}|{selectedHourIndex}|
                    {setSelectedHourIndexState}|{hour}|{selectedDay} */}
                    {/* {hour}
                    {currentHour} */}
                    {/* <Typography variant="h5" gutterBottom>
                        ¡Tierra, cielo o mar!, estarémos ahí en menos de una
                        hora.
                    </Typography> */}
                    <Card variant="outlined" sx={{ width: "100%" }}>
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
                                {isEmergency && (
                                    <Chip
                                        label="Emergencias 50% extra"
                                        color="warning"
                                        variant="outlined"
                                    />
                                )}
                                <Chip
                                    label={
                                        isEmergency
                                            ? "¡¡¡Llegarémos lo más pronto posible!!!"
                                            : "¡Llegámos en menos de una hora!"
                                    }
                                    color="success"
                                    variant="outlined"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card variant="outlined" sx={{ width: "100%" }}>
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
                                    value={adress}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setAdress(event.target.value);
                                    }}
                                />
                                <TextField
                                    id="outlined-controlled"
                                    label="N°"
                                    value={number}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setNumber(event.target.value);
                                    }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Propiedad
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={propiedad}
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
                                    label="Referencian"
                                    value={indications}
                                    multiline
                                    placeholder="Ej. Casa azul, esquina..."
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setIndications(event.target.value);
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
            description: (
                <>
                    <Stack
                        display="flex"
                        direction={"column"}
                        spacing={1}
                        justifyContent={"space-between"}
                        width={"100%"}
                        padding={1}
                    >
                        {/* <Logo /> */}
                        {/* <Sello /> */}
                        <Stack
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
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",

                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Chip
                                        label={`${selectedProduct} desde`}
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
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Mínimo base
                                </Typography>
                            </Box>
                            {selectedDetailService !== "" && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
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
                                    <Typography variant="caption" color="text.secondary">
                                        valor del caso en específico
                                    </Typography>
                                </Box>
                            )}
                            {isEmergency && selectedService && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Chip
                                            label="Emergencias 50% extra"
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
                                                (selectedService.price +
                                                    +(
                                                        selectedService?.list?.find(
                                                            (service) =>
                                                                service.title ===
                                                                selectedDetailService
                                                        )?.price || 0
                                                    )) *
                                                0.50
                                            ).toLocaleString("es-CL", {
                                                style: "currency",
                                                currency: "CLP",
                                            })}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Base del valor total para servicio de
                                        emergencia
                                    </Typography>
                                </Box>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
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
                                                    ? (selectedService.price +
                                                          (selectedService?.list?.find(
                                                              (service) =>
                                                                  service.title ===
                                                                  selectedDetailService
                                                          )?.price || 0)) *
                                                      0.50
                                                    : 0)
                                            ).toLocaleString("es-CL", {
                                                style: "currency",
                                                currency: "CLP",
                                            })}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    Puede variar con la decisión final del
                                    profesional
                                </Typography>
                            </Box>
                            <Divider variant="middle" />
                        </Stack>
                        <TextField
                            id="outlined-controlled"
                            label="Nombre y apellido"
                            value={name}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                        />

                        <TextFieldPhone
                            value={cellPhone || ""}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setCellPhone(e.target.value)}
                        />
                        <TextFieldRut
                            value={rut || ""}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setRut(e.target.value)}
                        />
                    </Stack>
                </>
            ),
        },
        {
            label: "Revisar información",
            description: (
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
                                        label={`${selectedProduct} desde`}
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
                                </Box>
                                {selectedDetailService !== "" && (
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
                                )}
                                {isEmergency && selectedService && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Chip
                                            label="Emergencias 50% extra"
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
                                                (selectedService.price +
                                                    +(
                                                        selectedService?.list?.find(
                                                            (service) =>
                                                                service.title ===
                                                                selectedDetailService
                                                        )?.price || 0
                                                    )) *
                                                0.50
                                            ).toLocaleString("es-CL", {
                                                style: "currency",
                                                currency: "CLP",
                                            })}
                                        </Typography>
                                    </Box>
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
                                                    ? (selectedService.price +
                                                          (selectedService?.list?.find(
                                                              (service) =>
                                                                  service.title ===
                                                                  selectedDetailService
                                                          )?.price || 0)) *
                                                      0.50
                                                    : 0)
                                            ).toLocaleString("es-CL", {
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
                                    <Typography variant="body1" gutterBottom>
                                        {selectedService?.title}
                                    </Typography>
                                </Box>
                                {selectedDetailService !== "" && (
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
                                )}
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
                                    <Typography variant="body1" gutterBottom>
                                        {name}
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
                                        +56 {cellPhone}
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
                                    <Typography variant="body1" gutterBottom>
                                        {rut}
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
                                        Fecha
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
                                                {hour % 12 || 12}:00
                                                {hour < 12 ? "am" : "pm"}
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
                                                sx={{ pointerEvents: "none" }}
                                                variant="caption"
                                            >
                                                {selectedDay[0].replace(
                                                    /\./g,
                                                    ""
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{ pointerEvents: "none" }}
                                                variant="body1"
                                                fontWeight={"bold"}
                                            >
                                                {selectedDay[1]}
                                            </Typography>
                                            <Typography
                                                sx={{ pointerEvents: "none" }}
                                                variant="caption"
                                            >
                                                {selectedDay[2]}
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
                                    <Typography variant="body1" gutterBottom>
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
                                    <Typography variant="body1" gutterBottom>
                                        {adress}
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
                                    <Typography variant="body1" gutterBottom>
                                        {number}
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
                                    <Typography variant="body1" gutterBottom>
                                        {propiedad}
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
                                    <Typography variant="body1" gutterBottom>
                                        {clientNote}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </>
            ),
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    const dialogRef = useRef<HTMLDivElement>(null); // Crear la referencia con un tipo específico

    const handleScrollTop = () => {
        if (dialogRef.current !== null) {
            dialogRef.current.scrollTop = 0; // Aplicar el scroll al inicio
        }
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        handleScrollTop();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        handleScrollTop();
    };

    return (
        <Box
            ref={dialogRef}
            sx={{
                // boxShadow: 4,
                // maxWidth: "90%",
                // minWidth: "90%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1.5rem",
                justifyContent: "start",
                bgcolor: "white",
                height: "100%",
            }}
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
                    onClick={onClose}
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
                                    flexDirection: "column",
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
                                    display="flex"
                                    direction={"column"}
                                    spacing={1}
                                    justifyContent={"space-between"}
                                    width={"100%"}
                                    padding={1}
                                >
                                    {activeStep <= 1 && (
                                        <>
                                            <Divider variant="fullWidth" />
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
                                                    label={`${selectedProduct} desde`}
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
                                            </Box>
                                            {selectedDetailService !== "" && (
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
                                                            ).toLocaleString(
                                                                "es-CL",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "CLP",
                                                                }
                                                            )}
                                                    </Typography>
                                                </Box>
                                            )}
                                            {isEmergency && selectedService && (
                                                <>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                            justifyContent:
                                                                "space-between",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Chip
                                                            label="Emergencias 50% extra"
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
                                                                (selectedService.price +
                                                                    +(
                                                                        selectedService?.list?.find(
                                                                            (
                                                                                service
                                                                            ) =>
                                                                                service.title ===
                                                                                selectedDetailService
                                                                        )
                                                                            ?.price ||
                                                                        0
                                                                    )) *
                                                                0.50
                                                            ).toLocaleString(
                                                                "es-CL",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "CLP",
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
                                                    justifyContent:
                                                        "space-between",
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
                                                                ? (selectedService.price +
                                                                      (selectedService?.list?.find(
                                                                          (
                                                                              service
                                                                          ) =>
                                                                              service.title ===
                                                                              selectedDetailService
                                                                      )
                                                                          ?.price ||
                                                                          0)) *
                                                                  0.50
                                                                : 0)
                                                        ).toLocaleString(
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
                                            onClick={() => {
                                                handleBack();
                                                handleScrollTop();
                                            }}
                                            variant="outlined"
                                        >
                                            Volver
                                        </Button>
                                        {index === steps.length - 1 ? (
                                            <Button
                                                size="large"
                                                variant="contained"
                                                onClick={() => {
                                                    handleRequestNow();
                                                    window.scrollTo(0, 0);
                                                }}
                                            >
                                                ¡Solicitar ahora!
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                            >
                                                {index === steps.length - 2
                                                    ? "Revisar información"
                                                    : "Siguiente"}
                                            </Button>
                                        )}
                                    </Box>
                                </Stack>
                            </Stack>
                        );
                    }
                    return null;
                })}
                {activeStep === steps.length && (
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
                            <Typography variant="caption" fontWeight={"bold"}>
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
                )}
            </Box>
        </Box>
    );
}
