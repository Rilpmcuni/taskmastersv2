"use client";

import Link from "next/link";

import SlotCounter from "react-slot-counter";
import dayjs from "dayjs";
import "dayjs/locale/es"; // importa el locale español

import weekOfYear from "dayjs/plugin/weekOfYear";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import isBetween from "dayjs/plugin/isBetween";
import HeroCards from "@/components/ui/HeroCards";
import {
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { useSession } from "@/contexts/SessionContext";
import SpeedDialBasic from "@/components/ui/speedDialBasic";
import FullScreenDialogUser from "@/feedback/FullScreenDialogUser";
import { SetStateAction, useState } from "react";
export default function Home() {
    const { sessionData, metrics, profile } = useSession();

    const calculatePreliminaryCost = (metric: {
        price: any[];
        isEmergency: any;
    }) => {
        const total = metric.price.reduce(
            (sum: number, item: { value: number }) => sum + item.value,
            0
        );
        let emergencyFee = 0;
        if (metric.isEmergency) {
            emergencyFee = total * 0.5;
        }
        const preliminaryCost = total + emergencyFee;

        let fourteenPercent = preliminaryCost * 0.14;

        // Luego lo restamos del costo preliminar
        let finalCost = preliminaryCost - fourteenPercent;
        return finalCost;
    };
    // calculatePreliminaryCost

    const sortedMetrics = metrics ? [...metrics] : [];

    const solicitedData = sortedMetrics.filter(
        (metric) => metric.user_id === sessionData?.user?.id
    );

    const solicitedDataPrice = solicitedData.map((metric) =>
        calculatePreliminaryCost(metric)
    );
    const total = solicitedDataPrice.reduce((sum, value) => sum + value, 0);
    const startValue = 0;
    //
    //
    //
    dayjs.extend(weekOfYear);
    dayjs.locale("es"); // usa el locale español
    const currentYear = 2023;
    // Convertir el formato de fecha ["sáb.","28","oct"] a un formato que dayjs pueda entender
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

    // Agrupar las métricas por semana del mes
    const metricsByWeek = solicitedData.reduce(
        (acc: Record<number, (typeof metric)[]>, metric) => {
            const date = dayjs(convertDate(metric.selectedDay));
            const firstSaturdayOfMonth = date.startOf("month").day(6);
            const weekOfMonth =
                Math.ceil(date.diff(firstSaturdayOfMonth, "day") / 7) + 1;
            if (!acc[weekOfMonth]) {
                acc[weekOfMonth] = [];
            }
            acc[weekOfMonth].push(metric);
            return acc;
        },
        {}
    );
    // Calcular las ganancias por semana
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

    const totalEarningsOfMonth = Object.values(earningsByWeek).reduce(
        (sum, value) => sum + value,
        0
    );
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
    const firstDayOfCurrentMonth = currentDate.startOf("month");
    const currentWeekOfMonth =
        currentDate.diff(firstDayOfCurrentMonth, "week") + 1;
    const currentWeekEarnings =
        earningsByMonthAndWeek[currentMonth]?.[currentWeekOfMonth] ?? 0;

    const currentMonthEarnings = Object.values(
        earningsByMonthAndWeek[currentMonth] ?? {}
    ).reduce((sum, value) => sum + value, 0);
    //
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
                                value={(currentWeekEarnings
                                    ? currentWeekEarnings
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
                    {(currentWeekEarnings
                        ? currentWeekEarnings
                        : 0
                    ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}{" "}
                    ganados esta semana |{" "}
                    {(currentMonthEarnings
                        ? currentMonthEarnings
                        : 0
                    ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                    })}{" "}
                    ganados este mes
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
