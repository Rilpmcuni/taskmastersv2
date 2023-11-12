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
    const { sessionData, metrics } = useSession();
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
        // Asegurarse de que el día siempre tenga dos dígitos
        const day = dateArray.length > 1 ? dateArray[1].padStart(2, "0") : "01";
        return `2023-${months[dateArray[2] as keyof typeof months]}-${day}`;
    };
    // Agrupar las métricas por semana del año
    const metricsByWeek = solicitedData.reduce(
        (acc: Record<number, (typeof metric)[]>, metric) => {
            const date = dayjs(convertDate(metric.selectedDay));
            // Si el día es sábado, pertenece a la próxima semana
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

    // Calcular las ganancias por semana
    // const earningsByWeek = Object.keys(metricsByWeek).reduce(
    //     (acc: Record<string, number>, week) => {
    //         const metrics = metricsByWeek[Number(week)];
    //         const earnings = metrics
    //             .map((metric) => calculatePreliminaryCost(metric))
    //             .reduce((sum, value) => sum + value, 0);
    //         acc[week] = earnings;
    //         return acc;
    //     },
    //     {} as Record<string, number>
    // );

    // const totalEarningsOfMonth = Object.values(earningsByWeek).reduce(
    //     (sum, value) => sum + value,
    //     0
    // );

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
    // const earningsByMonthAndWeek = Object.entries(metricsByMonthAndWeek).reduce(
    //     (acc, [month, weeks]) => {
    //         acc[month] = Object.entries(weeks).reduce(
    //             (acc, [week, metrics]) => {
    //                 const earnings = metrics
    //                     .map((metric) => calculatePreliminaryCost(metric))
    //                     .reduce((sum, value) => sum + value, 0);
    //                 acc[week] = earnings;
    //                 return acc;
    //             },
    //             {} as Record<string, number>
    //         );
    //         return acc;
    //     },
    //     {} as Record<string, Record<string, number>>
    // );

    // Obtener las ganancias de la semana actual
    const currentDate = dayjs();
    const currentMonth = currentDate.format("MMMM");
    const firstDayOfCurrentMonth = currentDate.startOf("month");
    const currentWeekOfMonth =
        currentDate.diff(firstDayOfCurrentMonth, "week") + 1;
    // const currentWeekEarnings =
    //     earningsByMonthAndWeek[currentMonth]?.[currentWeekOfMonth] ?? 0;
    // // Componente para renderizar los meses y las semanas
    // const EarningsByMonthAndWeek = () => {
    //     return (
    //         <Grid container spacing={0.5}>
    //             {Object.entries(earningsByMonthAndWeek)
    //                 .slice() // Crea una copia del array
    //                 .reverse() // Invierte el orden del array
    //                 .map(([month, weeks]) => {
    //                     // Calcular la ganancia total del mes
    //                     const totalEarningsOfMonth = Object.values(
    //                         weeks
    //                     ).reduce((sum, value) => sum + value, 0);

    //                     return (
    //                         <Grid item xs={12} key={month}>
    //                             <Card variant="outlined">
    //                                 <CardContent>
    //                                     <Stack
    //                                         direction={"row"}
    //                                         justifyContent={"space-between"}
    //                                         alignItems={"center"}
    //                                     >
    //                                         <Typography variant="h5">
    //                                             {month}:{" "}
    //                                         </Typography>
    //                                         <Typography
    //                                             variant="h4"
    //                                             color="success.main"
    //                                         >
    //                                             {totalEarningsOfMonth.toLocaleString(
    //                                                 "es-CL",
    //                                                 {
    //                                                     style: "currency",
    //                                                     currency: "CLP",
    //                                                 }
    //                                             )}
    //                                         </Typography>
    //                                     </Stack>
    //                                     <Grid container spacing={0.5}>
    //                                         {Array.from(
    //                                             { length: 5 }, // Ajustar a 5 para incluir la posibilidad de 5 semanas en un mes
    //                                             (_, i) => i + 1
    //                                         ).map((week) => (
    //                                             <Grid item xs={6} key={week}>
    //                                                 <Card variant="outlined">
    //                                                     <CardContent
    //                                                         sx={{
    //                                                             alignItems:
    //                                                                 "center",
    //                                                             textAlign:
    //                                                                 "center",
    //                                                             justifyContent:
    //                                                                 "center",
    //                                                         }}
    //                                                     >
    //                                                         {weeks[week] > 0 ? (
    //                                                             <Typography
    //                                                                 color="success.main"
    //                                                                 variant="h6"
    //                                                                 padding={1}
    //                                                                 paddingTop={
    //                                                                     0
    //                                                                 }
    //                                                             >
    //                                                                 {weeks[
    //                                                                     week
    //                                                                 ].toLocaleString(
    //                                                                     "es-CL",
    //                                                                     {
    //                                                                         style: "currency",
    //                                                                         currency:
    //                                                                             "CLP",
    //                                                                     }
    //                                                                 )}
    //                                                             </Typography>
    //                                                         ) : (
    //                                                             <Chip
    //                                                                 label={
    //                                                                     "Sin movimiento"
    //                                                                 }
    //                                                                 color={
    //                                                                     "warning"
    //                                                                 }
    //                                                                 variant={
    //                                                                     "outlined"
    //                                                                 }
    //                                                             />
    //                                                         )}

    //                                                         <Typography
    //                                                             variant="caption"
    //                                                             color="text.secondary"
    //                                                             padding={1}
    //                                                             paddingTop={0}
    //                                                         >
    //                                                             Semana {week}
    //                                                         </Typography>
    //                                                     </CardContent>
    //                                                 </Card>
    //                                             </Grid>
    //                                         ))}
    //                                     </Grid>
    //                                 </CardContent>
    //                             </Card>
    //                         </Grid>
    //                     );
    //                 })}
    //         </Grid>
    //     );
    // };
    // const currentMonthEarnings = Object.values(
    //     earningsByMonthAndWeek[currentMonth] ?? {}
    // ).reduce((sum, value) => sum + value, 0);

    // Calcular las ganancias semanales
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

    // Crear eventos de ganancias semanales
    const weeklyEarningsEvents = Object.entries(earningsByWeek).map(
        ([week, earnings], index) => {
            // Encuentra la fecha de inicio de la semana para la métrica actual
            const startDate = dayjs()
                .week(Number(week))
                .startOf("week") // Inicio de la semana
                .add(4, "day") // Viernes
                .format("YYYY-MM-DD");
            const endDate = dayjs(startDate).add(1, "day").format("YYYY-MM-DD"); // Sábado

            // Asegúrate de que 'earnings' es un número antes de usar 'toLocaleString'
            const earningsAsString = (earnings as number).toLocaleString(
                "es-CL",
                {
                    style: "currency",
                    currency: "CLP",
                }
            );

            return {
                title: `Ganancia semanal: ${earningsAsString}`,
                start: startDate,
                semanal: true,
                end: endDate,
                color: "green", // Cambiar el color del evento
                allDay: true,
            };
        }
    );

    const solicitedDataEvents = solicitedData.flatMap((metric) => {
        // Solo crear eventos para métricas con fecha de terminación
        if (!metric.hourFinish || !metric.dayFinish) {
            return [];
        }

        const startDate = convertDate(metric.selectedDay);
        const endDate = convertDate(metric.dayFinish);
        const title = `${calculatePreliminaryCost(metric).toLocaleString(
            "es-CL",
            {
                style: "currency",
                currency: "CLP",
            }
        )} - ${metric.selectedService}${
            metric.selectedDetailService && ` - ${metric.selectedDetailService}`
        }`;

        return {
            title,
            start: `${startDate}`,
            end: `${endDate}`,
            extendedProps: {
                title: metric.selectedService,
                price: calculatePreliminaryCost(metric).toLocaleString(
                    "es-CL",
                    {
                        style: "currency",
                        currency: "CLP",
                    }
                ),
                isEmergency: metric.isEmergency,
            },
            description: "",
            semanal: false,
            // allDay: true,
            id: metric.id,
            // display: 'background'
        };
    });

    const events = [...solicitedDataEvents, ...weeklyEarningsEvents];

    return (
        <main>
            <Box>
                <Stack
                    width={"100%"}
                    display="flex"
                    flexDirection={"column"}
                    flexWrap={"wrap"}
                    direction={"column"}
                    spacing={1}
                >
                    <Typography variant="h5" padding={1} paddingBottom={0}>
                        Balance en el tiempo
                    </Typography>
                    <Typography variant="body2" padding={1} paddingTop={0}>
                        Consulta tu historial
                    </Typography>
                </Stack>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    locale={esLocale}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={(info) => {
                        console.log(info.event.id);
                        setEventDetails(info.event);
                        setOpen(true);
                    }}
                />
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>{eventDetails?.title}</DialogTitle>

                    {eventDetails?.title.split(" ")[0] === "Ganancia" ? (
                        <DialogContent>
                            <DialogContentText>
                                <Divider
                                    sx={{ margin: "1rem 0" }}
                                    variant="middle"
                                />
                                <Typography variant="body1">
                                    Esta es la ganancia de la semana
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                    ) : (
                        <DialogContent>
                            <DialogContentText>
                                <Divider
                                    sx={{ margin: "1rem 0" }}
                                    variant="middle"
                                />
                                <Typography variant="body1">
                                    <strong>Trabajo:</strong>{" "}
                                    {eventDetails?.extendedProps.title}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Ganacia:</strong>{" "}
                                    {eventDetails?.extendedProps.price}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Fecha de inicio:</strong>{" "}
                                    {eventDetails?.start.toLocaleString(
                                        "es-CL",
                                        {
                                            dateStyle: "long",
                                        }
                                    )}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Fecha de término:</strong>{" "}
                                    {eventDetails?.end
                                        ? eventDetails.end.toLocaleString(
                                              "es-CL",
                                              {
                                                  dateStyle: "long",
                                              }
                                          )
                                        : eventDetails?.start.toLocaleString(
                                              "es-CL",
                                              {
                                                  dateStyle: "long",
                                              }
                                          )}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Descripción:</strong>{" "}
                                    {eventDetails?.description}
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                    )}
                    <DialogActions>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => setOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </main>
    );
}
//
//
//
//
//
//
