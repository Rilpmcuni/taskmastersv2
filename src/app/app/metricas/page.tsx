"use client";
import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import esLocale from "@fullcalendar/core/locales/es";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import SlotCounter from "react-slot-counter";
import dayjs from "dayjs";
import "dayjs/locale/es"; // importa el locale español
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useSession } from "@/contexts/SessionContext";

import Link from "next/link";

import "dayjs/locale/es"; // importa el locale español

import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import isBetween from "dayjs/plugin/isBetween";
import HeroCards from "@/components/ui/HeroCards";
import { CardActionArea } from "@mui/material";
import SpeedDialBasic from "@/components/ui/speedDialBasic";
import FullScreenDialogUser from "@/feedback/FullScreenDialogUser";
import { Console } from "console";
import ContractModal from "@/feedback/ContractModal";
import JSignature from "@/feedback/JSignature";
dayjs.extend(weekOfYear);
dayjs.locale("es"); // usa el locale español

interface MetricCardProps {
    metric: {
        id: any;
        price: { value: number }[];
        isEmergency: boolean;
        selectedService: string;
        selectedDetailService: string;
        selectedDay: string[];
        hour: number;
        // Agrega aquí las demás propiedades de 'metric' con sus respectivos tipos
    };
    index: number;
    openDialogId: number | null;
    setOpenDialogId: (id: number | null) => void;
}

export default function Home() {
    const { sessionData, metrics, profile } = useSession();

    const [open, setOpen] = useState(false);
    const [eventDetails, setEventDetails] = useState<any | null>(null);

    const calculatePreliminaryCost = (metric: {
        price: any[];
        isEmergency: any;
        hourFinish: number;
        dayFinish: string[];
    }) => {
        // Solo calcular las ganancias si la métrica tiene fecha de terminación
        if (!metric.hourFinish || !metric.dayFinish) {
            return 0;
        }

        const total = metric.price.reduce(
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

        return finalCost;
    };

    const sortedMetrics = metrics ? [...metrics] : [];

    const solicitedData = sortedMetrics.filter(
        (metric) => metric.user_id === sessionData?.user?.id
    );

    const startValue = 0;

    const convertDate = (dateArray: string[]) => {
        const months = {
            ene: "01",
            feb: "02",
            mar: "03",
            abr: "04",
            may: "05",
            jun: "06",
            jul: "07",
            ago: "08",
            sep: "09",
            oct: "10",
            nov: "11",
            dic: "12",
        };
        return `2023-${months[dateArray[2] as keyof typeof months]}-${
            dateArray[1]
        }`;
    };

    // Agrupar las métricas por mes y luego por semana del mes
    const metricsByMonthAndWeek = solicitedData.reduce((acc, metric) => {
        const date = dayjs(convertDate(metric.selectedDay));
        const month = date.format("MMMM");
        const firstSaturdayOfMonth = date.startOf("month").day(6);
        const weekOfMonth =
            Math.ceil(date.diff(firstSaturdayOfMonth, "day") / 7) + 1;
        if (!acc[month]) {
            acc[month] = {};
        }
        if (!acc[month][weekOfMonth]) {
            acc[month][weekOfMonth] = [];
        }
        acc[month][weekOfMonth].push(metric);
        return acc;
    }, {} as Record<string, Record<number, (typeof solicitedData)[0][]>>);

    // Agrupar las métricas por semana del mes
    // Calcular las ganancias por mes y por semana
    const earningsByMonthAndWeek = Object.entries(metricsByMonthAndWeek).reduce(
        (acc, [month, weeks]) => {
            acc[month] = Object.entries(weeks).reduce(
                (acc, [week, metrics]) => {
                    const earnings = metrics
                        .map((metric) => calculatePreliminaryCost(metric))
                        .reduce((sum, value) => sum + value, 0);
                    acc[week] = earnings;
                    return acc;
                },
                {} as Record<string, number>
            );
            return acc;
        },
        {} as Record<string, Record<string, number>>
    );
    // Obtener las ganancias de la semana actual
    const currentDate = dayjs();
    const currentMonth = currentDate.format("MMMM");
    const firstSaturdayOfCurrentMonth = currentDate.startOf("month").day(5);

    const currentWeekOfMonth =
        Math.ceil(currentDate.diff(firstSaturdayOfCurrentMonth, "day") / 7) + 1;

    const currentWeekEarnings =
        earningsByMonthAndWeek[currentMonth]?.[currentWeekOfMonth] ?? 0;

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <main>
            <Grid
                item
                xs={12}
                sx={{
                    margin: "0.5rem",
                }}
            >
                <Card
                    variant="outlined"
                    sx={{
                        backgroundColor: "#ffdb5c",
                        opacity: 0.9,
                        backgroundImage:
                            "radial-gradient(#449aff 0.9px, #ffdb5c 0.9px)",
                        backgroundSize: "18px 18px",
                        animation: "backgroundScroll 6s linear infinite",
                        "@keyframes backgroundScroll": {
                            "0%": {
                                backgroundPosition: "0 0",
                            },
                            "100%": {
                                backgroundPosition: "108px 54px",
                            },
                        },
                        border: "hidden",
                    }}
                >
                    <CardActionArea
                        LinkComponent={Link}
                        href={"/app/balance"}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                // justifyContent: "space-evenly",
                                justifyContent: "center",
                                gap: 1,
                            }}
                        >
                            <PaymentsTwoToneIcon
                                color="primary"
                                // fontSize="large"
                                sx={{
                                    fontSize: "3rem",
                                }}
                            />
                            <SlotCounter
                                // containerClassName="conta"
                                // dummyCharacters={"450.000".split("")}
                                // duration={}
                                value={currentWeekEarnings.toLocaleString(
                                    "es-CL",
                                    {
                                        style: "currency",
                                        currency: "CLP",
                                    }
                                )}
                                // sequentialAnimationMode
                                // useMonospaceWidth
                                startValue={startValue.toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
                                charClassName="char"
                                separatorClassName="sepa"
                            />
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Typography
                    variant="caption"
                    textAlign="end"
                    sx={{
                        display: "block",
                        alignSelf: "flex-end",
                        color: "text.secondary",
                    }}
                >
                    {currentWeekEarnings.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}{" "}
                    ganados esta semana
                </Typography>
            </Grid>
            <Divider
                variant="middle"
                sx={{
                    marginBottom: "0.5rem",
                }}
            />
            {profile === null ? (
                // Aquí puedes renderizar un componente de carga o simplemente no renderizar nada
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Skeleton variant="rounded" height={133} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="rounded" height={133} />
                    </Grid>
                    <Grid item xs={6}>
                        <Skeleton variant="rounded" height={133} />
                    </Grid>
                </Grid>
            ) : profile?.signature ? (
                <HeroCards
                    sessionData={sessionData}
                    metrics={metrics}
                    profile={profile}
                />
            ) : (
                <ContractModal
                    sessionData={sessionData}
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                >
                    <Button
                        color="success"
                        onClick={() => setDialogOpen(true)}
                        variant="contained"
                    >
                        Firmar Acuerdo de usuario
                    </Button>
                </ContractModal>
            )}
            <Typography variant="caption" textAlign="center">
                Versión beta.
                <br />
                Estamos esperando los comentarios de los profesionales y
                usuarios para mejorar la experiencia del usuario y prepararnos
                para la próxima versión, que traerá nuevas características y
                mejoras de optimización.
                <br />
                Agradecemos su paciencia y apoyo mientras trabajamos para
                mejorar nuestra aplicación.
            </Typography>
        </main>
    );
}
