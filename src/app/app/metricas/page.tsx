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

    const solicitedDataPrice = solicitedData.map((metric) =>
        calculatePreliminaryCost(metric)
    );
    const total = solicitedDataPrice.reduce((sum, value) => sum + value, 0);
    const startValue = 0;

    const currentYear = 2023;

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
        const day = dateArray.length > 1 ? dateArray[1].padStart(2, "0") : "01";
        return `2023-${months[dateArray[2] as keyof typeof months]}-${day}`;
    };

    const metricsByWeek = solicitedData.reduce(
        (acc: Record<number, (typeof metric)[]>, metric) => {
            const date = dayjs(convertDate(metric.selectedDay));
            const weekOfYear =
                date.day() === 6 ? date.add(1, "week").week() : date.week();
            if (!acc[weekOfYear]) {
                acc[weekOfYear] = [];
            }
            acc[weekOfYear].push(metric);
            return acc;
        },
        {}
    );

    // Aquí está la lógica de ganancia semanal copiada de metricas/page.tsx
    const earningsByWeek = Object.keys(metricsByWeek).reduce(
        (acc: Record<string, number>, week) => {
            const metrics = metricsByWeek[Number(week)];
            const earnings = metrics
                .map((metric) => calculatePreliminaryCost(metric))
                .reduce((sum, value) => sum + value, 0);
            acc[week] = earnings;
            return acc;
        },
        {} as Record<string, number>
    );

    // Obtén el día de la semana actual (0-6, domingo a sábado)
    const currentDayOfWeek = dayjs().day();

    // Si hoy es sábado (6) o domingo (0), entonces es el comienzo de la nueva semana, de lo contrario, es la misma semana que comenzó el sábado pasado
    const currentWeek =
        currentDayOfWeek === 6 || currentDayOfWeek === 0
            ? dayjs().add(1, "week").week()
            : dayjs().week();

    // Usa el número de la semana para obtener las ganancias de la semana actual
    const earningsThisWeek = earningsByWeek[currentWeek] || 0;

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
                                value={(earningsThisWeek
                                    ? earningsThisWeek
                                    : 0
                                ).toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
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
                    {(earningsThisWeek ? earningsThisWeek : 0).toLocaleString(
                        "es-CL",
                        {
                            style: "currency",
                            currency: "CLP",
                        }
                    )}{" "}
                    ganados esta semana
                </Typography>
            </Grid>
            <Divider
                variant="middle"
                sx={{
                    marginBottom: "0.5rem",
                }}
            />
            <HeroCards
                sessionData={sessionData}
                metrics={metrics}
                profile={profile}
            />
        </main>
    );
}
