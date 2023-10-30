"use client";
import React, { useMemo, useState } from "react";
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
import FullScreenSolic from "@/feedback/FullScreenSolic";
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

const MetricCard = ({
    metric,
    index,
    openDialogId,
    setOpenDialogId,
}: MetricCardProps) => {
    const preliminaryCost = calculatePreliminaryCost(metric);
    return (
        <Grid item xs={12}>
            <Card
                key={index}
                variant="outlined"
                sx={{
                    borderColor: "primary.main",
                }}
            >
                <CardContent>
                    <Stack
                        width={"100%"}
                        direction={"row"}
                        justifyContent={"space-between"}
                        spacing={1}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                            }}
                        >
                            <Typography variant="h6" fontWeight={"bold"}>
                                {metric.selectedService}
                                {metric.selectedDetailService !== "" &&
                                    `, ${metric.selectedDetailService}`}
                            </Typography>
                            <Divider variant="middle" />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    gap: 0.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        alignSelf: "flex-start",
                                        paddingX: 1.5,
                                        paddingY: 0.3,
                                        borderRadius: 1,
                                        border: "1px #d9d9d9 solid",
                                        "&:hover": {
                                            opacity: 0.9,
                                        },
                                        boxShadow: "0 0 1px 2px #ffd234",
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
                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        // alignSelf:"flex-start",
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            alignSelf: "flex-start",
                                            paddingX: 1.5,
                                            paddingY: 0.3,
                                            borderRadius: 1,
                                            border: "1px #d9d9d9 solid",
                                            "&:hover": {
                                                opacity: 0.9,
                                            },
                                            boxShadow: "0 0 1px 2px #ffd234",
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
                                    {metric.isEmergency && (
                                        <Chip
                                            sx={{
                                                marginTop: 0.5,
                                            }}
                                            label={"¡Emergencia!"}
                                            color="warning"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.5,
                            }}
                        >
                            <Typography variant="caption" textAlign={"end"}>
                                Ganancia mínima
                            </Typography>
                            <Chip
                                label={preliminaryCost.toLocaleString("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                })}
                                color="success"
                                variant="outlined"
                                size="medium"
                                sx={{
                                    fontSize: "large",
                                    fontWeight: "bold",
                                }}
                            />
                            {metric.isEmergency && (
                                <Chip
                                    label={"¡50% EXTRA!"}
                                    color="success"
                                    variant="outlined"
                                />
                            )}
                            <Button
                                onClick={() => setOpenDialogId(index)}
                                variant="contained"
                            >
                                Ver detalles
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            <FullScreenSolic
                // key={index}
                metric={metric}
                open={openDialogId === index}
                onClose={() => setOpenDialogId(null)}
            />
        </Grid>
    );
};

export default function Home() {
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);
    const { metrics, profile } = useSession();
    const [loading, setLoading] = useState(false);

    const sortedMetrics = useMemo(() => {
        const result = metrics ? [...metrics] : [];
        result.sort((a, b) => {
            const dayA = parseInt(a.selectedDay[1], 10);
            const dayB = parseInt(b.selectedDay[1], 10);

            if (dayA < dayB) return -1;
            if (dayA > dayB) return 1;

            if (a.hour < b.hour) return -1;
            if (a.hour > b.hour) return 1;

            return 0;
        });
        return result;
    }, [metrics]);

    const filteredData = useMemo(() => {
        return sortedMetrics.filter((metric) =>
            profile?.ability.includes(metric.selectedService)
        );
    }, [sortedMetrics, profile]);
    const solicitedData = useMemo(() => {
        return filteredData.filter((metric) => metric.status === "published");
    }, [filteredData]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                        Solicitudes seleccionadas según tu perfil profesional
                    </Typography>
                    <Typography variant="body2" padding={1} paddingTop={0}>
                        Total: {solicitedData.length}
                    </Typography>
                </Stack>
                <Grid container spacing={0.5}>
                    {solicitedData.map((metric, index) => (
                        <MetricCard
                            key={index}
                            metric={metric}
                            index={index}
                            setOpenDialogId={setOpenDialogId}
                            openDialogId={openDialogId}
                        />
                    ))}
                </Grid>
            </Box>
        </main>
    );
}
