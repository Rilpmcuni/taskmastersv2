"use client";
import Collapse from "@mui/material/Collapse";
import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es"; // import Spanish locale
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    Stack,
    Divider,
    Chip,
    FormLabel,
    Box,
    Card,
    CardContent,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import Link from "next/link";

type ScheduleType = {
    day: string;
    active: boolean;
    fullTime: boolean;
    from: string;
    to: string;
}[];
interface CalendarViewProps {
    schedule: ScheduleType;
    setSchedule: React.Dispatch<React.SetStateAction<ScheduleType>>;
}

export default function CalendarView({
    schedule,
    setSchedule,
}: CalendarViewProps) {
    const [vacationMode, setVacationMode] = useState(false);

    dayjs.locale("es"); // use Spanish locale
    const daysOfWeek = Array.from(
        { length: 7 },
        (_, i) =>
            dayjs().day(i).format("dddd").charAt(0).toUpperCase() +
            dayjs().day(i).format("dddd").slice(1)
    );
    const [days, setDays] = useState(schedule);

    const handleTimeChange = (
        index: number,
        time: string,
        type: "from" | "to"
    ) => {
        const newDays = [...days];
        newDays[index][type] = time;
        setDays(newDays);
        setSchedule(newDays); // Añade esta línea
    };

    const handleFullTimeChange = (index: number) => {
        const newDays = [...days];
        newDays[index].fullTime = !newDays[index].fullTime;
        setDays(newDays);
        setSchedule(newDays); // Añade esta línea
    };

    const handleActiveChange = (index: number) => {
        const newDays = [...days];
        newDays[index].active = !newDays[index].active;
        if (!newDays[index].active) {
            newDays[index].fullTime = false;
        }
        setDays(newDays);
        setSchedule(newDays); // Añade esta línea
    };

    const handleVacationModeChange = () => {
        setVacationMode(!vacationMode);
        if (!vacationMode) {
            const newDays = days.map((day) => ({
                ...day,
                active: false,
                fullTime: false,
            }));
            setDays(newDays);
            setSchedule(newDays); // Añade esta línea
        }
    };
    return (
        <main>
            <Stack
                width={"100%"}
                // direction={"row"}
                display="flex"
                flexDirection={"row"}
                flexWrap={"wrap"}
                spacing={1}
            >
                {days.every((day) => !day.active) ? (
                    <Typography variant="h5">¡Vacaciones!</Typography>
                ) : (
                    days
                        .filter((day) => day.active)
                        .map((day, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                sx={{
                                    flexGrow: 1,
                                    borderColor: day.active
                                        ? "primary.main"
                                        : "error.main", // Cambia el color del borde en función de day.active
                                }}
                            >
                                <CardContent>
                                    <Stack
                                        key={day.day}
                                        width={"100%"}
                                        direction={"column"}
                                        justifyContent={"space-between"}
                                        spacing={1}
                                    >
                                        <Stack
                                            key={day.day}
                                            width={"100%"}
                                            direction={"row"}
                                            justifyContent={"space-between"}
                                            spacing={1}
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    color: day.active
                                                        ? "black"
                                                        : "gray",
                                                }}
                                            >
                                                {day.day}
                                            </Typography>
                                            {day.active &&
                                            (!day.fullTime || day.fullTime) ? (
                                                day.fullTime && (
                                                    <Chip
                                                        label="Tiempo completo"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                )
                                            ) : (
                                                <Chip
                                                    label="Día libre"
                                                    color="warning"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Stack>
                                        <Collapse
                                            in={
                                                day.active &&
                                                (!day.fullTime || day.fullTime)
                                            }
                                        >
                                            {day.fullTime ? (
                                                <Chip
                                                    label="Tiempo completo y Emergencias Activado"
                                                    color="success"
                                                    variant="outlined"
                                                />
                                            ) : (
                                                <Stack
                                                    key={day.day}
                                                    width={"100%"}
                                                    direction={"row"}
                                                    spacing={1}
                                                >
                                                    <Divider
                                                        orientation="vertical"
                                                        variant="middle"
                                                        flexItem
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            flexGrow: 1,
                                                        }}
                                                    >
                                                        <Typography variant="caption">
                                                            Desde:
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {day.from}
                                                        </Typography>
                                                    </Box>
                                                    <Divider
                                                        orientation="vertical"
                                                        variant="middle"
                                                        flexItem
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            flexGrow: 1,
                                                        }}
                                                    >
                                                        <Typography variant="caption">
                                                            Hasta:
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {day.to}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            )}
                                        </Collapse>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))
                )}
            </Stack>
        </main>
    );
}
//
//
//
//
//
//
//
