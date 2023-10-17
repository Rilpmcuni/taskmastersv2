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
} from "@mui/material";
import Switch from "@mui/material/Switch";
import Link from "next/link";

export default function ChangeCalendar() {
    const [vacationMode, setVacationMode] = useState(false);

    dayjs.locale("es"); // use Spanish locale
    const daysOfWeek = Array.from(
        { length: 7 },
        (_, i) =>
            dayjs().day(i).format("dddd").charAt(0).toUpperCase() +
            dayjs().day(i).format("dddd").slice(1)
    );
    const [days, setDays] = useState(
        daysOfWeek.map((day) => ({
            day,
            from: "08:30",
            to: "18:00",
            fullTime: false,
            active: true,
        }))
    );

    const handleTimeChange = (
        index: number,
        time: string,
        type: "from" | "to"
    ) => {
        const newDays = [...days];
        newDays[index][type] = time;
        setDays(newDays);
    };

    const handleFullTimeChange = (index: number) => {
        const newDays = [...days];
        newDays[index].fullTime = !newDays[index].fullTime;
        setDays(newDays);
    };

    const handleActiveChange = (index: number) => {
        const newDays = [...days];
        newDays[index].active = !newDays[index].active;
        if (!newDays[index].active) {
            newDays[index].fullTime = false;
        }
        setDays(newDays);
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
        }
    };
    return (
        <main>
            <Stack width={"100%"} direction={"column"} spacing={2}>
                {/* <Typography
                    variant="h5"
                    fontWeight={900}
                    sx={{ flexGrow: 1, width: "100%" }}
                >
                    Horario
                </Typography> */}
                {days.map((day, index) => (
                    <>
                        {index !== 0 && <Divider variant="middle" />}
                        <Stack
                            key={day.day}
                            width={"100%"}
                            direction={"column"}
                            spacing={1}
                        >
                            <Stack
                                key={day.day}
                                width={"100%"}
                                direction={"row"}
                                justifyContent={"space-between"}
                                spacing={1}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={day.active}
                                            onChange={() =>
                                                handleActiveChange(index)
                                            }
                                            name="active"
                                            color="primary"
                                            disabled={vacationMode} // Agrega esta línea
                                        />
                                    }
                                    label={
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
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={day.fullTime}
                                            onChange={() =>
                                                handleFullTimeChange(index)
                                            }
                                            name="fullTime"
                                            color="secondary"
                                            disabled={
                                                !day.active || vacationMode
                                            } // Modifica esta línea
                                        />
                                    }
                                    label="Tiempo completo"
                                />
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
                                        <TextField
                                            id="time"
                                            label="Desde"
                                            type="time"
                                            disabled={
                                                !day.active ||
                                                day.fullTime ||
                                                vacationMode
                                            } // Modifica esta línea
                                            value={day.from}
                                            onChange={(e) =>
                                                handleTimeChange(
                                                    index,
                                                    e.target.value,
                                                    "from"
                                                )
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{
                                                flexGrow: 1,
                                            }}
                                        />
                                        <TextField
                                            id="time"
                                            label="Hasta"
                                            type="time"
                                            disabled={
                                                !day.active ||
                                                day.fullTime ||
                                                vacationMode
                                            } // Modifica esta línea
                                            value={day.to}
                                            onChange={(e) =>
                                                handleTimeChange(
                                                    index,
                                                    e.target.value,
                                                    "to"
                                                )
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{
                                                flexGrow: 1,
                                            }}
                                        />
                                    </Stack>
                                )}
                            </Collapse>
                        </Stack>
                    </>
                ))}
                <FormControlLabel
                    control={
                        <Switch
                            checked={vacationMode}
                            onChange={handleVacationModeChange}
                            name="vacationMode"
                            color="primary"
                        />
                    }
                    label="Modo Vacaciones"
                />
                <FormLabel component="legend">Tómate un tiempo</FormLabel>
            </Stack>
        </main>
    );
}
